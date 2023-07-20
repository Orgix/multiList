import Todo from "../models/todo.js";
import Activity from "../models/activity.js";
import mongoose from "mongoose";

export const fetchTaskActivities = async(req,res)=>{

}

export const postActivity = async(req,res)=>{
    const {task, activities} = req
    //if activity array is empty, just send back the task
    if(activities.length === 0) return res.status(200).json(task)
    //create activity object, with ids and save them 
    const activityOperations = activities.map(activity=>{
        const doc = {
            text:activity,
            field:'title', //hardcoded for now, will be modified once the feature is up
            createdAt: new Date(),
            task: task._id
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