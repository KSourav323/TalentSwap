import React from 'react'
import Navbar from '../components/navbar.jsx';
import '../style/notification.css'
import { useSelector } from 'react-redux';

const Notification = () => {
  const user = useSelector((state) => state.user.user);
  const noti = ['a','b','c','d'];

    return (
      <div className='noti'>
        <Navbar page={'notification'}/> 
        <div className='noti-body'>
          <div className='list'>
            {noti.map((item, index) => (
                <div className='noti-li' key={index}>
                  <div className="noti-text">
                      <p>{item}</p>
                  </div>
                </div> 
            ))}
          </div>
          <div className='box'>
            {/* <Discussion courseId={courseId} course={courseDetails} senderId={user.id}/> */}
          </div>
        </div>
      </div>
  )
}

export default Notification