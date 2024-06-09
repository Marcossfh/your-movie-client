import React from "react";
import axios from "axios";
import service from "../services/config.services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateMoviePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [characters, setCharacters] = useState("");
  const [relatedMovies, setRelatedMovies] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [genre, setGenre] = useState("");
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCharacters = (e) => setCharacters(e.target.value);
  const handleRelatedMovies = (e) => setRelatedMovies(e.target.value);
  const handleSinopsis = (e) => setSinopsis(e.target.value);
  const handleGenre = (e) => setGenre([e.target.value]);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        uploadData
      );

      setImg(response.data.imageUrl);

      setIsUploading(false);
    } catch (error) {
      navigate("/main-movies-page");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      title,
      characters,
      relatedMovies,
      sinopsis,
      genre,
      img,
    };

    console.log("creando", newProject);
    try {
      console.log(import.meta.env.VITE_BACKEND_URL);
      await service.post("/movies", newProject);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="CreateMoviePage">
      <h3>Add Movie</h3>

      <form onSubmit={handleSubmit}>
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

        <label>Género:</label>
        <select value={genre} onChange={handleGenre}>
          <option value="" disabled>
            Selecciona un género
          </option>
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

        {isUploading ? <h3>... uploading image</h3> : null}

        {img ? (
          <div>
            <img src={img} alt="img" width={200} />
          </div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateMoviePage;
