import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan'
import taskRoutes from './routes/todos.js'
//activate config to access .env
dotenv.config();

//initialize app
const app = express();
const PORT = process.env.PORT || 6000

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use(morgan('tiny'))

app.use('/profile/me/tasks',taskRoutes);
app.use('/profile/:userId/tasks', taskRoutes)



// "/" route wont have anything initially as it will be serving the landing page content in case the landing page needs server data
app.get("/",(req,res)=>{
    res.send("empty")
})

mongoose.connect(process.env.CONNECTION_URL, 
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error))


