import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    requestType:{
        type:String,
        required:true
    },
    status:String,
    team: {
        Name: String,
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Team'
        }
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
}, {timestamp:true})

const Request = mongoose.model('Requests', requestSchema)

export default Request;