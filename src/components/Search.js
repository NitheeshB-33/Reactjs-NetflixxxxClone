import React,{useEffect,useState} from 'react'
import './Search.css'
import axios from '../axios'
import {imageUrl,API_KEY} from '../constants/constant'
import { useLocation } from 'react-router-dom';


function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

    const [search,setSearch]=useState([])

     useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
      .then((res) => setSearch(res.data.results))
      .catch((err) => console.error('Search error:', err));
  }, [query]);




  return (
    <div className="search-container">
        <h1>search results for "{query}"</h1>
        <div className="search-row">
        {search.map((obj)=>{
            return (
            <div className='search-posters' key={obj.id}>
                <img
              src={`${imageUrl}${obj.backdrop_path || obj.poster_path}`}
              alt={obj.title || obj.name}            />

                 <h3>{obj.title || obj.name}</h3>

            </div>

  )})}
  </div>
      
    </div>
  )
}

export default Search
