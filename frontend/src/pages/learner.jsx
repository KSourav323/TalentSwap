import '../style/clist.css'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar.jsx';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { MdOutlineStar } from "react-icons/md";
import Carousel from '../components/carousel.jsx';

function Learner()
{
    const [enrolled, setEnrolled] = useState([]);
    const [trending, setTrending] = useState([]);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    function handleEnrolled(item) {
        navigate(`/course/${item}`);
    }

    useEffect(() => {
        async function getOfferedList() {
            axios.post('http://localhost:5000/api/getCourseList', {email:user.email})
            .then(res=>{
                if(res.status===200) 
                {
                    setEnrolled(res.data.enrolled)
                    setTrending(res.data.trending)
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
        getOfferedList();
    }, []);

    return(
      <div className='clist'>
        <Navbar page={'learner'}/> 
        <div className='clist-body'>
            <div className='clist-part'>
                <div className='content'>
                    <div className='slider'>
                        <Carousel trending={trending}/>
                    </div>
                    <div className='clist-nav'>
                        <h2>Enrolled courses</h2>
                    </div>
                    <ul className='course-ul'>
                        {enrolled.map((item, index) => (
                            <div className='clist-li' key={index}  onClick={() => handleEnrolled(item.courseId)} >
                                <img src={`/images/${item.category}.jpg`} className='card-image' loading="lazy" />
                                <div className="card-text">
                                    <div className='det'>
                                        <p className='card-name'>{item.courseName}</p>
                                        <p className='card-info'>By {item.courseTutor}</p> 
                                        <p className='card-info'>{item.rating}<MdOutlineStar className='star'/>/5</p> 
                                    </div>
                                </div>
                            </div> 
                        ))}
                    </ul>
                    <div className='footer'>

                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}


export default Learner
