import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Play = () => {
  const navigate = useNavigate();
  const { lectureId } = useParams();
  

  function goBack() {
    navigate(-1);
  }
  
  return (
    <div>
      {lectureId} now playing
      <button className="go-back" onClick={goBack}>Go Back 🡭</button>
    </div>
  )
}

//video player or pdf viewer, attatchments

export default Play