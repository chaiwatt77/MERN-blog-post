import express from 'express'
import dotenv from "dotenv"
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import dbConnect from './database/db.js'
dotenv.config();

dbConnect()

const app = express()

app.use(cors());

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/comment', commentRoutes);

const PORT = 2007
app.listen(PORT,console.log(`Server run at port ${PORT}`))