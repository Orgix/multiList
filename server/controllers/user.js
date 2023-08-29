import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/user.js";
import Todo from "../models/todo.js"
import { ExpressError } from "../middleware/errHandle.js";
import Request from "../models/requests.js";
import Suggestion from "../models/suggestion.js";
import Activity from "../models/activity.js";



export const registerUser = async (req,res)=>{
    //take the register data from body. if no data, return a 401 status code
    const {firstName,lastName, email, password, username} = req.body;
     if(!firstName || !lastName || !email || !password || !username) return res.status(401).json({message:'incomplete data for registration'})
    console.log(req.body)
    
    try{
        //if user exists send 409 code( confict )
        const existingUser = await User.findOne({ email }).exec();
        const existingUserEmail = await User.exists({username}).exec();
        if(existingUser || existingUserEmail) return res.status(409).json({message: "User already exists"});
        // validate data (need to be passed to the schema. e.g. password minlength:8, name lastname lengths. )
        //encrypt the password


        const hash = await bcrypt.hash(password, 12);
        const newUser = new User({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email:email,
            password: hash
        })
        console.log(newUser)
       await newUser.save();
    
        // create the user inside the database and save. send request code 201 and front should redirect user to login
        // anything else goes wrong, sent code 500(internal server error)
        res.status(201).json({message: 'Registration successfully complete!'})
    }
    catch(error){
        throw new ExpressError(error.message, error.code)
    }
    
}

export const loginUser = async (req,res)=>{
    //get email and password from request body .If no data, return a 401 status code(done from middleware with Joi)
    const {email, password} = req.body;
    
    //lookup user in database. if not found, send a 404 code
    const foundUser = await User.findOne({email}).populate({path:'friends', select: 'firstName lastName'}).exec();
    if(!foundUser) return res.status(404).json({message: 'User does not exist.'})
    
    //if found, compare the password with the hash. 
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match) return res.status(401).json({message:'Incorrect credentials'})

    //if it's valid, generate a jwt token(1day length)
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "email": foundUser.email,
                "firstName": foundUser.firstName,
                "lastName":foundUser.lastName,
                "joined" : foundUser.joined,
                "id": foundUser._id
            }
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    //before sending the response, handle saving the token, so the updatedAt field gets updated. this will basically be done likewisely on the sync feature
    //set the user field to that token.
    foundUser.token = accessToken

    //get user's requests, either ones sent or received.
    const requests =await Request.find({
      $or: [
        { from: foundUser._id },
        { to: foundUser._id }
      ]
    }).populate({path:'from', select:'firstName lastName'}).populate({path:'to', select:'firstName lastName'})
    console.log(requests)
    await foundUser.save();
    
    //get statistics (all tasks, even incomplete in tuples of (task_id, task_title,task_completed))
    const tasks = await Todo.find({'author.authorID':foundUser._id}).sort({createdAt: -1});
    const mutated = tasks.map(task=> ({id: task._id, title: task.title, completed:task.completed, privacy: task.privacy }))
    res.status(200).json({token:accessToken, user:{username:foundUser.username, firstName:foundUser.firstName, lastName:foundUser.lastName,email: foundUser.email, id:foundUser._id,joined:foundUser.joined,synced:foundUser.updatedAt, tasks:mutated, favorites:foundUser.favorites, friends: foundUser.friends, requests:requests}})
    
    
}

export const signout = async (req,res)=>{
    //get token from header
    const token = req.headers.authorization.split(' ')[1]
    //search for user in database with that token
    //if no user is found, return 204 code
    if(!token) return res.status(204).json({msg:'Unauthorized'})

    const foundUser = await User.findOne({token})
    if(!foundUser) return res.status(204)
    //if any user is found, clear the token field and return 204 code.
    foundUser.token = ''
    const result = await foundUser.save();
    console.log(result)
    
    res.status(200).json({msg:'Successfully signed out! Can\'t wait to see you back.'})
}

//IDEALLY, this process will be converted to use cookies with secure option on, so as to not allow xss 

