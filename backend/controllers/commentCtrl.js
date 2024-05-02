import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

export const postCommentCtrl = async (req, res) => {
  try {
    const { comment, commentedById } = req.body;

    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog for comment not found" });
    }

    const newComment = new Comment({
      blog_id: blog._id,
      blog_author: blog.author,
      comment,
      commented_by: commentedById,
    });

    const savedComment = await newComment.save();

    blog.comments.push(savedComment._id);
    await blog.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);

  res.status(200).json({ data: comment });
};

export const deleteCommentCtrl = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findById(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (String(req.userAuthId) !== String(deletedComment.commented_by)) {
      return res.status(500).json({ message: "not an author" });
    }
    await deletedComment.deleteOne();


    const blogHandlerComment = deletedComment.blog_id; 
    await Blog.findByIdAndUpdate(blogHandlerComment, {
      $pull: { comments: commentId },
    });

    res
      .status(200)
      .json({ message: "Comment deleted successfully", deletedComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editCommentCtrl = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    const existingComment = await Comment.findById(commentId);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (String(req.userAuthId) !== String(existingComment.commented_by)) {
      return res.status(500).json({ message: "not an author" });
    }

    existingComment.comment = comment;

    const updatedComment = await existingComment.save();

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
