import React, { useEffect, useState } from 'react'
import '../style/search.css'
import { useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import axios from 'axios';

const Search = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const filter = 'filter1'
  
  function handleTile(item) {
    navigate(`/course/${item}`);
  }

  useEffect(() => {
    async function getSearchResult() {
        axios.post('http://localhost:5000/api/getSearchResult', {filter:filter})
        .then(res=>{
            if(res.status===200) 
            {
                setResults(res.data.result)
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
    getSearchResult();
  }, []);

  return (
    <div className='search'>
      <Navbar/>
      <div className='search-body'>
        <div className='search-div'>
          <div className="search-pill">
            <input type="text" />
            <button>Go</button>
          </div>
        </div>
          <ul className='course-ul'>
            {results.map((item, index) => (
              <div className='course-li' key={index}  onClick={() => handleTile(item.courseId)} >
                <img src={`/images/${item.category}.jpg`} className='card-image'/>
                <h5 className='card-name'>{item.courseName}</h5>
                <button className='card-del' onClick={() => handleDelete(item.courseId)}>del</button>
            </div> 
              ))}
          </ul>
      </div>
    </div>
  )
}

//search and filter bar, tiles 

export default Search