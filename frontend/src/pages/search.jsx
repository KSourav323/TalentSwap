import React, { useEffect, useState } from 'react'
import '../style/search.css'
import { useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import axios from 'axios';
import { MdOutlineStar } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('');
  
  function handleTile(item) {
    navigate(`/course/${item}`);
  }

  const getSearchResult = async (filter) =>  {
    axios.post('http://localhost:5000/api/getSearchResult', {filter:filter})
    .then(res=>{
        if(res.status===200) 
        {
            setResults(res.data.result)
            setFilter('')
        }
        else
        {
            alert('Server error')
        }
    })
    .catch(err=>{
        alert('Error')
  })
  };

  useEffect(() => {
    getSearchResult();
  }, []);

  return (
    <div className='search'>
      <Navbar page={'search'}/>
      <div className='search-body'>
        <div className='search-div'>
          <div className="search-pill">
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
                  <div className="card-text">
                      <div className='det'>
                          <p className='card-name'>{item.courseName}</p>
                          <p className='card-info'>By {item.courseTutor}</p> 
                          <p className='card-info'>{item.rating}<MdOutlineStar className='star'/>/5</p> 
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