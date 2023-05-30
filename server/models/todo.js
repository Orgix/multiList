import mongoose, { mongo } from "mongoose";
import { v4 as uuid } from 'uuid'; 

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        min: 6,
        max: 20
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    tasks:{
        type:[String],
        default:[]
    },
    creator:String
})

const Todo = mongoose.model("Todos", todoSchema)

export default Todo;