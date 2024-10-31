import React from 'react'
import '../style/navbar.css'
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions.js'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    navigate('/')
  }
  
  function handleSearch() {
    navigate('/search')
  }

  function handleNotification() {
    navigate('/notification');
  }


  return (
    <div className='navbar'> 
        <button className='nav-btn' onClick={handleNotification}>NOTIFICATIONS</button>
        <button className='nav-btn' onClick={handleSearch}>SEARCH</button>
        <button className='nav-btn' onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default Navbar