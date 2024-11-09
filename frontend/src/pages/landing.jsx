import React from 'react';
import '../style/landing.css'
import { useNavigate} from 'react-router-dom';

const Landing = () => {

    const today = new Date();
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const optionsDate = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedTime = today.toLocaleTimeString([], optionsTime).toUpperCase();
    const formattedDate = today.toLocaleDateString([], optionsDate); 

    const navigate = useNavigate();

    function login() {
        navigate('/login');
    }
    
    function signup() {
        navigate('/signup');
    }

    return (
        <div className='landing'>
            <div className='body'>
                <p> {formattedTime} | {formattedDate}</p>
                <p className='title'>Introducing TalentSwap</p> 
                <p>Connecting learners and tutors for success!</p>
                <div className="buttons">
                    <button className="enter-btn" onClick={login}>Login 🡭</button>
                    <button className="enter-btn" onClick={signup}>Sign Up 🡭</button>
                </div>
                <br />
                <p>Welcome to TalentSwap, the ultimate platform for peer-to-peer learning and skill exchange! Whether you're looking to sharpen your skills or share your expertise, TalentSwap connects you with a vibrant community of learners and tutors. Access curated courses, video tutorials, and interactive discussions that help you grow and expand your knowledge. Create and manage your own courses, upload videos, and help others achieve their learning goals, or explore a diverse range of subjects created by your peers. With course-specific chat features and collaborative discussions, TalentSwap offers a dynamic, engaging environment where you can swap talents, share expertise, and learn at your own pace. Start your journey today and discover a world of possibilities.
                </p>
            </div>
            
        </div>

    );
}

export default Landing;
