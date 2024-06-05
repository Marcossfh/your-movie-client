import React, { useEffect, useState } from 'react'
import axios from 'axios'
import service from '../services/config.services'
import { Link, useNavigate } from "react-router-dom"
import FichaMoviePage from './FichaMoviePage'
import MovieCard from '../components/MovieCard'
function SyfyPage() {

    const [ SyfyList, setSyfyList] = useState([])

    useEffect (() => {

       
    service.get(`${import.meta.env.VITE_BACKEND_URL}/api/movies/syfy/genre`)
    .then((response) => {
        console.log(response)
        setSyfyList(response.data)
       })
    .catch((error) => {
        console.log(error)
    })
    },[])
   
  
  return (
    <div className="SyfyPage">
      
      {SyfyList.map((eachSyfy) =>{ 
          return (  
          <Link to= {`/ficha-movies-page/${eachSyfy._id}`}>
          
          <MovieCard  key={eachSyfy._id} eachSyfy={eachSyfy}/>
    </Link>)
    })}
        
        
        
        
      
      </div>

  )
}

export default SyfyPage