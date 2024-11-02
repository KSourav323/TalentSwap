import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/course.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const user = useSelector((state) => state.user.user);

  function goBack() {
    navigate(-1);
  }

  function playVideo(item) {
    navigate(`/play/${item}`);
  }


  function handleEnroll() {
    axios.post('http://localhost:5000/api/enroll', {email:user.email, courseId})
    .then(res=>{
        if(res.status===200) 
        {
            console.log('triggered enroll')
            setIsEnrolled(!isEnrolled)
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

  function handleUnenroll() {
    axios.post('http://localhost:5000/api/unEnroll', {email:user.email, courseId})
    .then(res=>{
        if(res.status===200) 
        {
            console.log('triggered enroll')
            setIsEnrolled(!isEnrolled)
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
    async function checkEnrollment() {
      axios.post('http://localhost:5000/api/isEnrolled', {email:user.email, courseId:courseId})
      .then(res=>{
          if(res.status===200) 
          {
              setIsEnrolled(res.data.isEnrolled)
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
  checkEnrollment();
  }, [isEnrolled]);

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
        {isEnrolled ? (
            <button onClick={() =>handleUnenroll()}>Unenroll</button>
          ) : (
            <button onClick={() =>handleEnroll()}>Enroll</button>
          )}
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

//details, videos, discussions, chat

export default Course