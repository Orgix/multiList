import Todo from "../models/todo.js";
import Suggestion from "../models/suggestion.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { validateSuggestion } from "../utils/helpers.js";


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
    res.status(200).json(suggestions.sort((a, b) => new Date(b.created) - new Date(a.created)))
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

    //if either task id is invalid or the request body is malformed, return a 400
    if(!taskId || !validateSuggestion(newSuggestion)) return res.status(400).json({msg:'Incomplete data for the creation request'})
    
    //check if the task author  matches the one inside the decoded token, proceed only this way
    const foundTask = await Todo.findOne({_id:taskId}).exec();

    if(!foundTask) return res.status(404).json({msg:'Not found!'})
    if(`${decoded.UserInfo.firstName} ${decoded.UserInfo.lastName}` !== newSuggestion.author.name) return res.status(403).json({msg:'Unauthorized'})
    
    //If the route reaches this point, this means that the comment post is cleared for creation.
    //create and save the new suggestion
    const savedSuggestion = new Suggestion({
        ...newSuggestion,
        createdAt: new Date()
    });
    await savedSuggestion.save();
    //push the generated id to the associated task
    foundTask.suggestions.push(savedSuggestion._id);
    await foundTask.save();

    //return the new suggestion
    res.status(201).json({id:savedSuggestion._id, text: savedSuggestion.text, author:savedSuggestion.author, created:savedSuggestion.createdAt})
}


export const deleteSuggestion = async(req,res)=>{
    const {taskId, suggestionId} = req.params;

    //determine if there is any token 
    const header = req.headers.authorization
    //if undefined, deny access
    if(!header) return res.status(403).json({msg:'Unauthorized'})

    //get token and decode it
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token, process.env.JWT_SECRET)

    //if any of the parameters are malformed, abort request
    if(!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(suggestionId)) return res.status(400).json({msg:'At least one of the parameters is not valid.'})
    
    //ensure that either the task author or the suggestion author are deleting the suggestion, else abort
    //if deleter isn't task author, deleter can only delete suggestions that much the ids,
    //task author can delete all suggestions
    const foundSuggestion = await Suggestion.findOne({_id: suggestionId});
    const foundTask = await Todo.findOne({_id: taskId})
    
    //task author
    const author = foundTask.author.name
    //suggestion author
    const suggestionAuthor = foundSuggestion.author.name 

    //user that requested the deletion
    const deleter = `${decoded.UserInfo.firstName} ${decoded.UserInfo.lastName}`
    
    //user is not author or suggestionAuthor, hence can't proceed to deleting
    if(deleter !==  author && deleter !== suggestionAuthor) return res.status(403).json({msg:'Unauthorized'})

    //delete the suggestion from the task
    foundTask.suggestions = foundTask.suggestions.filter(suggestion=> suggestion.toString() !== suggestionId )
    await foundTask.save();

    //delete suggestion 
    await Suggestion.deleteOne({_id: suggestionId})

    //return id so it can be deleted from the state at the front end
    res.status(200).json({id: suggestionId})


}