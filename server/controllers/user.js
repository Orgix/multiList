import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { ExpressError } from "../middleware/errHandle.js";


export const registerUser = async (req,res)=>{
    //take the register data from body. if no data, return a 401 status code
    const {firstName,lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password) return res.status(401).json({message:'incomplete data for registration'})
    
    
    try{
        //if user exists send 409 code( confict )
        const existingUser = await User.findOne({ email }).exec();
        if(existingUser) return res.status(409).json({message: "User already exists"});
        // validate data (need to be passed to the schema. e.g. password minlength:8, name lastname lengths. )
        //encrypt the password


        const hash = await bcrypt.hash(password, 12);
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email:email,
            password: hash
        })
    
        await newUser.save();
    
        //create the user inside the database and save. send request code 201 and front should redirect user to login
        //anything else goes wrong, sent code 500(internal server error)
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
    const foundUser = await User.findOne({email}).exec();
    if(!foundUser) return res.status(404).json({message: 'User does not exist.'})
    
    //if found, compare the password with the hash. 
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match) return res.status(401).json({message:'Incorrect credentials'})

    //if it's valid, generate a jwt token(1day length)
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email,
                "firstName": foundUser.firstName,
                "lastName":foundUser.lastName,
                "joined" : foundUser.joined
            }
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
    
    res.status(200).json({message: 'Welcome back, ', token:accessToken, user:{name:foundUser.firstName, surname:foundUser.lastName, id:foundUser._id}})
    //set the user field to that token.
    foundUser.token = accessToken
    await foundUser.save();
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