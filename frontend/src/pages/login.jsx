import '../style/logsign.css'
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions.js'
import axios from 'axios';

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
                console.log(res.data.user.name)
                dispatch(login({ name:res.data.user.name, email:email, password:password }));
                setEmail('');
                setPassword('');
                navigate('/learner');
            }
            else
            {
                alert('Invalid details')
                navigate('/login')
            }
        })
        .catch(err=>{
            console.log(err)
            alert('Error')
            navigate('/login')
    })
    };

    return(
      <div>
          <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
          <button className="go back" onClick={goBack}>Go Back 🡭</button>
      </div>
    )
}

export default Login
