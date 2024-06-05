import React, { useEffect, useState } from 'react'
import axios from 'axios'
import service from '../services/config.services'
import { Link, useNavigate } from "react-router-dom"
import FichaMoviePage from './FichaMoviePage'
import MovieCard from '../components/MovieCard'
function SyfyPage() {

  const [ movieList, setMovieList] = useState([])

  useEffect (() => {

     
  service.get(`/movies/syfy/genre`)
  .then((response) => {
      console.log(response)
      setMovieList(response.data)
     })
  .catch((error) => {
      console.log(error)
  })
  },[])
 

return (
  <div className="SyfyPage">
    
    
    {movieList.map((eachMovie) =>{ 
        return <MovieCard  key={eachMovie.title} eachMovie={eachMovie}/>
       
           
        
  
  })}
    
    </div>

)
}

export default SyfyPage