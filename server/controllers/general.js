import Todo from "../models/todo.js";
import mongoose from "mongoose";

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

    //look for the suggestions through the suggestions through the id
    
}