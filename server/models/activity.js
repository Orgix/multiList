import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
  user: {
    type: {
      username: String,
      userId:String,
      _id:false
    }
  },
    field:{
      type:String,
      enum:['title','privacy','description','priority','subtask','toggle','add','remove','create']
    },
    from:String,
    to:String,
    toggleStatus: Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
      },
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
})

const Activity = mongoose.model('Activities', activitySchema);

export default Activity;