import React, { useEffect, useState } from 'react'
import axios from 'axios'
import service from '../services/config.services'
function CommentPage() {
  
  const [ data, setData ] = useState(null)

  //ME PUEDE ESERVIR PARA LAS PAGINAS POR GENERO
  /*useEffect(() => { 

      //axios.get("http://localhost:5005/api/movies/private-route-mainmovies")
      
      service.get("/movies/private-route-mainmovies")
      
      .then((response) => {
          console.log(response)

      })
      .catch((err) => {
          console.log(err)
      })

  }, [])*/
  
  return (
    <div>
      
      <h3>Comentarios</h3>
      
      <div className="home-button-container">
        <Link to="/">
          <button className="button">Home</button>
        </Link>
      </div>

      
    </div>
    
  )
}

export default CommentPage