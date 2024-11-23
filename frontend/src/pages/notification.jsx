import React, {useState, useEffect} from 'react'
import Navbar from '../components/navbar.jsx';
import '../style/notification.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Notification = () => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    async function getNotification() {
        axios.post('http://localhost:5000/api/getNotification', {userId:user.id},
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          })
        .then(res=>{
            if(res.status===200) 
            {
                setNoti(res.data.notifications)
            }
            else
            {
                setNoti([])
            }
        })
        .catch(err=>{
            toast.error('Something went wrong!')
    })
    };
    getNotification();
  }, []);

    return (
      <div className='noti'>
        <div><Toaster/></div>
        <Navbar page={'notification'}/> 
        <div className='noti-body'>
          <div className='list'>
            {noti.map((item, index) => (
                <div className='noti-li' key={index}>
                  <div className="noti-text">
                      <p>{item.content}</p>
                      {/* <button>Approve</button>  */}
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