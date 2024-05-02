import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      maxlength: 1000,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
  },
  {
    timestamps: {
      createdAt: "publishedAt",
    },
  }
);

export default mongoose.model("blogs", blogSchema);
