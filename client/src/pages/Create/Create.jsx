import axios from "axios";
import { useState } from "react";
import { getToken } from "../../service/authentication";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./create.css";

const Create = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    des: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    const userProfile = await getUserProfile();
    const postBody = { ...post, authorId: userProfile._id };
    await axios.post(`http://localhost:2007/api/blog/post`, postBody, {
      headers: {
        Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
      },
    });
    alert("Created Successfully");
    navigate("/");
  };

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2007/api/users/getProfile",
        {
          headers: {
            Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <form className="form-design" onSubmit={createPost}>
      <label htmlFor="name" className="label">
        Title
      </label>
      <input
        id="name"
        type="text"
        value={post.title}
        onChange={(e) =>
          setPost((prev) => ({ ...prev, title: e.target.value }))
        }
        required
        className="input-field"
      />

      <label htmlFor="content" className="label">
        Content
      </label>
      <ReactQuill
        id="content"
        value={post.des}
        onChange={(e) => setPost((prev) => ({ ...prev, des: e }))}
        required
        theme="snow"
        className="quill"
      />

      <button type="submit" className="button">
        Create
      </button>
    </form>
  );
};

export default Create;
