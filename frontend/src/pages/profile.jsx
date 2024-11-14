import React from 'react'
import '../style/profile.css'
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar.jsx';

const Profile = () => {

    const user = useSelector((state) => state.user.user);

  return (
    <div className='profile'>
        <Navbar page={'profile'}/>
        <div className="profile-body">
          <div className='profile-card'>
            <div className='profile-dp'>
                DP
            </div>
            <div className='vline'></div>
            <div className='profile-details'>
              <div className='a'>
                <p>Name: {user.name}</p>
                <p>Age: 23</p>
              </div>
              <div className='hline'></div>
                <div className='a'>
                  <p>Email: dfsd@sdf.com</p>
                  <p>Ph number: 8787678877</p>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile