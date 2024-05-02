import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getToken } from "../../service/authentication";
import "./editCommentStyles.css";

const EditComment = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState({});

  const getComment = async () => {
    const response = await axios.get(
      `http://localhost:2007/api/comment/${params.commentId}`
    );
    setNewComment(response.data.data);
  };

  useEffect(() => {
    getComment();
  }, []);

  const editComment = async () => {
    await axios.put(
      `http://localhost:2007/api/comment/editComment/${params.commentId}`,
      { comment: newComment.comment },
      {
        headers: {
          Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
        },
      }
    );
    navigate(`/blog/${newComment.blog_id}`);
  };

  return (
    <div className="container">
      <input
        className="inputField"
        type="text"
        value={newComment.comment}
        onChange={(e) =>
          setNewComment((prev) => ({ ...prev, comment: e.target.value }))
        }
      />
      <button className="submitButton" onClick={() => editComment()}>Submit</button>
    </div>
  );
};

export default EditComment;
