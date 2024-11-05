import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/manage.css'
import axios from 'axios';

const Manage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]); 
  };

  function goBack() {
    navigate(-1);
  }

  function playVideo(item) {
    navigate(`/play/${item}`);
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
  }, []);


  return (
    <div className='manage'>
      <div className='manage-head'>
        {courseId} videos
        <button className="add-video" onClick={() => setShowPopup(!showPopup)}>Add video</button>
        <button className="go-back" onClick={goBack}>Go Back 🡭</button>
      </div>
      <div className='manage-body'>
        <div className='manage-videos'>
          <ul className='video-ul'>
            {videos.map((item, index) => (
                <li className='video-li' key={index} onClick={() => playVideo(item)}>
                    {item}
                </li>
            ))}
          </ul>
        </div>

        <div className='manage-discussion'>
          chats
          <input type="text" />
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