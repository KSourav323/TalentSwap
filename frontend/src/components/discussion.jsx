import React, { useState, useEffect } from 'react'
import '../style/disc.css'
import axios from 'axios';
import Timestamp from './timestamp';
import { useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import ClipLoader from 'react-spinners/ClipLoader';
import toast, { Toaster } from 'react-hot-toast';

const Discussion = (item) => {
    const [message, setMessage] = useState('');
    const [direct, setDirect] = useState('');
    const [chats, setChats] = useState([]);
    const [reload, setReload] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [loader, setLoader] = useState(false);
    const [ai, setAi] = useState([{sender:'Bot', message:"Hello there! 👋 I'm your personal assistant powered by Google Gemini. How can I assist you today? "}]);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        async function getMessages() {
            axios.post('http://localhost:5000/api/getMessages', {courseId: item.courseId, userId: user.id} , {
                headers: {
                  Authorization: `Bearer ${user.token}`
                }
            })
            .then(res=>{
                if(res.status===200) 
                {
                    setChats(res.data.chats.reverse());
                }
                else
                {
                    toast.error('Server error')
                }
            })
            .catch(err=>{
                toast.error('Something went wrong!')
        })
        };
        getMessages();
    }, [reload]);
  

    function handleSend() {
        axios.post('http://localhost:5000/api/sendMessage', {courseId: item.courseId, senderId:item.senderId, message:message}, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
        })
        .then(res=>{
            if(res.status===200) 
            {
                setReload(prev => !prev);
                setMessage('');
                toast.success('Comment added!')
            }
            else
            {
                toast.error('Server error')
            }
        })
        .catch(err=>{
            toast.error('Something went wrong!')
    })
    };

    function handleAi() {
        const updatedAi = [ {sender:'You', message:direct}, ...ai];
        setAi(updatedAi);
        setDirect('')
        axios.post('http://localhost:5000/api/sendAi', {courseId : item.courseId, message:direct}, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
        })
        .then(res=>{
            if(res.status===200) 
            {
                setReload(prev => !prev);
                setAi(prevAi => [{sender:'Bot', message: res.data.message}, ...prevAi]); 
                setLoader(false)
            }
            else
            {
                toast.error('Server error')
            }
        })
        .catch(err=>{
            console.log(err)
            toast.error('Something went wrong!')
    })
    };

    const toggleComponent = () => {
        setToggle((prev) => !prev); 
      };

  return (
    <div className='disc'>
        <div><Toaster/></div>
        <button className='toggle-btn' onClick={toggleComponent}>
          {toggle ? 'Ask AI' : 'Switch to Discussion'}
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
                    <textarea className='sendinp'
                        rows="1"
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
                        {ai.map((item, index) => (
                            <li className='chat-li' key={index}>
                                <div className='chat-det'>
                                    <p className='bot'>{item.sender}</p>
                                </div>
                                <p className='chat-message'>{item.message}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='disc-send'>
                    <textarea className='sendinp'
                        rows="1"
                        type="text"
                        id="direct"
                        value={direct}
                        onChange={(e) => setDirect(e.target.value)}
                        autoComplete="direct"
                        required
                    />
                    {loader ? (
                        <ClipLoader color="#3498db" loading={loader} size={20} />
                    ) : (
                        <button className='disc-btn' onClick={() => {handleAi(); setLoader(true)}}><IoIosSend className='sendbtn'/></button>
                    )}
                    </div>
            </div>
        )}
        
        
    </div>
  )
}

export default Discussion