import React, {useState, useEffect} from 'react'
import Navbar from '../components/navbar.jsx';
import '../style/notification.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Timestamp from '../components/timestamp';

const Notification = () => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = useState([]);

  function approve(item) {
    axios.post('http://localhost:5000/api/approve', {senderId:item.receiverId, receiverId:item.senderId, context:item.content},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            toast.success('Approved')
        }
        else if(res.status===201)
        {
            toast.error('Error')
        }
    })
    .catch(err=>{
        console.log(err)
        toast.error('Something went wrong!')
})
};


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
                      <Timestamp timestamp={item.createdAt}/>
                  </div>
                  <button onClick={(e)=>{e.preventDefault; approve(item)}}>Approve</button>
                </div> 
            ))}
          </div>
          <div className='box'>
            <p>Thank you for being a part of TalentSwap! We are excited to have you on this journey of skill-sharing and peer learning. Whether you're teaching, learning, or both, we believe that everyone has something valuable to offer. With our features like video tutorials, discussion forums, AI-powered Gemini bot, and one-on-one session bookings, we're here to support you every step of the way. Keep exploring, keep growing, and remember—you have the power to both teach and learn with TalentSwap.</p>
            <br />
            <p>Happy learning, </p>
            <p>The TalentSwap Team</p>
          </div>
        </div>
      </div>
  )
}

export default Notification