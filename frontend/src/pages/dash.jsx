import '../style/dash.css'
import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar.jsx';
import { useNavigate} from 'react-router-dom';

function Dash()
{
    const user = useSelector((state) => state.user.user);
    const offered = ['off 1', 'off 2', 'off 3'];
    const enrolled = ['enr 1', 'enr 2', 'enr 3'];
    const navigate = useNavigate();

    function handleOffered() {
        navigate('/teacher');
    }

    function handleEnrolled(item) {
        navigate(`/course/${item}`);
    }

    return(
      <div className='dash'>
        <Navbar/>
        <div className='dash-body'>

            <div className='dash-profile'>
                <div className='dp'>
                    DP
                </div>
                <div className='details'>
                    <p>Name: {user.username}</p>
                    <p>Age: 23</p>
                    <p>Email: dfsd@sdf.com</p>
                    <p>Ph number: 8787678877</p>
                </div>
            </div>

            <div className='dash-parts'>
                <div className='dash-part'>
                    <div className='dash-nav'>
                        <h2>Offered courses</h2>
                        <button className='dash-edit' onClick={() => handleOffered()}>Edit</button>
                    </div>
                    <ul>
                        {offered.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='dash-part'>
                    <h2>Enrolled courses</h2>
                    <ul>
                        {enrolled.map((item, index) => (
                            <li className='dash-enrolled-li' key={index} onClick={() => handleEnrolled(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
      </div>
    )
}

//details, offered courses, enrolled courses, add course, search course....

export default Dash
