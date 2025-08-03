import React,{useState,useEffect, useContext} from 'react'
import "./Banner.css"
import {API_KEY,imageUrl} from '../constants/constant'
import axios from '../axios'
import Youtube from 'react-youtube'
import { toast } from 'react-toastify';//npm install react-toastify(alternative of alert popups)
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ListContext } from '../context'

function Banner() {
const {list,setList}=useContext(ListContext)
const [movies,setMovie]=useState([])
 const [index, setIndex] = useState(0);
 const [urlId,setUrlId]=useState('')
useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
        console.log(response.data.results[0]);
        setMovie(response.data.results.slice(0, 5))
    })
    
},[])

 // Auto-rotate every 4 seconds
  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % movies.length);
      }, 5000);
      return () => clearInterval(interval); // Clean on unmount
    }
  }, [movies]);

  const movie = movies[index];



  const handlelist = (movie) => {
  // setList((prevList) => {
  //   const safeList = Array.isArray(prevList) ? prevList : [];
  //   const alreadyExists = safeList.some(item => item.id === movie.id);
  //   return alreadyExists ? safeList : [...safeList, movie];
  // });
   setList([...list, movie])

};


const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };



  const handlemovie =(id)=>{
    if(urlId && urlId.movieId === id){  
        setUrlId('');
        return;
    }

    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{ 
            if(response.data.results.length!==0){
                setUrlId({key:response.data.results[0].key,
                        movieId:id  
            })
            }else{
              // alert('Not Available')
              
              toast('Trailer not available for this title!');
                console.log("trailer is not availabale/array is empty");
                
            }
            
        })
  }



 
  return (
      <div>
      <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}} 
      className="banner">
        <div className='content'>
            <h1 className='title'>{movie ? movie.name : ""}</h1>
            <div className='banner_buttons'>
                <button className='button' onClick={()=>{handlemovie(movie.id)}}>Play</button>
                <button className='button' onClick={()=>{handlelist(movie)}}>My List</button>
            </div>
            <h1 className='description'>{movie ? movie.overview : ""}</h1>
        </div>
        <div className="fade_bottom">
        </div>
        
      </div>

      { urlId &&    <Youtube opts={opts} videoId={urlId.key} />    }
         <ToastContainer 
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
    />

      </div>
      
  )
  
}

export default Banner
