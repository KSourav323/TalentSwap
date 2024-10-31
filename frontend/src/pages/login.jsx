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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function goBack() {
        navigate(-1);
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', {username, password})
        .then(res=>{
            if(res.status===200) 
            {
                dispatch(login({ username, password }));
                setUsername('');
                setPassword('');
                navigate('/dash');
            }
            else
            {
                alert('Invalid details')
                navigate('/login')
            }
        })
        .catch(err=>{
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
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
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
