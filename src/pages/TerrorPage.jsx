import React, { useEffect, useState } from "react";

import service from "../services/config.services";

import MovieCard from "../components/MovieCard";
function TerrorPage() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    service
      .get(`/movies/terror/genre`)
      .then((response) => {
        console.log(response);
        setMovieList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="TerrorPage">
      {movieList.map((eachMovie) => {
        return <MovieCard key={eachMovie.title} eachMovie={eachMovie} />;
      })}
    </div>
  );
}

export default TerrorPage;
