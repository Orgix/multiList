import Todo from '../models/todo.js';
import User from '../models/user.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()




mongoose.connect(process.env.CONNECTION_URL, 
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('connected'))
    .catch((error)=> console.log(error))



//add any field desired in the tasks or set similarly.
// const result = await Todo.updateMany({},
//     { $set: { completed: false}},{upsert:true})

//add authorid in existing tasks. for simplicity, existing tasks  will take 648c902c951696c55b28004c 648cb275951696c55b281953
//fetch all tasks
const tasks = await Todo.find({}).exec()
//for each task find the author
if(tasks.length === 0) console.log('no tasks')

// const mutated = tasks.map((task, idx)=>{
    
    
//     task.author  = idx % 2 === 0 ? {
//         name: 'Nikolaos Tsounias',
//         authorID: '648c902c951696c55b28004c'
//     } :
//     {
//         name:' Dimitris Tsoulfas',
//         authorID: '648cb275951696c55b281953'
//     }
//     return task
// })

// await Todo.deleteMany({})
// await Todo.insertMany(mutated)
// console.log(mutated)
process.exit()