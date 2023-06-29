import Todo from "../models/todo.js";

export const getTasksByPage = async (req,res) =>{
    const {page} = req.query;
    console.log('eeee')
    try{
        const LIMIT = 12;
        const startIndex = (Number(page) - 1) * LIMIT; 
        const total = await Todo.find({completed:false, privacy:'Public'}).countDocuments({});
        const tasks = await Todo.find({completed:false, privacy:'Public'}).sort({createdAt:-1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: tasks, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
    }
    catch(err){
        res.status(404).json({message: err.message})
    }
}
//LOGIC Sget index. if page = 1, (1-1) * 8 = 0. starting at 0. if page = 2 , (2-1) * 8 = 8   