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
    }
})

const Suggestion = mongoose.model('Suggestions', suggestionSchema)