/*since front-end is not requesting anything in the event the route is profile/me, 
there will be a check for any requests that are done outside the front-end
*/ 
export const fetchUserProfile = async(req,res)=>{
    //fetch the userId from the req parameters
    const {userId} = req.params;
    //if invalid simply end request here
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({msg: 'No such user'})

    //find user 
    const foundUser =await User.findOne({_id:userId})
    //if not found end request here
    if(!foundUser) return res.status(404).json({msg: 'No such user found'})

    //get all tasks
    const userTasks = await Todo.find({'author.authorID':userId }).sort({createdAt: -1});
    //get only public tasks(later on there has to be a filter to return private tasks that are giving you access.)
    const allTasks = userTasks.filter(task=> task.privacy === 'Public')
    //get active tasks(not completed)
    const activeTasks = allTasks.filter(task=> task.completed === false)
    const tasks = activeTasks.map(task=> ({id:task._id,title: task.title, completed: task.completed, privacy:task.privacy}))
    
    res.status(200).json({firstName: foundUser.firstName, lastName:foundUser.lastName, joined:foundUser.joined, alltasks: allTasks.length, active: activeTasks.length, completed: allTasks.length-activeTasks.length, tasks:tasks})
   
}

export const synchronizeUser = async(req,res)=>{
    //determine if there is any token 
    const header = req.headers.authorization
    //if undefined, deny access
    if(!header) return res.status(403).json({msg:'Unauthorized'})

    //get token and decode it
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    
    //get user
    const foundUser = await User.findOne({email:decoded.UserInfo.email})
    if(!foundUser) return res.status(404).json({msg:'User not found!'})

    //save user, so as to get an updatedAt new value to return
    foundUser.updatedAt = new Date()
    await foundUser.save();
    
    //find user's tasks
    const userTasks = await Todo.find({'author.authorID': foundUser._id}).sort({createdAt: -1});
    
    //since this is a profile/me operation, no need to filter the tasks. Both public/private and complete/incomplete are included
    //bundle them as tuples
    const mutated = userTasks.map(task=> ({id: task._id, title:task.title, completed:task.completed, privacy: task.privacy}))

    //send response
    res.status(200).json({tasks:mutated, synced:foundUser.updatedAt})
}

export const updateUser = async(req,res) =>{
    //destructure data from the body
    const {modObj, data, id} = req.body;

    //determine if there is any token 
    const header = req.headers.authorization
    //if undefined, deny access
    if(!header) return res.status(403).json({msg:'Unauthorized'})

    //get token and decode it
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token, process.env.JWT_SECRET)

    //if the variables weren't defined return 401 code
    if(!modObj || !data || !id) return res.status(401).json({msg:'Malformed body'})
    
    //in case this is not coming from the front-end , there's a possibility the user Ids do not match
    if(id !== decoded.UserInfo.id) return res.status(403).json({msg:'Unauthorized'})

    //update depending on modObj, if email or username are to be changed, they need to not exist already, else forbit the change
    const userEmailExists = await User.exists({email: data.email})
    const usernameExists = await User.exists({username: data.username})

    if(userEmailExists && modObj.remainderChange.includes('email')){
        return res.status(403).json({msg:'Given email is already in use.'})
    }
    if(usernameExists && modObj.remainderChange.includes('username')){
        return res.status(403).json({msg:'Username already in use.'})
    }

    //find user
    const user = await User.findOne({_id: id}).exec();
    
    if(!user) return res.status(404).json({msg:'User not found'}) 
    //update depending on the modes. if remainder array has anything in, it means at least one property is to be patched
    if(modObj.remainderChange.length > 0){
        
        //loop through the keys and update the user object
        modObj.remainderChange.forEach(mode=>{
            user[mode] = data[mode]
        })
    }   
    //if there is a passwordChange request, proceed and compare the given old password before assigning the new one
    if(modObj.passwordChange){
        //this if clause is only valid in case a password change is requested outside of the front-end
        if(data.passwordNew !== data.passwordNewConfirm) return res.status(403).json({msg:'New passwords need to match'})
        
        //compare passwords
        const match = await bcrypt.compare(data.passwordOld, user.password)
        if(!match) return res.status(403).json({msg:'Incorrect password'})

        //if the hash of the new password is a match, this means the same password was given
        const matchesOldPassword = await bcrypt.compare(data.passwordNew, user.password)
        if(matchesOldPassword){
            return res.status(403).json({msg:'New password should not be a match to the new password'})
        }
        const newPwd = await bcrypt.hash(data.passwordNew, 12)
        user.password = newPwd
    }
    //save all changes
    await user.save();
    
    //perform a sync for the tasks
    const tasks = await Todo.find({'author.authorID':user._id}).sort({createdAt: -1});
    const mutated = tasks.map(task=> ({id: task._id, title: task.title, completed:task.completed, privacy: task.privacy }))
    res.status(200).json({ user:{username: user.username, firstName:user.firstName, lastName:user.lastName,email: user.email, id:user._id,joined:user.joined,synced:user.updatedAt, tasks:mutated}})
}

