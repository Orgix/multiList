import mongoose, { mongo } from "mongoose";
import { v4 as uuid } from 'uuid'; 

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:6,
        max:20
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    tasks:{
        type:[
            {type:String, id:uuid(), completed:false }
        ],
        default:[]
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    priority:{
        type:Number,
        required:true,
        min:0,
        max:4
    },
    privacy:{
        type:String,
        default:"Public"
    }
},
{timestamps:true})

const Todo = mongoose.model("Todos", todoSchema)

export default Todo;