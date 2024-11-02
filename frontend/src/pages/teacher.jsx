import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/course.css'
import axios from 'axios';

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);

  function goBack() {
    navigate(-1);
  }

  function playVideo(item) {
    navigate(`/play/${item}`);
  }

  useEffect(() => {
    async function getVideoList() {
        axios.post('http://localhost:5000/api/getVideoList', {courseId:courseId})
        .then(res=>{
            if(res.status===200) 
            {
                setVideos(res.data.videos)
                console.log(res)
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
    <div className='course'>
      <div className='course-head'>
        {courseId} videos
        <button className="go-back" onClick={goBack}>Go Back 🡭</button>
      </div>
      <div className='course-body'>
        <div className='course-videos'>
          <ul className='video-ul'>
            {videos.map((item, index) => (
                <li className='video-li' key={index} onClick={() => playVideo(item)}>
                    {item}
                </li>
            ))}
          </ul>
        </div>
        <div className='course-discussion'>
          chats
          <input type="text" />
        </div>
      </div>
    </div>
  )
}


export default Course