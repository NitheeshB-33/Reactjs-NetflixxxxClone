import React,{useEffect,useState} from 'react'
import './RowPost.css'
import axios from '../axios'
import {imageUrl,API_KEY} from '../constants/constant'
import Youtube from 'react-youtube'
import { toast } from 'react-toastify';//npm install react-toastify(alternative of alert popups)

function RowPost(props) {

        const [movie,setMovie]=useState([])
        const [urlId,setUrlId]=useState('')
        useEffect(()=>{
            axios.get(props.url).then((response)=>{
            console.log(response.data);
            setMovie(response.data.results) 
            })
        },[props.url])

        const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

const handlemovie = (id) =>{

    if(urlId && urlId.movieId === id){  //checks urld(any viedio) is available //checks current urlId.movieId === to the hide click movie id //if both side (&&) is true ,then its hides 
        setUrlId('');
        return;
    }

    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{ 
            if(response.data.results.length!==0){
                setUrlId({key:response.data.results[0].key,
                        movieId:id  //for compare the hide click and already showing vedio are same
            })
            }else{
              toast('Trailer not available for this title!');
                console.log("trailer is not availabale/array is empty");
                
            }
            
        })
}

  return (
    <div className='row'>
        <h2 className='title'>{props.title}</h2>
        <div className="posters">
            {movie.map((obj)=>{
                return(
                    <img onClick={()=>handlemovie(obj.id)}  className={props.isSmall ? 'smallPoster' :'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="images" />
                )
            })}
            
            </div>
      { urlId &&    <Youtube opts={opts} videoId={urlId.key} />    }
    </div>
  )
}

export default RowPost
