import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


function CommentBox (props) {
    
    return (
        <div className="Comment Box">
            <Link to={`comment/${props.eachMovie._id}`}>
            <h3>{props.eachMovie.title}</h3>
            </Link>

        </div>
        
    )

}

export default CommentBox;