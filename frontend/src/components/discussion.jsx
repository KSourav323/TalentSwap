import React, { useState, useEffect } from 'react'
import '../style/disc.css'
import axios from 'axios';
import Timestamp from './timestamp';

const Discussion = (item) => {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function getMessages() {
            axios.post('http://localhost:5000/api/getMessages', {courseId: item.courseId})
            .then(res=>{
                if(res.status===200) 
                {
                    setChats(res.data.chats);
                }
                else
                {
                    alert('Server error')
                }
            })
            .catch(err=>{
                console.log(err)
                alert('Error')
        })
        };
        getMessages();
    }, [reload]);
  

    function handleSend() {
        axios.post('http://localhost:5000/api/sendMessage', {courseId: item.courseId, senderId:item.senderId, message:message})
        .then(res=>{
            if(res.status===200) 
            {
                setReload(prev => !prev);
                setMessage('');
            }
            else
            {
                alert('Server error')
            }
        })
        .catch(err=>{
            console.log(err)
            alert('Error')
    })
    };

  return (
    <div className='disc'>
        <div className='disc-chats'>
        <ul className='chat-ul'>
            {chats.map((item, index) => (
                <li className='chat-li' key={index}>
                    <div className='chat-det'>
                        <p className='chat-name'>{item.senderName}</p>
                        <Timestamp timestamp={item.createdAt}/>
                    </div>
                    <p className='chat-message'>{item.message}</p>
                </li>
            ))}
          </ul>
        </div>
        <div className='disc-send'>
            <input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="message"
                required
            />
            <button className='disc-btn' onClick={() => handleSend()}>Send</button>
        </div>
    </div>
  )
}

export default Discussion