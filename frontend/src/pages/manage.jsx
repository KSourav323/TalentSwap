import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/manage.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Discussion from '../components/discussion';
import Play from '../components/play.jsx';
import { MdOutlineDeleteOutline } from "react-icons/md";

const Manage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [reload, setReload] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const user = useSelector((state) => state.user.user);
  

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]); 
  };

  function goBack() {
    navigate(-1);
  }

  function playVideo(item) {
    setVideoDetails(item)
    setShowPlay(true)
  }

  function addVideo(e) {
    e.preventDefault();

    const formData = new FormData();  
    formData.append('video', videoFile);  
    formData.append('courseId', courseId);  
    formData.append('videoName', 'My Video Title'); 
    formData.append('videoSequence', 1);

    axios.post('http://localhost:5000/api/addVideo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res=>{
        if(res.status===200) 
        {
            setReload(prev => !prev);
            setShowPopup(!showPopup);
        }
        else
        {
            alert('Server error')
        }
    })
    .catch(err=>{
        alert('Error')
    })
}

function deleteVideo(item) {
  axios.post('http://localhost:5000/api/deleteVideo', {videoId:item})
  .then(res=>{
      if(res.status===200) 
      {
          setReload(prev => !prev);
      }
      else
      {
          alert('Server error')
      }
  })
  .catch(err=>{
      alert('Error')
  })
}

  useEffect(() => {
    async function getVideoList() {
        axios.post('http://localhost:5000/api/getVideoList', {courseId:courseId})
        .then(res=>{
            if(res.status===200) 
            {
                setVideos(res.data.videos)
            }
            else
            {
                alert('Server error')
            }
        })
        .catch(err=>{
            alert('Error')
    })
    };
    getVideoList();
  }, [reload]);

  useEffect(() => {
    async function getCourseDetails() {
        axios.post('http://localhost:5000/api/getCourseDetails', {courseId:courseId})
        .then(res=>{
            if(res.status===200) 
            {
                setCourseDetails(res.data.course)
            }
            else
            {
                alert('Server error')
            }
        })
        .catch(err=>{
            alert('Error')
    })
    };
    getCourseDetails();
  }, []);


  return (
    <div className='manage'>
      <div className='manage-head'>
        {courseDetails.courseName}
        <button className="add-video" onClick={() => setShowPopup(!showPopup)}>Add video</button>
        <button className="go-back" onClick={goBack}>Go Back 🡭</button>
      </div>
      <div className='manage-body'>
        <div className='manage-videos'>
          <ul className='video-ul'>
            {videos.map((item, index) => (
                <li className='video-li' key={index} >
                    <button className="video-name" onClick={() => playVideo(item)}>{item.videoName}</button>
                    <button className="video-del" onClick={() => deleteVideo(item.videoId)}><MdOutlineDeleteOutline className='bin'/></button>
                </li>
            ))}
          {showPlay && (
            <div className='video-popup'>
              <div className='video-nav'>
                <h2>{videoDetails.videoName} now playing...</h2>
                <button className='close-btn' onClick={()=> setShowPlay(!showPlay)}>X</button>
              </div>
              <Play videoDetails={videoDetails}/>
                
            </div>
          )}
          </ul>
        </div>

        <div className='manage-discussion'>
          <Discussion courseId={courseId} course={courseDetails} senderId={user.id}/>
        </div>

        {showPopup && (
                <div className='popup'>
                    <div className='popup-content'>
                        <h2>Add a New Video</h2>
                        <form onSubmit={addVideo}>
                          <input type="file" accept="video/*" onChange={handleVideoChange} /> 
                          <button type="submit">Upload</button>
                      </form>
                        <button onClick={()=> setShowPopup(!showPopup)}>X</button>
                    </div>
                </div>
            )}
      </div>
    </div>
  )
}


export default Manage