import baseJoi from 'joi';
import sanitizeHtml from 'sanitize-html'

import { ExpressError } from './errHandle.js';

const extension = (joi) =>({
    type:'string',
    base:joi.string(),
    messages:{
        'string.escapeHTML':'{{#label}} must not include HTML!'
    },
    rules:{
        escapeHTML:{
            validate(value,helpers){
                const clean = sanitizeHtml(value,{
                    allowedTags:[],
                    allowedAttributes:{},
                });
                if(clean !== value) return helpers.error('string.escapeHTML',{value})
                return clean;
            }
        }
    }
})
const Joi = baseJoi.extend(extension)
const userSchema = Joi.object({
        firstName: Joi.string().min(5).max(12).required().escapeHTML(),
        lastName: Joi.string().min(5).max(12).required().escapeHTML(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','uk','gr','fr','in','de','ru','br'] } }).required(),
        password:Joi.string().min(8).max(15).required().alphanum()
}) 

const taskSchema = Joi.object({
    priority:Joi.number().required().min(0).max(4),
    title:Joi.string().min(5).max(20).required().escapeHTML()
})


//apply same validation on subtasks. (needs to be string, min 5, max 12)


export const validateUser = (req,res,next)=>{
    const {error} = userSchema.validate(req.body)
    
    if(error) {
        console.log("ERROR HERE")
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    }
    next();
}