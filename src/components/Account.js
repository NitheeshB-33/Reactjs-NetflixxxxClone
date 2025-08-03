import React,{useContext} from 'react'
import './Account.css'; 
import {imageUrl} from '../constants/constant'
import { ListContext } from '../context'

function Account() {
  const {list}=useContext(ListContext)
console.log("Current watchlist:", list);
  return (
    <div className="account-page">
      
      <div className="account-details">
        <h1 style={{ textAlign: 'center' }}>Account</h1>
        {/* <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Membership:</strong> Premium</p>
        <button className="sign-out-btn" style={{ display: 'block', margin: '0 auto' }}>Sign Out</button> */}
         <div className='row'>
        <h2 className='title' style={{ textAlign: 'center' }}>YOUR FAVOURITIES</h2>
        <div className="posters">
            
            {Array.isArray(list) ? (
  list.map((obj) => (
    <div className="poster-item" key={obj.id}>
      <img src={`${imageUrl + obj.backdrop_path}`} alt={obj.title || obj.name} />
      <p>{obj.title || obj.name}</p>
    </div>
  ))
) : (
  <p>Watchlist is unavailable.</p>
)}
            
            </div>
      
    </div>
      </div>
    </div>
  );
}

export default Account;