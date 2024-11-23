import '../style/clist.css'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar.jsx';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';

function Tutor()
{
    const user = useSelector((state) => state.user.user);
    const [offered, setOffered] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseDesc, setNewCourseDesc] = useState('');
    const [newCourseCat, setNewCourseCat] = useState('');
    const [reload, setReload] = useState(false);

    const navigate = useNavigate();

    function handleOffered(item) {
        navigate(`/manage/${item}`);
    }

    function addOffered(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/addOffered', {email: user.email, name: user.name, tutorId:user.id, courseName:newCourseName, courseDesc:newCourseDesc, courseCat: newCourseCat}, 
            {
                headers: {
                  Authorization: `Bearer ${user.token}`
                }
            }
        )
        .then(res=>{
            if(res.status===200) 
            {
                setReload(prev => !prev);
                setNewCourseName(''); 
                setNewCourseDesc('');
                setNewCourseCat('');
                setShowPopup(!showPopup);
                toast.success('Course added successfully!')
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

function handleDelete(item) {
    axios.post('http://localhost:5000/api/deleteCourse', {courseId:item}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
    })
    .then(res=>{
        if(res.status===200) 
        {
            setReload(prev => !prev);
            toast.success('Course deleted!')
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
        async function getOfferedList() {
            axios.post('http://localhost:5000/api/getCourseList', {email:user.email}, 
                {
                    headers: {
                      Authorization: `Bearer ${user.token}`
                    }
                }
            )
            .then(res=>{
                if(res.status===200) 
                {
                    setOffered(res.data.offered)
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
        getOfferedList();
    }, [reload]);

    return(
      <div className='clist'>
        <div><Toaster/></div>
        <Navbar page={'tutor'}/> 
        <div className='clist-body'>
            <br />
                <div className='clist-part'>
                    <div className='clist-nav'>
                        <h2>Offered courses</h2>
                        <button className='clist-edit' onClick={() => setShowPopup(!showPopup)}>Add Course</button>
                    </div>
                    <ul className='course-ul'>
                        {offered.map((item, index) => (
                            <div className='clist-li' key={index}  onClick={() => handleOffered(item.courseId)} >
                                <img src={`/images/${item.category}.jpg`} className='card-image' loading="lazy" />
                                <div className="card-text">
                                    <div className='det'>
                                        <p className='card-name'>{item.courseName}</p>
                                        <p className='card-info'>By {item.courseTutor}</p> 
                                        <p className='card-info'>{item.rating}<MdOutlineStar className='star'/>/5</p> 
                                    </div>
                                    <div className='delspace'>
                                        <MdOutlineDeleteSweep className='card-del' onClick={(e) => {e.stopPropagation(); handleDelete(item.courseId)}}/>
                                    </div>
                                </div>
                            </div> 
                        ))}
                    </ul>
                </div>
                
            {showPopup && (
                <div className='popup'>
                    <div className='popup-content'>
                        <div className='pop-nav'>
                            <h2>Add a New Course</h2>
                            <AiFillCloseCircle className='close-btn' onClick={()=> setShowPopup(!showPopup)} />
                        </div>
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
                            placeholder="Course Description (50 words)" 
                            value={newCourseDesc}
                            onChange={(e) => setNewCourseDesc(e.target.value)}
                            autoComplete="newCourseDesc"
                            required
                        />
                        <select id="course" value={newCourseCat} onChange={(e) => setNewCourseCat(e.target.value)}>
                            <option value="">--Select a Category--</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Programming">Programming</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                            <option value="Sports">Sports</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                            <option value="Business">Business</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Crafts">Crafts</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Language">Language</option>
                            <option value="Literature">Literature</option>
                            <option value="Technology">Technology</option>
                            <option value="Soft skills">Soft skills</option>
                            <option value="Photography">Photography</option>
                            <option value="Hobbies">Hobbies</option>
                        </select>
                        <button onClick={addOffered}>Add</button>
                    </div>
                </div>
            )}

        </div>
      </div>
    )
}


export default Tutor
