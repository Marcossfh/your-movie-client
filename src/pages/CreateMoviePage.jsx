import { useState } from "react"
import React from "react"
import service from "../services/config.services"
import axios from "axios"


function CreateMoviePage() {
  const [title, setTitle] = useState("")
  const [characters, setCharacters] = useState("")
  const [relatedMovies, setRelatedMovies] = useState("")
  const [sinopsis, setSinopsis ] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  

  const newProject = {
    title,
    characters,
    relatedMovies,
    sinopsis,
  }

 

  service.post(`${import.meta.env.VITE_BACKEND_URL}/api/movies`, newProject)
  .then(() => {
  console.log("creado guay")
  //navigate("/main-movies-page")
  })
  .catch((error) => {
    console.log(error)
  })
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
          onChange={(e) => setTitle(e.target.value)}
        />

      <label>Characters:</label>
              <input
                type="text"
                name="characters"
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
              />

      <label>Related Movies:</label>
               <input
                type="text"
                name="relatedMovies"
                value={relatedMovies}
                onChange={(e) => setRelatedMovies(e.target.value)}
              />

      <label>Sinopsis:</label>
               <input
                type="text"
                name="sinopsis"
                value={sinopsis}
                onChange={(e) => setSinopsis(e.target.value)}
              />
              
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default CreateMoviePage