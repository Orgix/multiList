import Todo from "../models/todo.js";
import Activity from "../models/activity.js";
import mongoose from "mongoose";

export const fetchTaskActivities = async(req,res)=>{

}

export const postActivity = async(req,res)=>{
    const {task, activities} = req
    //if activity array is empty, just send back the task
    if(activities.length === 0) return res.status(200).json(task)



    //continue here once editTask can send a complete Array with activity objects. 
    //create activity object, with ids and save them 
    //then pass them to task before it saves
    await task.save();

    res.status(200).json(task)
}