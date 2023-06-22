import mongoose from "mongoose";
import Todo from "../models/todo.js"
import jwt from 'jsonwebtoken'


export const getTask = async(req,res)=>{
    const {id} = req.params;
    const {determinedUser} = req;
    
    try{//task with private privacy, cant be retrieved if determined user is from /:id route
        const task = await Todo.findById(id)
        if(!task) return res.status(404).json({message:"not found"})

        //const compare = compareTokens(userId, task.team.token) if false user has requested
        //once user model, login/register is done. Implement compareTokens middleware 
        //the middleware will replace this if loop and won't fire the route if /me(token) does not 
        //match the author information. ekse proceed to next middleware
        if(determinedUser === "me"){
            //validate token from user and from user from post if thye match send response with the post, else send error resp
            //
          return res.status(200).json(task)
        } //check if user is included in the privacy settings of the post, if not, forbidden access
        else if(task.privacy === "Private") return res.status(403).json({message: "Unathorized Access"})

        res.status(200).json(task)
    
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

export const updateTask = async(req,res)=>{
    //update task with specific id
    const {id: _id} = req.params;
    
    const task = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: "No task with such id"})
    
    const updatedTask = await Todo.findByIdAndUpdate(_id,{...task, _id}, {new:true})
    res.status(200).json(updatedTask)
}

export const createTask = async(req,res)=>{
    console.log(req.body)
    //create task. only get here when registered user is authorized
    const {title, priority, author, tasks, scope:privacy} = req.body;
    const newTask = new Todo({title,priority,author,tasks,privacy, createdAt: new Date().toISOString()});

    try{
        await newTask.save();
        res.status(201).json(newTask)
    }
    catch(error){
        res.status(409).json({message:error})
    }
    
}

export const deleteTask = async(req,res)=>{
    
    //delete task with specific id, only if authorized
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No task with such id"})

    await Todo.findByIdAndRemove(id);

    res.status(200).json({message: 'Task deleted'})
}

export const getTasks = async(req,res)=>{   
    const tasks = await  Todo.find({completed:false, privacy:'Public'});
    if(!tasks) res.status(404).json({message: 'No tasks found'})
    res.status(200).json(tasks)
    //get all tasks from specific user. either /me or /:id 
    // /me renders in a different location and only to authorized users
    // /:id renders public only headlines
}

export const completeTask = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: 'No such task found'})
    try{
        const result = await Todo.findByIdAndUpdate(id,{completed:true}, {new:true})
        res.status(200).json({msg:'completed'})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
   
}

export const fetchUserTasks = async(req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    
    console.log(`${decoded.UserInfo.firstName} ${decoded.UserInfo.lastName}`)
try{
    const userTasks = await Todo.find({author:`${decoded.UserInfo.firstName} ${decoded.UserInfo.lastName}`})
    if(userTasks.length > 0) return res.status(200).json(userTasks)
    else return res.status(404).json({msg:'No tasks found'})
}
   catch(err) {
        res.status(500).json({msg:err.message})
   }

    
}