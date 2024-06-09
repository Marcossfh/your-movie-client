import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";
import service from "../services/config.services";
import { useParams } from "react-router-dom";

function CommentBox(props) {
  const params = useParams();

  const { loggedUsername, loggedUserId } = useContext(AuthContext);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    service
      .get(`/comment/${params.movieId}`)
      .then((response) => {
        console.log(response);
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //CREATE COMMENT

  const handleNewComment = (e) => setNewComment(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoComment = {
      newComment,
      movie: params.movieId,
    };

    try {
      await service.post(`/comment/`, nuevoComment);
      const response = await service.get(`/comment/${params.movieId}`);

      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE COMMENT
  const handleDelete = async (eachComment) => {
    try {
      await service.delete(`/comment/${eachComment._id}`);
      const response = await service.get(`/comment/${params.movieId}`);
      console.log(response.data);
      setComments(response.data);
      console.log("comentario borrado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="FichaComment">
      <form onSubmit={handleSubmit}>
        <input
          name="Comment"
          user="User"
          value={newComment}
          onChange={handleNewComment}
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        {comments === null || comments.length === 0 ? (
          <p>No hay comentarios.</p>
        ) : (
          comments.map((eachComment) => (
            <div key={eachComment._id}>
              <p>{eachComment.text}</p>
              <p>
                <small>Usuario:{loggedUsername}</small>
              </p>

              {eachComment.user === loggedUserId && (
                <button type="button" onClick={() => handleDelete(eachComment)}>
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentBox;
