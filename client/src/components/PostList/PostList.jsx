import { Link } from "react-router-dom";
import "./postListStyles.css"

const PostList = (props) => {
  return (
    <>
      <div className="post-container">
        <p className="post-title">Title: {props.title}</p>
        <p className="post-author">Author: {props.author.username}</p>

        <div className="button-container">
          <Link to={`/blog/${props._id}`}>
            <button className="view-button">View</button>
          </Link>
          {props.userProfile?._id === props.author?._id && (
            <>
              <Link to={`/blog/edit/${props._id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button onClick={() => props.deleteBlog(props._id)} className="delete-button">Delete</button>
            </>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default PostList;
