import Todo from "../models/todo.js";
import Activity from "../models/activity.js";
import mongoose from "mongoose";

export const fetchTaskActivities = async(req,res)=>{

}

export const postActivity = async(req,res)=>{
    const {task, activities} = req
    console.log(activities)

    //continue here. create activity object, with ids and save them 
    //then pass them to task before it saves
    await task.save();

    res.status(200).json(task)
}