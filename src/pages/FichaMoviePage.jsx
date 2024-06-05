import React, { useEffect, useState } from 'react'
import axios from 'axios'
import service from '../services/config.services'
import MovieCard from '../components/MovieCard'
import TerrorPage from './TerrorPage'
import { Link, useParams } from 'react-router-dom'


function FichaMoviePage() {
  
    const params = useParams()
    console.log(params)

  const [ fichaMovie, setFichaMovie ] = useState(null)

  useEffect(() => {

    service.get(`/movies/${params.movieId}`)
    .then((response) => {
        console.log(response)
        setFichaMovie(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  },[])
  
  if (fichaMovie === null) {
    return <h3>...mirando por ahi</h3>
  }
  
  return (
    <div>
      
      <h3>Ficha de peli</h3>
      <div className='FichaMoviePage'>

    
        <h1>title:{fichaMovie.title}</h1>
        <p>characters:{fichaMovie.characters}</p>
        <p>related movies:{fichaMovie.relatedMovies}</p>
        <p>sinopsis:{fichaMovie.sinopsis}</p>

    </div>
    
   
    
    <Link to="/main-movies-page">
        <button>back to main</button>
    </Link>

    <Link to={`/edit-movie/${fichaMovie._id}`}>
        <button>editar peli</button>
  </Link>
  




  </div>

    
  )
}

export default FichaMoviePage