export const deleteUser = async(req,res,next)=>{
    const header = req.headers.authorization
    //if undefined, deny access
    if(!header) return res.status(403).json({msg:'Unauthorized'})

    //get token and decode it
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    
    const {userId} = req.params;

    if(!userId || !mongoose.Types.ObjectId.isValid(userId)) return res.status(401).json({msg:'Bad request'})

    //ids need to match to authenticate who the user is
    if(userId !== decoded.UserInfo.id) return res.status(403).json({msg:'IDs not matching'})

    //get all tasks for deleted user , flatmap the suggestions for all user's tasks
    const tasks = await Todo.find({'author.authorID':decoded.UserInfo.id }).populate('suggestions').exec()
    
    //get all task ids in an array
    const task_ids = tasks.map(task=> task._id)
    //get all user's task comment
    const ownTaskComments = tasks.flatMap( task=> task.suggestions )
    //get all activities from user's tasks
    const taskLogs = tasks.flatMap(task=> task.log)
    
    //get all suggestions user made in the app suggestion boxes.
    const suggs = await Suggestion.find({'author.authorID': userId, isReply:false})
    //replies made by the user in general
    const replies = await Suggestion.find({'author.authorID': userId, isReply:true})

    //get the user's suggestion replies ids that are not generated from the user
    const repliesIds = replies.map(reply=> reply._id)
    //all replies on user's tasks
    const ownTaskReplies = tasks.flatMap(task=> task.suggestions.flatMap(suggestion=> suggestion.replies))


    //delete the flatmapped suggestions from db, delete all the activities, delete all replies user has ever made
    await Suggestion.deleteMany({_id: {$in: ownTaskComments}})
    await Activity.deleteMany({_id: {$in: taskLogs}}) 
    
    
    const remainingSuggestions = suggs.filter(suggestion=>!ownTaskComments.includes(suggestion._id.toString())).map(suggestion=> [suggestion._id.toString(), suggestion.task.toString()])
    const repliesModified = replies.map(reply=> [reply._id.toString(), reply.to.toString()])
    
    //use array reduce and convert this into an object that has taskid properties and array of it's own suggestions to be deleted
    
    await Suggestion.deleteMany({'author.authorID': userId, isReply:true})
    
    const grouped = remainingSuggestions.reduce((acc, [suggestionId, taskId]) => {
        if (acc.hasOwnProperty(taskId)) {
          acc[taskId].push(suggestionId);
        } else {
          acc[taskId] = [suggestionId];
        }
        return acc;
      }, {});
      
      const repliesGrouped = repliesModified.reduce((acc, [replyId, suggestionId]) => {
        if (acc.hasOwnProperty(suggestionId)) {
          acc[suggestionId].push(replyId);
        } else {
          acc[suggestionId] = [replyId];
        }
        return acc;
      }, {});
      
      await Todo.deleteMany({'author.authorID':decoded.UserInfo.id })

      //provide bulk update operations, for each task property id, pull the suggestions
      const operations = Object.entries(grouped).map(([taskId, suggestionIds]) => ({
        updateOne: {
          filter: { _id: taskId },
          update: { $pull: { suggestions: { $in: suggestionIds } } }
        }
      }));

      const replyOperations = Object.entries(repliesGrouped).map(([suggestionId, replyIds]) => ({
        updateOne: {
          filter: { _id: suggestionId },
          update: { $pull: { suggestions: { $in: replyIds } } }
        }
      }));
      
    //update in bulk
    await Todo.bulkWrite(operations);
    await Suggestion.bulkWrite(replyOperations)

     //delete user
     await User.deleteOne({_id: userId})
    
     
     //return the deleted task ids to the front end. Will be needed for filtering redux state
     res.status(200).json({ids: task_ids})
}

