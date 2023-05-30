import mongoose from "mongoose";
import Todo from "../models/todo.js"

export const getTask = async(req,res)=>{
    //get specific task searching by id
}

export const updateTask = async(req,res)=>{
    //update task with specific id
}

export const createTask = async(req,res)=>{
    //create task. only get here when registered user is authorized
}

export const deleteTask = async(req,res)=>{
    //delete task with specific id, only if authorized
}

export const getTasks = async(req,res)=>{   
    //get all tasks from specific user. either /me or /:id 
    // /me renders in a different location and only to authorized users
    // /:id renders public only headlines
}