import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth.context";
import CommentBox from "../components/CommentBox";

import service from "../services/config.services";

function FichaMoviePage() {
  const params = useParams();
  console.log(params);
  //AÑADO AQUI TAMBIEN OWNER PARA QUE SI NO ERES EL REGISTRADO NO PUEDAS NI VER EDITAR
  const [fichaMovie, setFichaMovie] = useState(null);
  const [owner, setOwner] = useState("");
  const [isFavorito, setIsFavorito] = useState(false);
  const [favoritoId, setFavoritoId] = useState("");
  const [img, setImg] = useState(null);

  const { loggedUserId } = useContext(AuthContext);

  useEffect(() => {
    service
      .get(`/movies/${params.movieId}`)
      .then((response) => {
        console.log(response);
        setFichaMovie(response.data);
        setImg(response.data.img);
        setOwner(response.data.owner);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (loggedUserId) {
      service
        .get(`/favorito/${loggedUserId}/${params.movieId}`)
        .then((response) => {
          console.log(response);

          setFavoritoId(response.data.favoritoId);
          if (response.data.favoritoId !== undefined) {
            setIsFavorito(true);
          } else {
            setIsFavorito(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedUserId, favoritoId]);

  const handleFavoritoClick = async (e) => {
    e.preventDefault();

    const newFavorito = {
      userId: loggedUserId,
      movieId: params.movieId,
    };

    console.log("creando favorito", newFavorito);

    try {
      console.log(import.meta.env.VITE_BACKEND_URL);

      if (isFavorito) {
        await service.delete(`/favorito/${favoritoId} `);
        setIsFavorito(false);
      } else {
        await service.post("/favorito", newFavorito);
        setIsFavorito(true);
      }
    } catch (error) {
      console.log(error);
      //})
    }
  };

  if (fichaMovie === null) {
    return <h3>...mirando por ahi</h3>;
  }

  return (
    <div>
      <h3>Ficha de peli</h3>
      <div className="FichaMoviePage">
        <h1>title:{fichaMovie.title}</h1>
        <p>characters:{fichaMovie.characters}</p>
        <p>related movies:{fichaMovie.relatedMovies}</p>
        <p>sinopsis:{fichaMovie.sinopsis}</p>
      </div>

      <div onClick={handleFavoritoClick} style={{ cursor: "pointer" }}>
        {isFavorito ? (
          <span className="favorite">&#9733;</span>
        ) : (
          <span className="favorite">&#9734;</span>
        )}
      </div>
      {img ? (
        <div>
          <img src={img} alt="img" width={200} />
        </div>
      ) : null}
      <Link to={`/edit-movie/${fichaMovie._id}`}>
        {owner === loggedUserId && <button>editar peli</button>}
      </Link>
      <div>
        <CommentBox />
      </div>
    </div>
  );
}

export default FichaMoviePage;
