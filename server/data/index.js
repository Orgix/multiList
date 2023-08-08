import { users, tasks, suggestions } from "./data.js";

import mongoose from 'mongoose';
import dotenv from 'dotenv'

import User from "../models/user.js";
import Todo from "../models/todo.js";
import Suggestion from "../models/suggestion.js";
import Activity from "../models/activity.js";

//connect to database 
dotenv.config();
mongoose.connect(process.env.CONNECTION_URL, 
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(console.log(`connected`))
    .catch((error)=> console.log(error))

//clear previous test data
await User.deleteMany({})
await Todo.deleteMany({})
await Suggestion.deleteMany({})
await Activity.deleteMany({})


await User.insertMany(users)
await Todo.insertMany(tasks)
await Suggestion.insertMany(suggestions)