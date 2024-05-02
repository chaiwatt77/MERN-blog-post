import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../service/authentication";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./edit.css";

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", des: "" });

  const getPostDetail = async () => {
    try {
      let userProfile;
      if (getToken()) {
        userProfile = await getUserProfile();

        const response = await axios.get(
          `http://localhost:2007/api/blog/getBlog/${params.blogId}`
        );
        response.data.author._id === userProfile?._id
          ? setBlog(response.data)
          : navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
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

  useEffect(() => {
    getPostDetail();
  }, []);

  const bodyForUpdate = { title: blog.title, des: blog.des };

  const updateProductDetail = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:2007/api/blog/editPost/${params.blogId}`,
        bodyForUpdate,
        {
          headers: {
            Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
          },
        }
      );
      alert("Edited Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  return (
    <>
      <form className="form-design" onSubmit={updateProductDetail}>
        <label htmlFor="name" className="label">Title</label>
        <input
          id="name"
          type="text"
          value={blog.title}
          onChange={(e) =>
            setBlog((prev) => ({ ...prev, title: e.target.value }))
          }
          required
          className="input-field"
        />
        <label htmlFor="content" className="label">Content</label>
        <ReactQuill
          id="content"
          type="text"
          value={blog.des}
          onChange={(e) =>
            setBlog((prev) => ({ ...prev, des: e }))
          }
          required
          theme="snow"
          className="quill"
        />
        <button type="submit" className="button">Save</button>
      </form>
    </>
  );
};

export default Edit;