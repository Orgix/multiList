import mongoose from "mongoose";
import Todo from "../models/todo.js"
import Activity from "../models/activity.js";
import User from "../models/user.js";
import jwt from 'jsonwebtoken'



export const getTask = async(req,res)=>{
    const {id} = req.params;
    const {determinedUser} = req;
    
    try{//task with private privacy, cant be retrieved if determined user is from /:id route
        const task = await Todo.findById(id).populate('log')
        if(!task) return res.status(404).json({message:"not found"})

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

export const updateTask = async(req,res,next)=>{
    //update task with specific id
    const {id: _id} = req.params;
    
    //get updated task
    const {task, activities} = req.body
    //if id doesnt match to a valid task, end route here
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(401).json({message: "No task with such id"})
    
    if(task.completed) return res.status(403).json({msg:'Completed tasks cannot be updated any further.'})
    const updatedTask = await Todo.findByIdAndUpdate(_id,{...task, _id}, {new:true})
    
    req.task = updatedTask;
    req.activities = activities
    next();
}

export const createTask = async(req,res)=>{

    const decoded = req.decoded

    //create task. only get here when registered user is authorized
    const {title, priority, author, tasks,description, scope:privacy} = req.body;

    //in case a request is sent from anywhere else except the front end, check for the body. This check needs to be asigned to a middleware
    if(!title || !priority || !author || !privacy) return res.status(400).json({msg:'Malformed Request'})

    // if id from token and author id do not match, send a 403 code
    if(decoded.UserInfo.id !== author.authorID) return res.status(403).json({msg: 'Unauthorized request: ID Mismatch'})
    

    //create the new object to be saved
    const newTask = new Todo({
        title,
        priority,
        author,
        tasks,
        privacy,
        description: description.trim().length > 0 ? description : '', createdAt: new Date().toISOString(), 
        log:[],
        team:{
            soloProject: true,
            members:[
                {id: decoded.UserInfo.id, 
                 role:'Author', 
                 name:`${decoded.UserInfo.firstName} ${decoded.UserInfo.lastName}`, 
                 statistics: []
                }]
        }
    });
    const newActivity = new Activity({
        user:{
            username: author.username,
            userId: author.authorID
        },
        field:'create', //hardcoded for now, will be modified once the feature is up
        to:newTask.title,
        createdAt: new Date(),
        task: newTask._id
    })

    
    try{
        //save activity
        await newActivity.save();
        //push activity in task logs
        newTask.log.push(newActivity);
        //save task and send it as response to the front end
        await newTask.save();
        res.status(201).json(newTask)
    }
    catch(error){
        res.status(409).json({message:error})
    }
    
}

export const deleteTask = async(req,res,next)=>{
    
    //delete task with specific id, only if authorized
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No task with such id"})

    
    const ress = await Todo.findByIdAndRemove(id);
    req.suggestions = ress.suggestions
    req.logs = ress.log
    next();
}

export const getTasks = async(req,res)=>{   
    const tasks = await  Todo.find({completed:false, privacy:'Public'}).sort({createdAt: -1});
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
    //fetch decoded token
    const decoded = req.decoded
    
try{
    const userTasks = await Todo.find({'author.authorID':decoded.UserInfo.id }).sort({ createdAt: -1 })
    if(userTasks.length > 0) return res.status(200).json(userTasks)
    else return res.status(404).json({msg:'No tasks found'})
}
   catch(err) {
        res.status(500).json({msg:err.message})
   }

    
}

export const fetchUserFavorites = async(req,res)=>{
    const {id} = req.decoded.UserInfo

    const user = await User.findOne({_id:id})
    const favorites = user.favorites
    
    const tasks = await Todo.find({ '_id': { $in: favorites } }).sort({createdAt: -1})
    if(tasks.length > 0 ) return res.status(200).json(tasks)
    else return res.status(404).json({msg:'User has no specified favorite tasks.'})
}

