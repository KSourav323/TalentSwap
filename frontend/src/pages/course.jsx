import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/course.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Discussion from '../components/discussion';
import Play from '../components/play.jsx';
import { IoCheckmark } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import StarRatings from 'react-star-ratings';
import Timestamp from '../components/timestamp'; 
import toast, { Toaster } from 'react-hot-toast';

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [slotPopup, setSlotPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [reload, setReload] = useState(false);
  const [slots, setSlots] = useState('');
  const user = useSelector((state) => state.user.user);

  function playVideo(item) {
    setVideoDetails(item)
    setShowPlay(true)
  }

  function goBack() {
    navigate(-1);
  }

  function handleEnroll() {
    axios.post('http://localhost:5000/api/enroll', {email:user.email, courseId},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            toast.success('Successfully enrolled!')
            setIsEnrolled(!isEnrolled)
        }
        else
        {
            toast.error("Server error")
        }
    })
    .catch(err=>{
        toast.error("Something went wrong!")
    })
  }

  useEffect(() => {
    async function getRating() {
      axios.post('http://localhost:5000/api/getRating', {userId:user.id, courseId:courseId},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
      .then(res=>{
          if(res.status===200) 
          {
              setRating(res.data.rating)
          }
          else
          {
              toast.error("Server error")
          }
      })
      .catch(err=>{
          toast.error("Something went wrong!")
    })
    };
    getRating();
  }, [reload]);


  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  function rateCourse() {
    axios.post('http://localhost:5000/api/rate', {userId:user.id, courseId:courseId, rating:rating},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            setShowPopup(!showPopup)
            setReload(prev => !prev);
            toast.success('Successfully rated!')
        }
        else
        {
            toast.error('Server error')
        }
    })
    .catch(err=>{
        toast.error('Somwthing went wrong!')
    })
  }

  function bookSlot() {
    axios.post('http://localhost:5000/api/bookSlot', {userId:user.id, courseId:courseId, slots:slots},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            setSlotPopup(!slotPopup)
            setSlots('')
            toast.success('Request sent!')
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

  function handleUnenroll() {
    axios.post('http://localhost:5000/api/unEnroll', {email:user.email, courseId},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            toast.success('Successfully unenrolled!')
            setIsEnrolled(!isEnrolled)
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
    async function checkEnrollment() {
      axios.post('http://localhost:5000/api/isEnrolled', {email:user.email, courseId:courseId},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
      .then(res=>{
          if(res.status===200) 
          {
              setIsEnrolled(res.data.isEnrolled)
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
  checkEnrollment();
  }, [isEnrolled]);

  useEffect(() => {
    async function getVideoList() {
        axios.post('http://localhost:5000/api/getVideoList', {courseId:courseId},
          {
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
  }, []);

  useEffect(() => {
    async function getCourseDetails() {
        axios.post('http://localhost:5000/api/getCourseDetails', {courseId:courseId},{
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
    <div className='course'>
      <div><Toaster/></div>
      <div className='course-head'>
        <div className='course-opt'>
          {courseDetails.courseName} videos
          {isEnrolled ? (
              <button className='y' onClick={() =>handleUnenroll()}>Enrolled <IoCheckmark className='tick'/></button>
            ) : (
              <button className='n' onClick={() =>handleEnroll()}>Enroll</button>
            )}
          <button className="add-video" onClick={() => setShowPopup(!showPopup)}>Rate</button>
          <button className="add-video" onClick={() => setSlotPopup(!slotPopup)}>Appointment</button>
        </div>
        <button className="go-back" onClick={goBack}>Go Back 🡭</button>
      </div>
      <div className='course-body'>
        <div className='course-videos'>
          <ul className='video-ul'>
            {videos.map((item, index) => (
                <li className='video-li' key={index} onClick={() => playVideo(item)}>
                  <div className='video-thumb'>

                  </div>
                  <div className='video-det'>
                    <p className="video-name" >{item.videoName}</p>
                    <Timestamp timestamp={item.createdAt}/>
                  </div>
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
        <div className='course-discussion'>
          <Discussion courseId={courseId} course={courseDetails} senderId={user.id}/>
        </div>
        {showPopup && (
              <div className='popup'>
                  <div className='popup-content'>
                    <div className="rate-nav">
                        <h2>Rate this course</h2>
                        <AiFillCloseCircle className='rate-close-btn' onClick={()=> setShowPopup(!showPopup)} />
                    </div>
                      <StarRatings
                        rating={rating}
                        starRatedColor="gold" 
                        changeRating={handleRatingChange} 
                        numberOfStars={5} 
                        name="rating"
                      />
                      
                      <button className='rate-submit' onClick={()=> rateCourse()}>Submit</button>
                  </div>
              </div>
            )}

            {slotPopup && (
              <div className='popup'>
                  <div className='popup-content'>
                    <div className="rate-nav">
                        <h2>Enter your prefered slots</h2>
                        <AiFillCloseCircle className='rate-close-btn' onClick={()=> setSlotPopup(!slotPopup)} />
                    </div>
                      <input className='inp'
                          type="text"
                          id="slots"
                          placeholder='List your prefered date and time'
                          value={slots}
                          onChange={(e) => setSlots(e.target.value)}
                          autoComplete="slots"
                          required
                      />
                      <button className='rate-submit' onClick={()=> bookSlot()}>Submit</button>
                  </div>
              </div>
          )}
      </div>
    </div>
  )
}


export default Course