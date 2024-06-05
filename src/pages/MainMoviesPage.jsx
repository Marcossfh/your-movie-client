import React, { useEffect, useState } from 'react'
import axios from 'axios'
import service from '../services/config.services'
import { Link, useNavigate } from "react-router-dom"

function MainMoviesPage() {
  
  const [ data, setData ] = useState(null)

  
  
  return (
    <div>
      
      <h3>mi pagina principal tras signup/login</h3>
      <p>aqui dos categoras terror/syfy en banner y create</p>
     
      <Link to="/terror-page">PELIS DE TERROR</Link>
      <br />
      <Link to="/syfy-page">PELIS DE SYFY</Link>
      <br /> 
      <Link to="/create-movies-page">CREA TU PELI</Link>



       
    </div>
    
  )
}

export default MainMoviesPage