import React,{ useEffect, useState } from 'react'
import '../style/play.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Play = (item) => {
  const user = useSelector((state) => state.user.user);
  const [video, setVideo] = useState(item.videoDetails)
  const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/playVideo', {filename:video.videoId}, {
                  responseType: 'blob',
                  headers: {
                    Authorization: `Bearer ${user.token}`
                  }
              });
                if (response) {
                    const url = URL.createObjectURL(response.data);
                    setVideoUrl(url);
                } 
                else {
                    toast.error('Failed to fetch video');
                }
            } catch (error) {
                toast.error('Error fetching video');
            }
        };

        fetchVideo();

        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [video.videoId]);

  
  return (
    <div className='play'>
      <div><Toaster/></div>
      <div className='play-box'>
        {videoUrl ? (
          <video className='player' width="600" controls autoPlay >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading video...</p>
        )}
        </div>
    </div>
  )
}


export default Play