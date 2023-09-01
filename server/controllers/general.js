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
        const tasks = await Todo.find({completed:false, privacy:'Public'}).populate('log').sort({createdAt:-1}).limit(LIMIT).skip(startIndex);
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
        return {id: suggestion._id, text: suggestion.text, author: suggestion.author, created: suggestion.createdAt, edited: suggestion.edited, replies:suggestion.replies.length}
    }) : [] ;
    
    
    //return the response of the comments , sorted by date
    res.status(200).json(suggestions.sort((a, b) => new Date(b.created) - new Date(a.created)))
}


export const postSuggestion = async(req,res)=>{ 
    //if comment is a reply, same procedure happens, but we get to mark it as a reply and there will a commentId
    const decoded = req.decoded
    
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
        task: taskId,
        createdAt: new Date()
    });
    await savedSuggestion.save();
    //push the generated id to the associated task
    foundTask.suggestions.push(savedSuggestion._id);
    await foundTask.save();

    //return the new suggestion
    res.status(201).json({id:savedSuggestion._id, text: savedSuggestion.text, author:savedSuggestion.author, created:savedSuggestion.createdAt})
}


export const deleteSuggestion = async(req,res)=>{//deleting a suggestion means deleting the replies it has in its replies array
    const {taskId, suggestionId} = req.params;

    const decoded = req.decoded

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

    //map suggestion id and its replies ids in a single array
   const suggestionAndReplies = [new mongoose.Types.ObjectId(suggestionId), ...foundSuggestion.replies]
   //delete them
   await Suggestion.deleteMany({_id: {$in: suggestionAndReplies}})
   
    //return id so it can be deleted from the state at the front end
    res.status(200).json({id: suggestionId})


}

export const editSuggestion = async(req,res)=>{
    //validate parameter and body
    const {suggestionId} = req.params;
    const {suggestion} = req.body;

    //if id is null or not a valid id, return code 400
    if(!suggestionId || !mongoose.Types.ObjectId.isValid(suggestionId))return res.status(400).json({msg:'Invalid id.'})
    //if suggestion was empty, return code 400
    if(!suggestion) return res.status(400).json({msg:'Malformed data'})

    const foundSuggestion = await Suggestion.findOne({_id:suggestionId});

    foundSuggestion.text = suggestion;
    foundSuggestion.edited = true;

    await foundSuggestion.save();

    res.status(200).json({id:foundSuggestion._id, author:foundSuggestion.author, text:foundSuggestion.text, edited: foundSuggestion.edited, created: foundSuggestion.createdAt })
}

export const deleteSuggestions = async(req,res,next)=>{
    const {suggestions} = req
    console.log(suggestions)
    //this controller is triggered when a task is deleted. For simplicity and readability, the suggestions are transfered here for deletion
    //as they have replies in that need to be mapped too.
    try{
        const rootSuggestions = await Suggestion.find({_id:{$in: suggestions}})
        console.log(rootSuggestions)
        //since both replies and suggestions are on the Suggestion Model
        //we can flat map them into one big array of to be deleted ids
        const allSuggestions = [...rootSuggestions.flatMap(suggestion=> suggestion.replies),...suggestions]
        console.log(allSuggestions)
        //delete them and proceed to the next controller
        await Suggestion.deleteMany({_id:{$in: allSuggestions}})

    }
    catch(error){
        res.status(500).json({msg:'Issue deleting suggestions of task'})
    }
}

export const fetchReplies = async(req,res)=>{
    const {suggestionId: id} = req.params;

    console.log(id)

    try{
        const comment = await Suggestion.findOne({_id:id}).populate('replies').exec();
        
        if(comment.replies.length === 0) return res.status(404).json({msg:'No replies found in response to this comment'})
        
        res.status(200).json(comment.replies)

    }
    catch(error){
        res.status(500).json({msg:'Issue during fetching suggestion replies'})
    }
}

export const postReply = async(req,res)=>{
    const {suggestionId} = req.params;
    const {reply} = req.body;

    const suggestion = await Suggestion.findOne({_id: suggestionId})
    const newReply = new Suggestion({
        ...reply,
        createdAt: new Date()
    })

    await newReply.save();
    suggestion.replies.push(newReply._id);

    

    res.status(201).json(reply)
    await suggestion.save();
}

export const deleteReply = async(req,res)=>{
    const {suggestionId, replyId} = req.params;

    const suggestion = await Suggestion.findOne({_id: suggestionId}).exec();
    suggestion.replies = suggestion.replies.filter(reply => reply.toString() !== replyId)

    await Suggestion.deleteOne({_id: replyId})
    await suggestion.save();

    res.status(200).json({id: replyId, suggestion: suggestionId})
}
