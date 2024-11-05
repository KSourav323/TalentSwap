import React from 'react'
import '../style/navbar.css'
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions.js'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function handleProfile() {
    navigate('/profile');
  }
  
  function handleLearner() {
    navigate('/learner');
  }
  
  function handleTutor() {
    navigate('/tutor');
  }

  function handleSearch() {
    navigate('/search')
  }
  
  function handleNotification() {
    navigate('/notification');
  }
  
  function handleLogout() {
    dispatch(logout());
    navigate('/')
  }

  return (
    <div className='navbar'> 
      <div className='nav-opt'>
        <button className='nav-btn' onClick={handleProfile}>Profile</button>
        <button className='nav-btn' onClick={handleLearner}>Learner</button>
        <button className='nav-btn' onClick={handleTutor}>Tutor</button>
        <button className='nav-btn' onClick={handleSearch}>Explore</button>
        <button className='nav-btn' onClick={handleNotification}>Notification</button>
      </div>
      <div className='nav-foot'>
        <button className='nav-btn' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar