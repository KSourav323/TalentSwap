import React, { useEffect, useState } from 'react'
import '../style/search.css'
import { useNavigate} from 'react-router-dom';
import Tile from '../components/tile';
import Navbar from '../components/navbar.jsx';
import axios from 'axios';

const Search = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const filter = 'filter1'
  
  function handleTile(item) {
    console.log(item)
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

        <div className='search-results'>
          <div className='search-scrollable'>
            {results.map((item, index) => (
              <div className='tile-btn' key={index} onClick={() => handleTile(item.courseId)}>
                    <Tile tile={item.courseName} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

//search and filter bar, tiles 

export default Search