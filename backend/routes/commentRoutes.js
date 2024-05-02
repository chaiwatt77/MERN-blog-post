import express from 'express'
import { postCommentCtrl,deleteCommentCtrl, editCommentCtrl, getSingleComment } from '../controllers/commentCtrl.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const commentRoutes = express.Router();

commentRoutes.post('/:blogId/postComment', isLoggedIn, postCommentCtrl)
commentRoutes.delete('/deleteComment/:commentId', isLoggedIn, deleteCommentCtrl);
commentRoutes.put('/editComment/:commentId', isLoggedIn, editCommentCtrl);
commentRoutes.get('/:commentId', getSingleComment);

export default commentRoutes