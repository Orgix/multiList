import jwt from "jsonwebtoken";

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