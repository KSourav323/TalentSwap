import '../style/logsign.css'
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions.js'
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";

function Signup()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function goBack() {
        navigate('/');
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        setUsername('');
        setEmail('');
        setPassword('');

        axios.post('http://localhost:5000/api/signup', {name, email, password})
        .then(res=>{
            if(res.status==200) 
            {
                dispatch(login({ name:res.data.user.name, id:res.data.user.userId, email:email, password:password }));
                navigate('/learner');
            }
            else
            {
                alert('Invalid details')
                navigate('/signup')
            }
        }) 
        .catch(err=>{
            alert('Error')
            console.log(err)
            navigate('/signup')
    })
    };

    return(
      <div  className='log'>
        <div className='panel'>
            <div className='left'>
                <div className='log-visual'>
                    <div className='a'>
                        Talent Swap
                        <button className="go back" onClick={goBack}>Go Back 🡭</button>
                    </div>
                    <div className='b'>
                        <p>Learn Connect Thrive</p>
                    </div>
                </div>
            </div>
          <div className="login-container">
                <div className='logbox'>
                    <form onSubmit={handleSubmit}>
                        <p className='instruct'>Create an account</p> 
                        <div>
                            <input className='inp'
                                type="text"
                                id="username"
                                placeholder='Enter username'
                                value={name}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div> 
                            <input className='inp'
                                type="text"
                                id="email"
                                value={email}
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div>
                            <input className='inp'
                                type="password"
                                id="password"
                                value={password}
                                placeholder='Enter password'
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <label className='chk-bx'>
                            <input type="checkbox" name="my-checkbox" value="1"/>
                            <p> Save password?</p> 
                        </label>
                        <button className='inp-btn' type="submit">Register</button>
                    </form>
                    <div className='or'>
                        <div className='line'>
                        </div>
                        <p>or login with</p>
                        <div className='line'>
                        </div>
                    </div>
                    <div className='goog'>
                        <p><FcGoogle /> Google</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export default Signup
