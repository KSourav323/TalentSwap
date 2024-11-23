import React, {useState, useEffect} from 'react'
import '../style/profile.css'
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar.jsx';
import axios from 'axios';
import Timestamp from '../components/timestamp';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [roll, setRoll] = useState('');
    const [mobile, setMobile] = useState('');
    const [language, setLanguage] = useState('');
    const [created, setCreated] = useState('');
    const [updated, setUpdated] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');
    const [enr, setEnr] = useState([]);
    const [off, setOff] = useState([]);
    const enrCount= enr.length
    const offCount= off.length
    const user = useSelector((state) => state.user.user);

    function handleChange() {
      axios.post('http://localhost:5000/api/updateProfile', {userId: user.id, fname, lname, email, roll, mobile, language, password, rpassword},{
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(res=>{
          if(res.status===200) 
          {
              toast.success('Profile updated')
              setPassword('')
              setRpassword('')
          }
          else if(res.status===201)
          {
              toast.error('Wrong password')
              setPassword('')
              setRpassword('')
          }
      })
      .catch(err=>{
          toast.error('Something went wrong!')
  })
  };

  useEffect(() => {
    async function getOfferedList() {
        axios.post('http://localhost:5000/api/getProfile', {userId:user.id},{
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then(res=>{
            if(res.status===200) 
            {
                setFname(res.data.profile.fname)
                setLname(res.data.profile.lname)
                setEmail(res.data.profile.email)
                setRoll(res.data.profile.roll)
                setMobile(res.data.profile.mobile)
                setLanguage(res.data.profile.language)
                setCreated(res.data.profile.createdAt)
                setUpdated(res.data.profile.updatedAt)
                setEnr(res.data.profile.enrolledCourses)
                setOff(res.data.profile.teachingCourses)
            }
            else
            {
                toast.error('Server error')
            }
        })
        .catch(err=>{
            toast.error('Something went wrong!')
    })
    };
    getOfferedList();
}, []);


  return (
    <div className='profile'>
        <div><Toaster/></div>
        <Navbar page={'profile'}/>
        <div className="profile-body">
          <div className='profile-card'>
            <div className='profile-dp'>
              <img className='dp' src="./resources/dp.jpg" alt="Logo" />
              <div className='name'>
                <p>{fname} {lname}</p>
              </div>
              <div className='ts'>
                <p>Created at: </p><Timestamp timestamp={created}/>
                <p>Updated at: </p><Timestamp timestamp={updated}/>
              </div>
            </div>
            <div className='vline'></div>
            <div className='profile-details'>
              <div className='a'>
                <form>
                  <label>First name:</label>
                  <input 
                    type="text" 
                    placeholder= {fname}
                    onChange={(e) => setFname(e.target.value)}
                    value={fname}
                  />
                  <label>Last name:</label>
                  <input 
                    type="text" 
                    placeholder= {lname}
                    onChange={(e) => setLname(e.target.value)}
                    value={lname}
                  />
                  <label>Email:</label>
                  <input 
                    type="text" 
                    placeholder= {email}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <label>Roll number:</label>
                  <input 
                    type="text" 
                    placeholder= {roll}
                    onChange={(e) => setRoll(e.target.value)}
                    value={roll}
                  />
                  <label>Mobile:</label>
                    <input 
                      type="text" 
                      placeholder= {mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      value={mobile}
                    />
                </form>
              </div>
              <div className='hline'></div>
                <div className='a'>
                  <form>
                    <label>Language:</label>
                    <input 
                      type="text" 
                      placeholder= {language}
                      onChange={(e) => setLanguage(e.target.value)}
                      value={language}
                    />
                    <label>Enrolled:</label>
                    <input 
                      type="text" 
                      placeholder= {enrCount}
                    />
                    <label>Offered:</label>
                    <input 
                      type="text" 
                      placeholder= {offCount}
                    />
                    <label>Old password:</label>
                    <input 
                      type="password" 
                      placeholder= {password}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      autoComplete='password'
                    />
                    <label>New password:</label>
                    <input 
                      type="password" 
                      placeholder= {rpassword}
                      onChange={(e) => setRpassword(e.target.value)}
                      value={rpassword}
                      autoComplete='repeat-password'
                    />
                  </form>
                </div>
            </div>
            <button className='change-btn' onClick={()=>handleChange()}>update</button>
          </div>
        </div>
    </div>
  )
}

export default Profile