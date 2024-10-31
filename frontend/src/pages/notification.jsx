import React from 'react'
import { useNavigate} from 'react-router-dom';

const Notification = () => {
    const navigate = useNavigate()

    function goBack() {
        navigate(-1);
      }

    return (
      <div>
        Notifications
        <p>personal messages</p>
        <button className="go-back" onClick={goBack}>Go Back 🡭</button>
      </div>
  )
}

export default Notification