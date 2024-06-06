import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
//importar contxt
import { AuthContext } from "../context/auth.context"
import axios from "axios";
import service from "../services/config.services";

function EditMoviePage(){
    
    
    const navigate =useNavigate()
    const { loggedUserId } = useContext(AuthContext)
    const params = useParams()
    console.log(params)

    const [title, setTitle] = useState("")
    const [characters, setCharacters] = useState("")
    const [relatedMovies, setRelatedMovies] = useState("")
    const [sinopsis, setSinopsis ] = useState("")
    const [owner, setOwner ] = useState("")//añado usuario que recuperamos bd

    // below state will hold the image URL from cloudinary. This will come from the backend.
    const [img, setImg] = useState(null); 
    const [isUploading, setIsUploading] = useState(false); // for a loading animation effect
  
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
        setOwner(response.data.owner)//traemos al owner para que sea solo el quien edite
        setImg(response.data.img)
    })
    .catch((error) => {
        console.log(error)
    })
  },[])
  //todo lo de imagenes igual que en create movie
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    

    const upDateMovie = {
        title,
        characters,
        relatedMovies,
        sinopsis,
        img
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
            {/*solo usuario edita y borra*/}  
        {owner === loggedUserId && (
          <button type="submit">Submit</button>
        )}
        
        {owner === loggedUserId && (
          <button type="button" onClick={handleDelete}>Delete Movie</button>
        )}
        
          {/* below line will render a preview of the image from cloudinary */}
          {img ? (<div><img src={img} alt="img" width={200} /></div>) : null}

          {owner === loggedUserId && (
          <>
          <label>Image: </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
          </>
          )}
            {/* below disabled prevents the user from attempting another upload while one is already happening */}

          {/* to render a loading message or spinner while uploading the picture */}
          {isUploading ? <h3>... uploading image</h3> : null}

        
      </form>
    </div>
  )
}

export default EditMoviePage
