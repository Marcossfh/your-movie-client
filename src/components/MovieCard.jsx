import { Link, Navigate } from "react-router-dom";

function MovieCard(props) {
  return (
    <div className="MovieCard card">
      <Link to={`/ficha-movies-page/${props.eachMovie._id}`}>
        <h3>{props.eachMovie.title}</h3>
      </Link>
    </div>
  );
}

export default MovieCard;
