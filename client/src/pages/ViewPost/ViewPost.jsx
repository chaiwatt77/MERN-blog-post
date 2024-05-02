import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../service/authentication";
import parse from "html-react-parser";
import "./viewPost.css"; // Import the CSS file

const ViewPost = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [postDetail, setPostDetail] = useState({});
  const [comment, setComment] = useState("");

  const getPostDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2007/api/blog/getBlog/${params.blogId}`
      );
      setPostDetail(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  useEffect(() => {
    getPostDetail();
    getUserProfile();
  }, []);

  const postComment = async () => {
    await axios.post(
      `http://localhost:2007/api/comment/${params.blogId}/postComment`,
      { comment: comment, commentedById: userProfile._id },
      {
        headers: {
          Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
        },
      }
    );
    getPostDetail();
    setComment("");
  };

  const deleteComment = async (commentId) => {
    await axios.delete(
      `http://localhost:2007/api/comment/deleteComment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
        },
      }
    );
    getPostDetail();
  };

  const getUserProfile = async () => {
    if (getToken()) {
      try {
        const response = await axios.get(
          "http://localhost:2007/api/users/getProfile",
          {
            headers: {
              Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
            },
          }
        );
        setUserProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:2007/api/blog/deletePost/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
      },
    });
    alert("Deleted Successfully");
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <Link to="/" className="back-btn">
          Back
        </Link>
        {userProfile?._id &&
        postDetail?.author?._id &&
        userProfile?._id === postDetail?.author?._id ? (
          <>
            <Link
              to={`/blog/edit/${postDetail?._id}`}
              className="edit-btn"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteBlog(postDetail?._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </>
        ) : null}
        <h1>
          <p className="title">
            Title: {postDetail?.title}
          </p>
        </h1>
        <div className="description">
          {postDetail?.des ? parse(postDetail?.des) : null}
        </div>
        <p className="author">
          Author: {postDetail?.author?.fullname}
        </p>
      </div>
      <div>
        <h2 className="comment-title">Comments</h2>
        {getToken() ? (
          <>
            <div className="comment-input-container">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
              />
              <button
                onClick={() => postComment()}
                className="comment-submit-btn"
              >
                Submit
              </button>
            </div>
          </>
        ) : null}
        {postDetail?.comments?.length > 0
          ? postDetail?.comments.map((comment, index) => (
              <div key={index} className="comment-container">
                <p>{comment.comment}</p>
                <p>Commented by: {comment.commented_by.fullname}</p>
                {userProfile?._id === comment.commented_by._id ? (
                  <>
                    <Link
                      to={`/blog/edit/${params.blogId}/${comment._id}`}
                      className="edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default ViewPost;
