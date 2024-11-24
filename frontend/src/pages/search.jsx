import React, { useEffect, useState } from 'react'
import '../style/search.css'
import { useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import axios from 'axios';
import { MdOutlineStar } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Search = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('');
  const [cat, setCat] = useState('All');
  const user = useSelector((state) => state.user.user);
  
  
  function handleTile(item) {
    navigate(`/course/${item}`);
  }

  const getSearchResult = async (filter) =>  {
    axios.post('http://localhost:5000/api/getSearchResult', {filter:filter, category:cat},{
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    .then(res=>{
        if(res.status===200) 
        {
            setResults(res.data.result)
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

  useEffect(() => {
    getSearchResult();
  }, []);

  return (
    <div className='search'>
      <div><Toaster/></div>
      <Navbar page={'search'}/>
      <div className='search-body'>
        <div className='search-div'>
          <div className="search-pill">
            <select className='drop' value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="All">All Category</option>
              <option value="Engineering">Engineering</option>
              <option value="Programming">Programming</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Business">Business</option>
              <option value="Cooking">Cooking</option>
              <option value="Crafts">Crafts</option>
              <option value="Fashion">Fashion</option>
              <option value="Fitness">Fitness</option>
              <option value="Gaming">Gaming</option>
              <option value="Language">Language</option>
              <option value="Literature">Literature</option>
              <option value="Technology">Technology</option>
              <option value="Soft skills">Soft skills</option>
              <option value="Photography">Photography</option>
              <option value="Hobbies">Hobbies</option>
          </select>
            <input 
              type="text" 
              placeholder='Search for a course'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              autoComplete="filter"
            />
            <button onClick={(e)=>{e.preventDefault; getSearchResult(filter)}}><CiSearch className='searchbtn'/></button>
          </div>
        </div>
          <ul className='scourse-ul'>
            {results.map((item, index) => (
              <div className='course-li' key={index}  onClick={() => handleTile(item.courseId)} >
                <img src={`/images/${item.category}.jpg`} className='card-image' loading="lazy" />
                <p className='card-star'>{item.rating}<MdOutlineStar className='star'/>/5</p> 
                <div className="card-text">
                    <div className='det'>
                        <p className='card-name'>{item.courseName}</p>
                        <p className='card-info'>By {item.courseTutor}</p> 
                        <p className='card-info'>By {item.courseDesc}</p> 
                        
                    </div>
                </div>
            </div> 
              ))}
          </ul>
      </div>
    </div>
  )
}


export default Search