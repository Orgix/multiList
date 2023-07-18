import mongoose from "mongoose";

const activitySchema = mongoose.Schema({
    text: String,
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