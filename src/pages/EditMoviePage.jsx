import { useState, useEffect } from "react";
import axios from "axios";
import service from "../services/config.services";
import { Link,  useNavigate, useParams } from 'react-router-dom'

function EditMoviePage(){
    
    
    const navigate =useNavigate()

    const params = useParams()
    console.log(params)

    const [title, setTitle] = useState("")
    const [characters, setCharacters] = useState("")
    const [relatedMovies, setRelatedMovies] = useState("")
    const [sinopsis, setSinopsis ] = useState("")
  
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleCharacters = (e) => setCharacters(e.target.value);
    const handleRelatedMovies = (e) => setRelatedMovies(e.target.value);
    const handleSinopsis = (e) => setSinopsis(e.target.value);
    

  useEffect(() => {

    service.get(`/movies/${params.movieId}`)
    .then((response) => {
        console.log(response)
        setTitle(response.data.title)
        setCharacters(response.data.characters)
        setRelatedMovies(response.data.relatedMovies)
        setSinopsis(response.data.sinopsis)
    })
    .catch((error) => {
        console.log(error)
    })
  },[])
  
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    

    const upDateMovie = {
        title,
        characters,
        relatedMovies,
        sinopsis,
    }

    try{
     
        //console.log(import.meta.env.VITE_BACKEND_URL)
     await service.put(`/movies/${params.movieId}`, upDateMovie)
     console.log("updated")
     navigate(`/ficha-movies-page/${params.movieId}`)
    }catch (error) {
       console.log(error)
    
     }
    

    // contactar al backend para editar la peli
    // navigate a detalles de la peli
}




    
const handleDelete  = async (e) => {
    e.preventDefault();
        
   
    try{
    await service.delete(`/movies/${params.movieId}`)
    console.log("peli borrada")
    navigate("/main-movies-page")
}catch (error) {
    console.log(error)
 
  }

    

    // contactar al backend para borrar la peli
    // navigate a lista de pelis o categorias

}

return (
    <div className="EditMoviePage">
      <h3>Edit the Movie</h3>
      <form  onSubmit= {handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />

      <label>Characters:</label>
        <input
            type="text"
            name="characters"
            value={characters}
            onChange={handleCharacters}
              />

      <label>Related Movies:</label>
        <input
            type="text"
            name="relatedMovies"
            value={relatedMovies}
            onChange={handleRelatedMovies}
              />

      <label>Sinopsis:</label>
            <input
            type="text"
            name="sinopsis"
            value={sinopsis}
            onChange={handleSinopsis}
              />
              
        <button type="submit">Submit</button>

        <button type="button" onClick={handleDelete}>Delete Movie</button>
        
      </form>
    </div>
  )
}

export default EditMoviePage

