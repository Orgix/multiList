import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
    text: String,
    field:{
      type:String,
      enum:['title','privacy','subtasks','priority']
    },
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