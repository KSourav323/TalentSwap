import React,  { useState } from 'react'
import '../style/navbar.css'
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions.js'
import { setActiveNav } from '../redux/actions';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const activeNavItem = useSelector((state) => state.nav.activeNavItem);

  const handleClick = (route, id) => {
    dispatch(setActiveNav(id));
    navigate(route);
  };
  
  function handleLogout() {
    dispatch(logout());
    navigate('/')
  }

  return (
    <div className='navbar'> 
      <div className='nav-opts'>
        <div className='logo'>
          TalentSwap
        </div>
        <br />
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'profile' ? 'active' : ''}`} onClick={() => handleClick('/profile', 'profile')}>Profile</button>
          <div className={`nav-btn ${activeNavItem === 'profile' ? 'glow' : ''}`}></div>
        </div>
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'learner' ? 'active' : ''}`} onClick={() => handleClick('/learner', 'learner')}>Learner</button>
          <div className={`nav-btn ${activeNavItem === 'learner' ? 'glow' : ''}`}></div>
        </div>
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'tutor' ? 'active' : ''}`} onClick={() => handleClick('/tutor', 'tutor')}>Tutor</button>
          <div className={`nav-btn ${activeNavItem === 'tutor' ? 'glow' : ''}`}></div>
        </div>
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'search' ? 'active' : ''}`} onClick={() => handleClick('/search', 'search')}>Explore</button>
          <div className={`nav-btn ${activeNavItem === 'search' ? 'glow' : ''}`}></div>
        </div>
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'notification' ? 'active' : ''}`} onClick={() => handleClick('/notification', 'notification')}>Notification</button>
          <div className={`nav-btn ${activeNavItem === 'notification' ? 'glow' : ''}`}></div>
        </div>
      </div>

      <div className='nav-foot'>
        <button className='nav-out' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar