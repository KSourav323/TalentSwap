import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../style/play.css'

const Play = () => {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  

  function goBack() {
    navigate(-1); 
  }
  
  return (
    <div className='play'>
      <div className='play-nav'>
        {lectureId} now playing
        <button className="go-back" onClick={goBack}>Go Back 🡭</button>
      </div>
      <div className='play-box'>
        <video width="600" controls>
          <source type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

//video player or pdf viewer, attatchments

export default Play