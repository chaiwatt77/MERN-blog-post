import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";

export const getAllBlogsCtrl = async (req, res) => {
  try {
    const blogPosts = await Blog.find().populate("author", "fullname username"); 
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlog = async (req, res) => {
  const blogId = req.params.blogId;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blog.findById(blogId)
      .populate("author", "fullname")
      .populate({
        path: "comments",
        populate: {
          path: "commented_by",
          select: "fullname",
        },
      });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const blogPostCtrl = async (req, res) => {
  try {
    const { title, des, authorId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: "Invalid authorId format" });
    }

    const author = await User.findById(authorId);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newBlog = new Blog({
      title,
      des,
      author: author._id,
    });

    const savedBlog = await newBlog.save();

    author.blogs.push(savedBlog._id);
    await author.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePostCtrl = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if(String(req.userAuthId)!==String(blog.author)){
      return res.status(500).json({ message: "not an author" });
    }

    const allCommentInPost = blog.comments;

    await Comment.deleteMany({ _id: { $in: allCommentInPost } });

    await Blog.findByIdAndDelete(blogId);

    res
      .status(200)
      .json({ message: "Blog and associated comments deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editPostCtrl = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, des } = req.body;

    const existingPost = await Blog.findById(blogId);

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    if(String(req.userAuthId)!==String(existingPost.author)){
      return res.status(500).json({ message: "not an author" });
    }

    existingPost.title = title;
    existingPost.des = des;

    const updatedPost = await existingPost.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};