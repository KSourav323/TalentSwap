import '../style/logsign.css'
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions.js'
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';

function Login()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function goBack() {
        navigate('/');
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', {email, password})
        .then(res=>{
            if(res.status===200) 
            {
                dispatch(login({ name:res.data.user.fname, id:res.data.user.userId, email:email, password:password, token: res.data.token}));
                setEmail('');
                setPassword('');
                navigate('/learner');
            }
            else if(res.status===201)
            {
                toast.error('Invalid credentials')
                navigate('/login')
            }
        })
        .catch(err=>{
            console.log(err)
            toast.error('Something went wrong!')
            navigate('/login')
    })
    };

    return(
      <div className='log'>
        <div><Toaster/></div>
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
                        <p className='instruct'>Login to your account</p> 
                        <div>
                            <input className='inp'
                                type="text"
                                id="email"
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div>
                            <input className='inp'
                                type="password"
                                id="password"
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <label className='chk-bx'>
                            <input type="checkbox" name="my-checkbox" value="1"/>
                            <p> Save password?</p> 
                        </label>
                        <button className='inp-btn' type="submit">Login</button>
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

export default Login 
