import React from 'react'
import Navbar from '../components/navbar.jsx';
import '../style/notification.css'
import Discussion from '../components/discussion';
import { useSelector } from 'react-redux';

const Notification = () => {
  const user = useSelector((state) => state.user.user);

    return (
      <div className='noti'>
        <Navbar page={'notification'}/> 
        <div className='noti-body'>
          <div className='list'>

          </div>
          <div className='box'>
            {/* <Discussion courseId={courseId} course={courseDetails} senderId={user.id}/> */}
          </div>
        </div>
      </div>
  )
}

export default Notification