import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";

export const signup = async (req,res)=>{
    //take the register data from body. if no data, return a 401 status code
    //if user exists send 409 code( confict )
    // validate data (need to be passed to the schema. e.g. password minlength:8, name lastname lengths. )
    //encrypt the password
    //create the user inside the database and save. send request code 201 and front should redirect user to login
    //anything else goes wrong, sent code 500(internal server error)
}

export const signin = async (req,res)=>{
    //get email and password from request body .If no data, return a 401 status code
    //lookup user in database. if not found, send a 401 code
    //if found, compare the password with the hash. if it's valid, generate a jwt token(1day length)
    //set the user field to that token.
    
}

export const signout = async (req,res)=>{
    //get token from header
    //search for user in database with that token
    //if any user is found, clear the token field and return 204 code.
    //if no user is found, return 204 code
}


//IDEALLY, this process will be converted to use cookies with secure option on, so as to not allow xss 