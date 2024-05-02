import { useState, useEffect } from "react";
import PostList from "../../components/PostList/PostList";
import Nav from "../../components/Nav/Nav";
import axios from "axios";
import { getToken } from "../../service/authentication";

const Home = () => {
  const [allPost, setAllpost] = useState({});

  const getAllBlogPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2007/api/blog/getAllBlogs"
      );
      let userProfile;
      if (getToken()) {
        userProfile = await getUserProfile();
      }
      setAllpost({ posts: response.data, userProfile: userProfile });
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
    getAllBlogPost();
  }, []);

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:2007/api/blog/deletePost/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().replace(/[\\"]/g, "")}`,
      },
    });
    alert("Deleted Successfully");
    getAllBlogPost();
  };

  return (
    <>
      <Nav username={allPost?.userProfile?.username || "user not log in"} />
      <br />

      <br />
      <div>
        {allPost
          ? allPost?.posts?.map((item, index) => (
              <PostList
                key={index}
                {...item}
                userProfile={allPost?.userProfile}
                deleteBlog={deleteBlog}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Home;