export const toggleFavorite = async(req,res)=>{
    //get task id and the toggle status of it
    const {taskId} = req.params;
    const {favorite} = req.body;

    //get authorization token , need user Id to access it 
    const header = req.headers.authorization
    //if undefined, deny access
    if(!header) return res.status(403).json({msg:'Unauthorized'})

    //get token and decode it
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token, process.env.JWT_SECRET)

    //fetch user id and query with it
    const userId = decoded.UserInfo.id
    const foundUser = await User.findOne({_id: userId});
    
    //if toggle was false, this means the post is not in the list of favorites(front)
    if(!favorite) {
        //push the id in
        foundUser.favorites.push(taskId)
    }
    else{
        //toggle is true, which means this is a request to remove from favorites
       foundUser.favorites =  foundUser.favorites.filter(favorite=> favorite.toString() !== taskId)
    }
    //save user data
    await foundUser.save()
    //return favorites with response
    res.status(200).json({favorites: foundUser.favorites})
}

export const addUserToFriendList = async(req,res,next)=>{
  const  {userId} = req.params;
  //get authorization token , need user Id to access it 
  const header = req.headers.authorization
  //if undefined, deny access
  if(!header) return res.status(403).json({msg:'Unauthorized'})

  //get token and decode it
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.decode(token, process.env.JWT_SECRET)
  const id = decoded.UserInfo.id

  const friendRequest = new Request({
    from: id,
    to: userId,
    requestType: 'FRIEND REQUEST',
    status: 'PENDING'
  })

  await friendRequest.save();

  res.status(200).json({id:friendRequest._id ,to:userId, from:id, type: friendRequest.requestType, status: friendRequest.status})
}

export const deleteUserFromFriendList = async(req,res,next)=>{
  const  {userId} = req.params;
  //get authorization token , need user Id to access it 
  const header = req.headers.authorization
  //if undefined, deny access
  if(!header) return res.status(403).json({msg:'Unauthorized'})

  //get token and decode it
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.decode(token, process.env.JWT_SECRET)
  const id = decoded.UserInfo.id
 //fetch user
  const user = await User.findOne({_id: id}).exec();
//filter the user list. leave the requested id out
  user.friends = user.friends.filter(friend=> friend.toString() !== userId)
  //save
  await user.save()
//return id to front 
  res.status(200).json({id:userId});
}

export const cancelRequest = async(req,res,next)=>{
  //get parameters of request
  const {userId, requestId} = req.params;

  
  
  const header = req.headers.authorization
  //if undefined, deny access
  if(!header) return res.status(403).json({msg:'Unauthorized'})
  if(!userId || !requestId) return res.status(401).json({msg:'Bad request'}) 
  //get token and decode it
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.decode(token, process.env.JWT_SECRET)
  const id = decoded.UserInfo.id
  
  //confirm user canceling the request matches the user that has the token
  if(id !== userId) return res.status(403).json({msg:'Unauthorized request. Id mismatch'})

  //find specific request with given id and delete it.
  await Request.deleteOne({_id: requestId})
 // return the deleted id to front
  res.status(200).json({id: requestId})
}

export const searchUser = async(req,res,next)=>{
  console.log(req.params)
}

export const resolveRequest = async(req,res) =>{
  const {requestId, response} = req.params;

  const header = req.headers.authorization
  //if undefined, deny access
  if(!header) return res.status(403).json({msg:'Unauthorized'})
  if(!requestId) return res.status(401).json({msg:'Bad request'}) 
  //get token and decode it
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.decode(token, process.env.JWT_SECRET)
  const id = decoded.UserInfo.id

  const request = await Request.findOne({_id:requestId})
  //if the one resolving the request isn't the user, end of route here.
  if(request.to.toString() !== id) return res.status(401).json({msg:'Id mismatch'})
  //if it's a deny request resolve, return the message
  if(!response) return res.status(200).json({msg:'Denied request'})

  const ownUser = await User.findOne({_id:request.to})
  const otherUser = await User.findOne({_id:request.from})
  
  //add one user to the other's friend list
  ownUser.friends.push(request.from)
  otherUser.friends.push(request.to)

  //in front-end, use the request's id to filter it from the requests
  await Request.deleteOne({_id:requestId})

  res.status(200).json({msg:'Accepted request'})
}