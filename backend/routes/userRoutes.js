import express from 'express'
import { registerUserCtrl,loginUserCtrl, getProfileCtrl } from '../controllers/userCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl)
userRoutes.post('/login', loginUserCtrl)
userRoutes.get('/getProfile', isLoggedIn, getProfileCtrl)

export default userRoutes;