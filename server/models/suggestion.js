import mongoose from "mongoose";

const suggestionSchema = mongoose.Schema({
    author:{
        name:{
            type:String
        },
        authorID:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    },
    text:{
        type:String,
        max: 60,
        min:6
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    edited:{
        type:Boolean,
        default:false
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    },
    isReply:{
        type:Boolean,
        default:false
    },
    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Suggestions'
        }
    ],
    to:String
},{timestamps:true})

const Suggestion = mongoose.model('Suggestions', suggestionSchema)

export default Suggestion;