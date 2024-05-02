import express from 'express'
import { blogPostCtrl,deletePostCtrl,editPostCtrl,getAllBlogsCtrl,getBlog } from '../controllers/blogCtrl.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const blogRoutes = express.Router();

blogRoutes.get('/getAllBlogs',getAllBlogsCtrl)
blogRoutes.get('/getBlog/:blogId',getBlog)
blogRoutes.post('/post',isLoggedIn,blogPostCtrl)
blogRoutes.delete('/deletePost/:blogId',isLoggedIn,deletePostCtrl)
blogRoutes.put('/editPost/:blogId',isLoggedIn,editPostCtrl)

export default blogRoutes