import React,  { useState } from 'react'
import '../style/navbar.css'
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions.js'
import { FiUser } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = (item) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const activeNavItem = item.page

  const handleClick = (route) => {
    navigate(route);
  };
  
  function handleLogout() {
    dispatch(logout());
    navigate('/')
  }

  return (
    <div className='navbar'> 
    <div className='logo'>
          <p>Talent</p>
          <p>Swap</p> 
        </div>
      <div className='nav-opts'>
        
        <br />
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'profile' ? 'active' : ''}`} onClick={() => handleClick('/profile')}><FiUser className='nav-icons'/></button>
          <span className="tooltiptext">Profile</span>
          <div className={`nav-btn ${activeNavItem === 'profile' ? 'glow' : ''}`}></div>
        </div>
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'tutor' ? 'active' : ''}`} onClick={() => handleClick('/tutor')}><LiaChalkboardTeacherSolid className='nav-icons'/></button>
          <span className="tooltiptext">Teach</span>
          <div className={`nav-btn ${activeNavItem === 'tutor' ? 'glow' : ''}`}></div>
        </div>
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'learner' ? 'active' : ''}`} onClick={() => handleClick('/learner')}><PiStudent className='nav-icons'/></button>
          <span className="tooltiptext">Learn</span>
          <div className={`nav-btn ${activeNavItem === 'learner' ? 'glow' : ''}`}></div>
        </div>
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'search' ? 'active' : ''}`} onClick={() => handleClick('/search')}><IoIosSearch className='nav-icons'/></button>
          <span className="tooltiptext">Search</span>
          <div className={`nav-btn ${activeNavItem === 'search' ? 'glow' : ''}`}></div>
        </div>
        <div className='nav-navigate'>
          <button className={`nav-opt ${activeNavItem === 'notification' ? 'active' : ''}`} onClick={() => handleClick('/notification')}><IoMdNotificationsOutline  className='nav-icons'/></button>
          <span className="tooltiptext">Notification</span>
          <div className={`nav-btn ${activeNavItem === 'notification' ? 'glow' : ''}`}></div>
        </div>
      </div>

      <div className='nav-foot'>
        <button className='nav-out' onClick={handleLogout}><MdOutlineLogout className='nav-icons'/></button>
      </div>
    </div>
  )
}

export default Navbar