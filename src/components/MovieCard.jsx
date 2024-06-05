import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


function MovieCard (props) {
    
    return (
        <div className="MovieCard card">
            <Link to={`/ficha-movies-page/${props.eachTerror._id}`}>
            <h3>{props.eachTerror.title}</h3>
            </Link>
            



        </div>
    )






  /*return (
    <div className="MovieCard card">
      <Link to={`/ficha-movies-page/${params._id}`}>
        <h3>{params.title}</h3>
      </Link>
      <p>{params.sinopsis}</p>
      
    </div>
  );*/
}

export default MovieCard;