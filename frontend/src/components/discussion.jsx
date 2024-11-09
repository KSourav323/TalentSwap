import React, { useState, useEffect } from 'react'
import '../style/disc.css'
import axios from 'axios';
import Timestamp from './timestamp';
import { useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";

const Discussion = (item) => {
    const [message, setMessage] = useState('');
    const [direct, setDirect] = useState('');
    const [chats, setChats] = useState([]);
    const [reload, setReload] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [pm, setPm] = useState([]);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        async function getMessages() {
            axios.post('http://localhost:5000/api/getMessages', {courseId: item.courseId, userId: user.id})
            .then(res=>{
                if(res.status===200) 
                {
                    setChats(res.data.chats);
                    setPm(res.data.pms);
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

    function handlePm() {
        axios.post('http://localhost:5000/api/sendPm', {courseId: item.courseId, senderId:item.senderId, message:message})
        .then(res=>{
            if(res.status===200) 
            {
                setReload(prev => !prev);
                setPm('');
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

    const toggleComponent = () => {
        setToggle((prev) => !prev); 
      };

  return (
    <div className='disc'>
        <button className='toggle-btn' onClick={toggleComponent}>
          {toggle ? 'Switch to Personal' : 'Switch to Discussion'}
        </button>

        {toggle ? (
            <div className='chatbox'>
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
                    <input className='sendinp'
                        type="text"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoComplete="message"
                        required
                    />
                    <button className='disc-btn' onClick={() => handleSend()}><IoIosSend className='sendbtn'/></button>
                </div>
            </div>
        ) : (
            <div className='chatbox'>
                <div className='disc-chats'>
                    <ul className='chat-ul'>
                        {pm.map((item, index) => (
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
                    <input className='sendinp'
                        type="text"
                        id="direct"
                        value={direct}
                        onChange={(e) => setDirect(e.target.value)}
                        autoComplete="direct"
                        required
                    />
                    <button className='disc-btn' onClick={() => handlePm()}><IoIosSend className='sendbtn'/></button>
                </div>
            </div>
        )}
        
        
    </div>
  )
}

export default Discussion