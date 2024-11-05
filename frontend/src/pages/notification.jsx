import React from 'react'
import Navbar from '../components/navbar.jsx';
import '../style/notification.css'

const Notification = () => {

    return (
      <div className='noti'>
        <Navbar/> 
        <div className='noti-body'>
          <p>messages</p>
          <p>messages</p>
          <p>messages</p>
        </div>
      </div>
  )
}

export default Notification