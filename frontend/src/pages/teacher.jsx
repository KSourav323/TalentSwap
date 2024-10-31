import React from 'react'
import { useNavigate} from 'react-router-dom';

const Teacher = () => {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div>
      Teacher
      <br />
      list of courses, add course
      <br />
      edit courses
      <br />
      discussions
      <br />
      
      <button className="go-back" onClick={goBack}>Go Back 🡭</button>
    </div>
    
  )
}

//list course, course videos, add videos, 

export default Teacher