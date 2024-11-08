import '../style/clist.css'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar.jsx';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function Learner()
{
    const [enrolled, setEnrolled] = useState([]);
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
    }, [enrolled]);

    return(
      <div className='clist'>
        <Navbar/> 
        <div className='clist-body'>
            <div className='clist-part'>
                <div className='clist-nav'>
                    <h2>Enrolled courses</h2>
                </div>
                <ul className='course-ul'>
                    {enrolled.map((item, index) => (
                        <div className='clist-li' key={index} onClick={() => handleEnrolled(item.courseId)}>
                            <h5>{item.courseName}</h5>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    )
}


export default Learner
