import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
//importar contxt
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import service from "../services/config.services";

function EditMoviePage() {
  const navigate = useNavigate();
  const { loggedUserId } = useContext(AuthContext);
  const params = useParams();
  console.log(params);

  const [title, setTitle] = useState("");
  const [characters, setCharacters] = useState("");
  const [relatedMovies, setRelatedMovies] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [owner, setOwner] = useState("");

  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCharacters = (e) => setCharacters(e.target.value);
  const handleRelatedMovies = (e) => setRelatedMovies(e.target.value);
  const handleSinopsis = (e) => setSinopsis(e.target.value);

  useEffect(() => {
    service
      .get(`/movies/${params.movieId}`)
      .then((response) => {
        console.log(response);
        setTitle(response.data.title);
        setCharacters(response.data.characters);
        setRelatedMovies(response.data.relatedMovies);
        setSinopsis(response.data.sinopsis);
        setOwner(response.data.owner);
        setImg(response.data.img);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      img,
    };

    try {
      await service.put(`/movies/${params.movieId}`, upDateMovie);
      console.log("updated");
      navigate(`/ficha-movies-page/${params.movieId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await service.delete(`/movies/${params.movieId}`);
      console.log("peli borrada");
      navigate("/main-movies-page");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EditMoviePage">
      <h3>Edit the Movie</h3>
      <form onSubmit={handleFormSubmit}>
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

        {owner === loggedUserId && <button type="submit">Submit</button>}

        {owner === loggedUserId && (
          <button type="button" onClick={handleDelete}>
            Delete Movie
          </button>
        )}

        {img ? (
          <div>
            <img src={img} alt="img" width={200} />
          </div>
        ) : null}

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

        {isUploading ? <h3>... uploading image</h3> : null}
      </form>
    </div>
  );
}

export default EditMoviePage;
