import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/manage.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Discussion from '../components/discussion';
import Play from '../components/play.jsx';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import Timestamp from '../components/timestamp'; 
import toast, { Toaster } from 'react-hot-toast';

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
  const [videoName, setVideoName] = useState('');
  const [videoSequence, setVideoSequence] = useState(1);
  const user = useSelector((state) => state.user.user);
  
  

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]); 
  };

  const handleNameChange = (e) => {
    setVideoName(e.target.value);
  };

  const handleSequenceChange = (e) => {
    setVideoSequence(e.target.value);
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
    formData.append('videoName', videoName); 
    formData.append('videoSequence', videoSequence);

    axios.post('http://localhost:5000/api/addVideo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`
      }
    }).then(res=>{
        if(res.status===200) 
        {
            setReload(prev => !prev);
            setVideoFile(null);
            setVideoName('');
            setVideoSequence('');
            setShowPopup(!showPopup);
            toast.success('Video added successfully!')
        }
        else
        {
            toast.error('Server error')
        }
    })
    .catch(err=>{
        toast.error('Something went wrong!')
    })
}

function deleteVideo(item) {
  axios.post('http://localhost:5000/api/deleteVideo', {videoId:item}, {
    headers: {
      Authorization: `Bearer ${user.token}` 
    }
  } )
  .then(res=>{
      if(res.status===200) 
      {   
          setReload(prev => !prev);
          toast.success('Video deleted!')
      }
      else
      {
          toast.error('Server error')
      }
  })
  .catch(err=>{
      toast.error('Something went wrong!')
  })
}

  useEffect(() => {
    async function getVideoList() {
        axios.post('http://localhost:5000/api/getVideoList', {courseId:courseId}, {
          headers: {
            Authorization: `Bearer ${user.token}` 
          }
        })
        .then(res=>{
            if(res.status===200) 
            {
                setVideos(res.data.videos)
            }
            else
            {
                toast.error('Server error')
            }
        })
        .catch(err=>{
            toast.error('Something went wrong!')
    })
    };
    getVideoList();
  }, [reload]);

  useEffect(() => {
    async function getCourseDetails() {
        axios.post('http://localhost:5000/api/getCourseDetails', {courseId:courseId}, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then(res=>{
            if(res.status===200) 
            {
                setCourseDetails(res.data.course)
            }
            else
            {
                toast.error('Server error')
            }
        })
        .catch(err=>{
            toast.error('Something went wrong!')
    })
    };
    getCourseDetails();
  }, []);


  return (
    <div className='manage'>
      <div><Toaster/></div>
      <div className='manage-head'>
        <p className='t'>{courseDetails.courseName}</p>
        <button className="add-video" onClick={() => setShowPopup(!showPopup)}>Add video</button>
        <button className="go-back" onClick={goBack}>Go Back 🡭</button>
      </div>
      <div className='manage-body'>
        <div className='manage-videos'>
          <ul className='video-ul'>
            {videos.map((item, index) => (
                <li className='video-li' key={index} onClick={() => playVideo(item)} >
                    <div className='video-thumb'>
                    </div>
                    <div className='video-det'>
                      <p className="video-name" >{item.videoName}</p>
                      <Timestamp timestamp={item.createdAt}/>
                    </div>
                    <button className="video-del" onClick={(e) => {e.stopPropagation(); deleteVideo(item.videoId);}}><MdOutlineDeleteOutline className='bin'/></button>
                    <div className='video-seq'>
                      <p>{item.videoSequence}</p>
                    </div>
                </li>
            ))}
          {showPlay && (
            <div className='video-popup'>
              <div className='video-nav'>
                <h2>{videoDetails.videoName} now playing...</h2>
                <AiFillCloseCircle className='close-btn' onClick={()=> setShowPlay(!showPlay)} />
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
                      <div className="rate-nav">
                          <h2>Add a New Video</h2>
                          <AiFillCloseCircle className='rate-close-btn' onClick={()=> setShowPopup(!showPopup)} />
                      </div>
                        <form onSubmit={addVideo}>
                        <input 
                            type="text" 
                            placeholder="Video name" 
                            value={videoName}
                            onChange={handleNameChange}
                          />
                          <label>Sequence number:</label>
                          <input 
                            type="number" 
                            placeholder="Sequence number" 
                            value={videoSequence}
                            onChange={handleSequenceChange}
                          />
                          <input 
                            type="file" 
                            accept="video/*" 
                            onChange={handleVideoChange} 
                          /> 

                          <button type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            )}
      </div>
    </div>
  )
}


export default Manage