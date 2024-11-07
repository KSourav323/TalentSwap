import React,{ useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/play.css'
import axios from 'axios';

const Play = () => {
  const navigate = useNavigate();
  const { videoId } = useParams();

  function goBack() {
    navigate(-1); 
  }

  const [videoUrl, setVideoUrl] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/playVideo', {filename:videoId}, { responseType: 'blob' });
                if (response) {
                    const url = URL.createObjectURL(response.data);
                    setVideoUrl(url);
                } 
                else {
                    console.error('Failed to fetch video');
                }
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();

        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
            }
        };
    }, [videoId]);

  
  return (
    <div className='play'>
      <div className='play-nav'>
        {videoId} now playing
        <button className="go-back" onClick={goBack}>Go Back 🡭</button>
      </div>
      <div className='play-box'>
      {videoUrl ? (
        <video width="600" controls>
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