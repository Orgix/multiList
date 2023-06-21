import Todo from '../models/todo.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.CONNECTION_URL, 
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('connected'))
    .catch((error)=> console.log(error))



//ADD THE COMPLETE FIELD IN ALL TASKS
const result = await Todo.updateMany({},
    { $set: { completed: false}},{upsert:true})

console.log(result)
process.exit()