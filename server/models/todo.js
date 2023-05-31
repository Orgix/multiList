import mongoose from "mongoose";
import { v4 as uuid } from 'uuid'; 
import jwt from 'jsonwebtoken';

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
    //tasks need to be in this form to be validated properly. one way is to check tasks before casting .save()
    tasks:[{
                name:String, 
                id:{
                    type:String,
                    default: uuid(),
                    
                },
                completed:{
                    type:Boolean,
                    default: false
                },
                _id:false
    }],
    author:{
        //when there are users, there will be a token that authenticates if
        type:String,
        required:true,
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
    },
    team:{
        id:{type:String, default:""}
    }
},
{timestamps:true})

todoSchema.pre('save', function(next){
    //create team token. lasts a year
    const teamToken = jwt.sign({title:this.title, author: this.author, id: this._id, created:this.createdAt}, 'test-key',{expiresIn:"365d"})
    //update team field
    this.team.id = teamToken
    //next middleware
    next();
})
const Todo = mongoose.model("Todos", todoSchema)

export default Todo;