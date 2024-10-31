import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const videos = ['vid 1', 'vid 2', 'vid 3'];

  function goBack() {
    navigate(-1);
  }

  function playVideo(item) {
    navigate(`/play/${item}`);
  }

  return (
    <div>
      {courseId} videos here
      <ul>
          {videos.map((item, index) => (
              <li className='video-li' key={index} onClick={() => playVideo(item)}>
                  {item}
              </li>
          ))}
      </ul>
      chats here
      <br />
      <button className="go-back" onClick={goBack}>Go Back 🡭</button>
    </div>
  )
}

//details, videos, discussions, chat

export default Course