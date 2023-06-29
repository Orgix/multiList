import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan'
import { ExpressError } from './middleware/errHandle.js';
import taskRoutes from './routes/todos.js'
import authRoutes from './routes/user.js'
import genRoutes from './routes/general.js'
//activate config to access .env
dotenv.config();

//initialize app
const app = express();
const PORT = process.env.PORT || 6000

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use(morgan('common'))

app.use('/profile/me',taskRoutes);
app.use('/profile/:userId', taskRoutes)
app.use('/auth', authRoutes);
app.use('/tasks', genRoutes)


// "/" route wont have anything initially as it will be serving the landing page content in case the landing page needs server data
app.get("/",(req,res)=>{
    res.send("empty")
})
app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found', 404))
 })
 app.use((err,req,res,next)=>{
    const {statusCode = 400, message = "Something went wrong" }= err;
    if(!err.message) err.message = "Something's wrong!"
    res.status(statusCode).json({code: statusCode, message:message})
 })
mongoose.connect(process.env.CONNECTION_URL, 
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error))


