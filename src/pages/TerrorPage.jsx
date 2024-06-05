import React, { useEffect, useState } from 'react'
import axios from 'axios'
import service from '../services/config.services'
import { Link, useNavigate } from "react-router-dom"
import FichaMoviePage from './FichaMoviePage'
import MovieCard from '../components/MovieCard'
function TerrorPage() {

    const [ TerrorList, setTerrorList] = useState([])

    useEffect (() => {

       
    service.get(`${import.meta.env.VITE_BACKEND_URL}/api/movies/terror/genre`)
    .then((response) => {
        console.log(response)
        setTerrorList(response.data)
       })
    .catch((error) => {
        console.log(error)
    })
    },[])
   
  
  return (
    <div className="TerrorPage">
      
      
      {TerrorList.map((eachTerror) =>{ 
          return <MovieCard  key={eachTerror.title} eachTerror={eachTerror}/>
         
          
          
    
    })}
      
      </div>

  )
}

export default TerrorPage