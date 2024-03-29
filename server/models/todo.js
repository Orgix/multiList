import mongoose from "mongoose";
import { v4 as uuid } from 'uuid'; 

const todoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:6,
        max:25
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    //tasks need to be in this form to be validated properly. one way is to check tasks before casting .save()
    tasks:[{
                name:String, 
                completed:{
                    type:Boolean,
                    default: false
                },
                _id:false
    }],
    author:{
        name:{
            type:String
        },
        authorID:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    },
    priority:{
        type:Number,
        required:true,
        min:0,
        max:4
    },
    description:{
        type:String,
        max:120,
        default:''
    },
    privacy:{
        type: String,
    },
    team:{
        soloProject:{
            type:Boolean,
            default:true
        },
        members:[
            {
                id: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                },
                role:{
                    type:String,
                    enum:['Author', 'Assignee', 'View Only']
                },
                name:String,
                statistics:{

                },
                _id:false
            }
        ]
    },
    completed:{
        type:Boolean,
        default:false
    },
    suggestions:[
       { 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Suggestions'
        }
    ], 
    log:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activities',
          }
    ]
},
{timestamps:true})

const Todo = mongoose.model("Todos", todoSchema)

export default Todo;