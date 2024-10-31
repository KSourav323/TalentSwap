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
            <p> {formattedTime} | {formattedDate}</p>
            <h1>Introducing TalentSwap</h1>
            <p>Connecting learners and tutors for success!</p>
            <div className="buttons">
                <button className="enter-btn" onClick={login}>Login 🡭</button>
                <button className="enter-btn" onClick={signup}>Sign Up 🡭</button>
            </div>
            <br />
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.

            </p>
        </div>

    );
}

export default Landing;
