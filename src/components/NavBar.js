import React,{useState} from 'react'
import "./NavBar.css";
import { useNavigate } from 'react-router-dom'
function NavBar() {
   const navigate = useNavigate(); //alternative of usehistory

    const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };


  return (
    <div>
      <div className='navbar'>
      <img className="logo" onClick={()=>{ navigate('/')}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo"/>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      
      <img className="avatar" onClick={()=>{ navigate('/account')}} src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar"/>
    </div>
    </div>
  )
}

export default NavBar
