import { Link, useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from "../context/auth.context"
import CommentBox from '../components/CommentBox'

import service from '../services/config.services'

function FichaMoviePage() {
  
    const params = useParams()
    console.log(params)
//AÑADO AQUI TAMBIEN OWNER PARA QUE SI NO ERES EL REGISTRADO NO PUEDAS NI VER EDITAR
  const [ fichaMovie, setFichaMovie ] = useState(null)
  const [owner, setOwner ] = useState("")
  
  const [img, setImg] = useState(null); 

  const { loggedUserId } = useContext(AuthContext);

  useEffect(() => {

    service.get(`/movies/${params.movieId}`)
    .then((response) => {
        console.log(response)
        setFichaMovie(response.data)
        setImg(response.data.img)
        setOwner(response.data.owner)
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
    {img ? (<div><img src={img} alt="img" width={200} /></div>) : null}
    <Link to={`/edit-movie/${fichaMovie._id}`}>
    {owner === loggedUserId && (
          <button>editar peli</button>
        )}
        
  </Link>
  <div>
    <CommentBox />

  </div>
  </div>
   
  )
}

export default FichaMoviePage