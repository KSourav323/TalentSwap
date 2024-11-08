import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/course.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Discussion from '../components/discussion';
import Play from '../components/play.jsx';

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const user = useSelector((state) => state.user.user);

  function playVideo(item) {
    setVideoDetails(item)
    setShowPlay(true)
  }

  function goBack() {
    navigate(-1);
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
    <div className='course'>
      <div className='course-head'>
        {courseDetails.courseName} videos
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
                <li className='video-li' key={index}>
                    <button className="video-name" onClick={() => playVideo(item)}>{item.videoName}</button>
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
        <div className='course-discussion'>
          <Discussion courseId={courseId} course={courseDetails} senderId={user.id}/>
        </div>
      </div>
    </div>
  )
}


export default Course