import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
  user: {
    type: {
      username: String,
      userId:String
    }
  },
    field:{
      type:String,
      enum:['title','privacy','description','priority','subtask','toggle','add','remove']
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