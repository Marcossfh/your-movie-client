import React, { useEffect, useState } from 'react'
import axios from 'axios'
import service from '../services/config.services'
function MainMoviesPage() {
  
  const [ data, setData ] = useState(null)

  useEffect(() => { 

      //axios.get("http://localhost:5005/api/movies/private-route-mainmovies")
      
      service.get("/movies/private-route-mainmovies")
      
      .then((response) => {
          console.log(response)

      })
      .catch((err) => {
          console.log(err)
      })

  }, [])
  
  return (
    <div>
      
      <h3>mi pagina principal tras signup/login</h3>
      <p>aqui dos categoras terror/syfy en banner</p>

    </div>
  )
}

export default MainMoviesPage