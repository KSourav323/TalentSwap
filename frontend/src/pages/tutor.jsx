import '../style/tutor.css'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar.jsx';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function Tutor()
{
    const user = useSelector((state) => state.user.user);
    const [offered, setOffered] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseDesc, setNewCourseDesc] = useState('');
    const [reload, setReload] = useState(false);

    const navigate = useNavigate();

    function handleOffered(item) {
        navigate(`/manage/${item}`);
    }

    function addOffered(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/addOffered', {email: user.email, name: user.name, courseName:newCourseName, courseDesc:newCourseDesc})
        .then(res=>{
            if(res.status===200) 
            {
                setReload(prev => !prev);
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

function handleDelete(item) {
    axios.post('http://localhost:5000/api/deleteCourse', {courseId:item})
    .then(res=>{
        if(res.status===200) 
        {
            setReload(prev => !prev);
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
    }, [reload]);

    return(
      <div className='tutor'>
        <Navbar/> 
        <div className='tutor-body'>
                <div className='tutor-part'>
                    <div className='tutor-nav'>
                        <h2>Offered courses</h2>
                        <button className='tutor-edit' onClick={() => setShowPopup(!showPopup)}>+</button>
                    </div>
                    <ul>
                        {offered.map((item, index) => (
                            <li className='tutor-li' key={index} >
                                <button className='tutor-course' onClick={() => handleOffered(item.courseId)}>{item.courseName}</button>
                                <button className='tutor-del' onClick={() => handleDelete(item.courseId)}>del</button>
                            </li>
                        ))}
                    </ul>
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


export default Tutor
