import Todo from "../models/todo.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

export const getTasksByPage = async (req,res) =>{
    //get page from query
    const {page} = req.query;
    //if page is null or a number smaller than 0, return 400 code.
    if(!Number(page) || Number(page) <= 0) return res.status(400).json({msg:'invalid parameter'})
    try{
        //hardcoded defined limit, normally set within a .env
        const LIMIT = 12;
        //define start and get total number of items
        const startIndex = (Number(page) - 1) * LIMIT; 
        const total = await Todo.find({completed:false, privacy:'Public'}).countDocuments({});
        //if page number is bigger than the maxNum of pages return 400 code
        if(Math.ceil(total/LIMIT) < page) return res.status(404).json({msg:'invalid parameter'})

        //fetch the tasks requested, set limit ,sort and skip depending on starting index
        const tasks = await Todo.find({completed:false, privacy:'Public'}).sort({createdAt:-1}).limit(LIMIT).skip(startIndex);
        //return tasks, current page, number of pages
        res.status(200).json({data: tasks, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}
//LOGIC Sget index. if page = 1, (1-1) * 8 = 0. starting at 0. if page = 2 , (2-1) * 8 = 8   
//NUM PAGES => if limit = 12 and total 55, 55/12 =  4.583 => num_pages = 5, which basicaly means, 4*12=48, 55-48 = 7 , 4 full pages and 1 5th page with 7/12 limit

export const getTaskSuggestions = async(req,res)=>{
    //get task id 
    const {taskId} = req.params;
    //if invalid, return bad request code
    if(!mongoose.Types.ObjectId.isValid(taskId)) return res.status(400).json({msg: 'Invalid task id'})

    //look for the suggestions through the suggestions through the task id, and populate the reference fields
    const foundTask = await Todo.findOne({_id : taskId}).populate('suggestions');
    //if there was not any task with the given taskId, return a 404 code
    if(!foundTask) return res.status(404).json({msg:'Task not found'})

    //create the comments object for the front end
    const suggestions = foundTask.suggestions.length > 0 ? foundTask.suggestions.map(suggestion=>{
        return {id: suggestion._id, text: suggestion.text, author: suggestion.author, created: suggestion.createdAt}
    }) : [] ;
    
    
    //return the response
    res.status(200).json(suggestions)
}


export const postSuggestion = async(req,res)=>{
    //determine if there is any token 
    const header = req.headers.authorization
    //if undefined, deny access
    if(!header) return res.status(403).json({msg:'Unauthorized'})

    //get token and decode it
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    //if token information doesnt match the information from the body, do not proceed
    const newSuggestion = req.body;
    const {taskId} = req.params;

    if(!taskId || !validateSuggestion(newSuggestion)) return res.status(404).json({msg:'Incomplete data for the creation request'})
    //setup suggestion
}

const validateSuggestion = (obj) =>{
     // Check if the required keys exist in the object
  if (obj.hasOwnProperty('text') && obj.hasOwnProperty('author'))
  {
    if(obj.author.hasOwnProperty('name') && obj.author.hasOwnProperty('authorID')) return true; // Object is valid
  }

  return false; // Object is invalid
}