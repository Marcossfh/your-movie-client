import { useState } from "react"
import React from "react"
import service from "../services/config.services"
import axios from "axios"


function CreateMoviePage() {
  const [title, setTitle] = useState("")
  const [characters, setCharacters] = useState("")
  const [relatedMovies, setRelatedMovies] = useState("")
  const [sinopsis, setSinopsis ] = useState("")

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCharacters = (e) => setCharacters(e.target.value);
  const handleRelatedMovies = (e) => setRelatedMovies(e.target.value);
  const handleSinopsis = (e) => setSinopsis(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault()
  

  const newProject = {
    title,
    characters,
    relatedMovies,
    sinopsis,
  }

    console.log("creando", newProject)
 try{
  console.log(import.meta.env.VITE_BACKEND_URL)
  await service.post("/movies", newProject)
  
 }catch (error) {
    console.log(error)
  //})
  }
} 


  return (
    <div className="CreateMoviePage">
      <h3>Add Movie</h3>

      <form  onSubmit= {handleSubmit}>
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
      </form>

    </div>
  )
}

export default CreateMoviePage