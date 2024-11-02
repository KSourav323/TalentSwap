import '../style/dash.css'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar.jsx';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function Dash()
{
    const user = useSelector((state) => state.user.user);
    const [offered, setOffered] = useState([]);
    const [enrolled, setEnrolled] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseDesc, setNewCourseDesc] = useState('');

    const navigate = useNavigate();

    function handleOffered(item) {
        navigate(`/teacher/${item}`);
    }

    function handleEnrolled(item) {
        navigate(`/course/${item}`);
    }

    function addOffered(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/addOffered', {courseName:newCourseName, courseDesc:newCourseDesc})
        .then(res=>{
            if(res.status===200) 
            {
                setNewCourseName(''); 
                setNewCourseDesc('');
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
        async function getOfferedList() {
            axios.post('http://localhost:5000/api/getCourseList', {email:user.email})
            .then(res=>{
                if(res.status===200) 
                {
                    setOffered(res.data.offered)
                    setEnrolled(res.data.enrolled)
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
        getOfferedList();
    }, []);

    return(
      <div className='dash'>
        <Navbar/>
        <div className='dash-body'>

            <div className='dash-profile'>
                <div className='dp'>
                    DP
                </div>
                <div className='details'>
                    <p>Name: {user.name}</p>
                    <p>Age: 23</p>
                    <p>Email: dfsd@sdf.com</p>
                    <p>Ph number: 8787678877</p>
                </div>
            </div>

            <div className='dash-parts'>
                <div className='dash-part'>
                    <div className='dash-nav'>
                        <h2>Offered courses</h2>
                        <button className='dash-edit' onClick={() => setShowPopup(!showPopup)}>+</button>
                    </div>
                    <ul>
                        {offered.map((item, index) => (
                            <li className='dash-li' key={index} onClick={() => handleOffered(item.courseId)}>
                                {item.courseName}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='dash-part'>
                    <h2>Enrolled courses</h2>
                    <ul>
                        {enrolled.map((item, index) => (
                            <li className='dash-li' key={index} onClick={() => handleEnrolled(item.courseId)}>
                                {item.courseName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {showPopup && (
                <div className='popup'>
                    <div className='popup-content'>
                        <h2>Add a New Course</h2>
                        <input
                            type="text" 
                            placeholder="Course Name" 
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            autoComplete="newCourseName"
                            required
                        />
                        <input
                            type="text" 
                            placeholder="Course Description" 
                            value={newCourseDesc}
                            onChange={(e) => setNewCourseDesc(e.target.value)}
                            autoComplete="newCourseDesc"
                            required
                        />
                        <button onClick={addOffered}>Add</button>
                        <button onClick={()=> setShowPopup(!showPopup)}>X</button>
                    </div>
                </div>
            )}

        </div>
      </div>
    )
}

//details, offered courses, enrolled courses, add course, search course....

export default Dash
