import '../style/learner.css'
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
    }, []);

    return(
      <div className='learner'>
        <Navbar/> 
        <div className='learner-body'>
            <div className='learner-part'>
                <h2>Enrolled courses</h2>
                <ul>
                    {enrolled.map((item, index) => (
                        <li className='learner-li' key={index} onClick={() => handleEnrolled(item.courseId)}>
                            {item.courseName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    )
}


export default Learner
