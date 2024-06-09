import React, { useContext, useEffect, useState } from "react";

import service from "../services/config.services";

import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/auth.context";
function FavoritosPage() {
  const [movieList, setMovieList] = useState([]);
  const { loggedUserId } = useContext(AuthContext);

  useEffect(() => {
    service
      .get(`/favorito/${loggedUserId}`)
      .then((response) => {
        console.log(response);
        setMovieList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="FavoritoPage">
      {movieList.map((eachMovie) => {
        return <MovieCard key={eachMovie.title} eachMovie={eachMovie} />;
      })}
    </div>
  );
}

export default FavoritosPage;
