import jwt from "jsonwebtoken";
import Todo from "../models/todo.js";

//this controller is used as middleware to determine if the user requesting a change/addition/deletion
//has any level of authorization
export const authorizeUser = (req,res,next) =>{
  //determine if there is any token 
  const header = req.headers.authorization
  //if undefined, deny access
  if(!header) return res.status(403).json({msg:'Unauthorized'})

  //get token and decode it
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.decode(token, process.env.JWT_SECRET)
  
  req.token = token
  req.decoded = decoded;
  next();
}

export const validateAuthor = async(req,res,next)=>{
  const id = req.decoded.UserInfo.id
  const {taskId} = req.params;

  const task = await Todo.findOne({_id:taskId})

  if(task.author.authorID.toString() !== id) return res.status(403).json({msg:'Only the author may use the invite privilege'})

  req.task = task;
  next();
}