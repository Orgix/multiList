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
    privacy:{
        type: String,
    },
    team:{
        id:{type:String, default:""}
    },
    completed:{
        type:Boolean,
        default:false
    }
},
{timestamps:true})

todoSchema.pre('save', function(next){
    //create team token. lasts a year
    const teamId = uuid();
    //update team field
    this.team.id = teamId
    //next middleware
    next();
})
const Todo = mongoose.model("Todos", todoSchema)

export default Todo;