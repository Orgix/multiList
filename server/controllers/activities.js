import Todo from "../models/todo.js";
import Activity from "../models/activity.js";
import mongoose from "mongoose";

export const deleteActivities = async(req,res)=>{
    console.log(req.logs)
    try{
        const deletedActivities= await Activity.deleteMany({_id: {$in: req.logs}})
        console.log(deletedActivities)

        res.status(200).json({msg:'Task Deleted'})
    }
    catch(error){
        res.status(500).json({msg:'Problem deleting task'})
    }
    
}

export const postActivity = async(req,res)=>{
    const {task, activities} = req
    //if activity array is empty, just send back the task
    if(activities.length === 0) return res.status(200).json(task)
    //create activity object, with ids and save them 
    const activityOperations = activities.map(activity=>{
        const doc = {
            user:{
                username: activity[0].username,
                userId: activity[0].id
            },
            field:activity[1], //hardcoded for now, will be modified once the feature is up
            createdAt: new Date(),
            task: task._id
        } 
        //if it's one of the actions in the array, there are 4 fields in the array, from/to fields 
        //are to be used
        if(['title','privacy','priority','description','subtask'].includes(activity[1])){
            doc.from = activity[2]
            doc.to = activity[3]
        } 
        //if it's a toggle action, it doesnt have a from/to, but will take the final value of to 
        //and toggleStatus will be used
        else if(activity[1] === 'toggle'){
            doc.to = activity[2]
            doc.toggleStatus = activity[3]
        }
        //it's either add or delete , so just the 'to' value needed 
         else{
            doc.to = activity[2]
        }
        return {
            insertOne: {
              document: doc,
            },
          }
    })
    
    try{
        //perform a bulkwrite to insert all activities
        const result = await Activity.bulkWrite(activityOperations)
        //get all inserted ids in an array
        const id_array = result.getInsertedIds().map(insertedId => insertedId._id)
        //spread array inside the existing array of ids
        task.log.push(...id_array)

        

        const populatedTaskLogs =await Todo.populate(task,{ path: 'log' })
        console.log(populatedTaskLogs.log)

        res.status(200).json(populatedTaskLogs)
        await task.save();
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}