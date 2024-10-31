import React from 'react'
import '../style/search.css'
import { useNavigate} from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  
  function handleSearch() {
    navigate('/search')
  }

  function handleGoBack() {
    navigate('/dash')
  }

  return (
    <div className='search'>
      <div className='search-filter'>
        <input type="text" />
        <button>Search</button>
        <button onClick={handleGoBack}>Go back</button>
      </div>
      <div className='search-results'>
        results here
      </div>
    </div>
  )
}

//search and filter bar, tiles 

export default Search