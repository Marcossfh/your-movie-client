import React from "react"
import axios from "axios"
import service from "../services/config.services"
import { useState } from "react"
//problema con el navigate??

function CreateMoviePage() {
  const [title, setTitle] = useState("")
  const [characters, setCharacters] = useState("")
  const [relatedMovies, setRelatedMovies] = useState("")
  const [sinopsis, setSinopsis ] = useState("")
  const [genre, setGenre] = useState("")//AÑADIR GNRO
  // below state will hold the image URL from cloudinary. This will come from the backend.
  const [img, setImg] = useState(null); 
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCharacters = (e) => setCharacters(e.target.value);
  const handleRelatedMovies = (e) => setRelatedMovies(e.target.value);
  const handleSinopsis = (e) => setSinopsis(e.target.value);
  const handleGenre = (e) => setGenre([e.target.value]);//AÑADIR GNRO SELECTOR PARA EL ESTADO

  // below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, uploadData)
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)

      setImg(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
  

  const newProject = {
    title,
    characters,
    relatedMovies,
    sinopsis,
    genre,
    img
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
    {/*meter genero porque si no a donde va la peli peli creada?*/ }
      <label>Género:</label>
              <select value={genre} onChange={handleGenre}>
                <option value="" disabled>Selecciona un género</option>
                <option value="terror">Terror</option>
                <option value="syfy">Syfy</option>
              </select>
              

      <label>Image: </label>
              <input
                type="file"
                name="image"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            {/* below disabled prevents the user from attempting another upload while one is already happening */}

          {/* to render a loading message or spinner while uploading the picture */}
          {isUploading ? <h3>... uploading image</h3> : null}

          {/* below line will render a preview of the image from cloudinary */}
          {img ? (<div><img src={img} alt="img" width={200} /></div>) : null}
          
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default CreateMoviePage