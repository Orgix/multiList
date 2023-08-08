import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcryptjs'

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    username:'feecollector',
    firstName: "Awkard",
    lastName: "Encounter",
    email: "tnikos28@gmail.com",
    password: "$2a$12$0OXXZ/W3E1INv/uvvOx.NO7rmjRjRaU2h3auR1mumQBKEasI5Jo5a",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    username:'guitarist96',
    firstName: "Nikolas",
    lastName: "Tsisler",
    email: "nikolaos.tsoynias@gmail.com",
    password: "$2a$12$0OXXZ/W3E1INv/uvvOx.NO7rmjRjRaU2h3auR1mumQBKEasI5Jo5a",
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    username:'tryharders',
    firstName: "Nikos",
    lastName: "Tsounias",
    email: "tnikos29@gmail.com",
    password: "$2a$12$0OXXZ/W3E1INv/uvvOx.NO7rmjRjRaU2h3auR1mumQBKEasI5Jo5a",
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    username:'wicha',
    firstName: "Dimitris",
    lastName: "Tsoulfas",
    email: "tnikos69@gmail.com",
    password: "$2a$12$0OXXZ/W3E1INv/uvvOx.NO7rmjRjRaU2h3auR1mumQBKEasI5Jo5a",
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  }
];

export const tasks = [
  {
    _id: new mongoose.Types.ObjectId(),
    author:{
      name:`${users[0].firstName} ${users[0].lastName}`,
      authorID: users[0]._id
    },
    team:{
      id:''
    },
    title: "New poster idea",
    description: "Some really spontaneous idea about implementing a poster",
    completed:false,
    createdAt: new Date(),
    tasks:[
      {name:'find palette', completed: true},
      {name:'find fontSize', completed: false}
    ],
    priority:2,
    privacy:'Public',
    suggestions:[]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    author:{
      name:`${users[0].firstName} ${users[0].lastName}`,
      authorID: users[0]._id
    },
    team:{
      id:''
    },
    title: "Calculator idea desktop",
    description: "a calculator idea to solve equations",
    completed:false,
    createdAt: new Date(),
    tasks:[
      {name:'find the right stack', completed: true},
      {name:'find functions', completed: false}
    ],
    priority:1,
    privacy:'Public',
    suggestions:[]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    author:{
      name:`${users[1].firstName} ${users[1].lastName}`,
      authorID: users[1]._id
    },
    team:{
      id:''
    },
    title: "MERN Stack templating ",
    description: "list of all the steps to have a template mern stack project ready",
    completed:false,
    createdAt: new Date(),
    tasks:[
      {name:'find palette', completed: false},
      {name:'find fontSize', completed: true},
      {name:'define crud routes', completed: true},
      {name:'define password security', completed: false},
      {name:'Authentication', completed: true},
      {name:'Authorization', completed: false},
    ],
    priority:2,
    privacy:'Public',
    suggestions:[]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    author:{
      name:`${users[2].firstName} ${users[2].lastName}`,
      authorID: users[2]._id
    },
    team:{
      id:''
    },
    title: "New book idea",
    description: "Spontaneous book idea",
    completed:false,
    createdAt: new Date(),
    tasks:[
      {name:'find publisher', completed: true},
      {name:'discuss publish costs', completed: false}
    ],
    priority:4,
    privacy:'Private',
    suggestions:[]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    author:{
      name:`${users[3].firstName} ${users[3].lastName}`,
      authorID: users[3]._id
    },
    team:{
      id:''
    },
    title: "Code igniter project todos",
    description: "Latest code igniter project assignments",
    completed:false,
    createdAt: new Date(),
    tasks:[
      {name:'make models', completed: true},
      {name:'make views', completed: false},
      {name:'make controllers', completed: false},
      {name:'find a new theme', completed: true},
    ],
    priority:2,
    privacy:'Public',
    suggestions:[]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    author:{
      name:`${users[2].firstName} ${users[2].lastName}`,
      authorID: users[2]._id
    },
    team:{
      id:''
    },
    title: "Pc parts",
    description: "a short list of the pc parts I am hunting for along with their prices",
    completed:false,
    createdAt: new Date(),
    tasks:[
      {name:'cpu ryzen 5 3600 - $100', completed: true},
      {name:'gpu gtx 1660 - $200', completed: false},
      {name: 'ram gskill ripjaw 3600mhz x 2 - $120', completed: false}
    ],
    priority:1,
    privacy:'Public',
    suggestions:[]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    author:{
      name:`${users[1].firstName} ${users[1].lastName}`,
      authorID: users[1]._id
    },
    team:{
      id:''
    },
    title: "Gaming plan for august",
    description: "List of activities to achieve the most out of the game I just bought",
    completed:false,
    createdAt: new Date(),
    tasks:[
      {name:'lvl up to 50', completed: true},
      {name:'Complete HELL\'s tribunal hard mode', completed: false},
      {name:'farm the new vm3 gear', completed: false},
      {name:'mcnm 3 times', completed: false}
    ],
    priority:2,
    privacy:'Public',
    suggestions:[]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    author:{
      name:`${users[3].firstName} ${users[3].lastName}`,
      authorID: users[3]._id
    },
    team:{
      id:''
    },
    title: "Car shortlist",
    description: "a shortlist of the cars I want to study before I buy",
    completed:false,
    createdAt: new Date(),
    tasks:[
      {name:'BMW M3', completed: true},
      {name:'Seat Leon 2019', completed: false},
      {name: 'Daihatsu Terios(2020)', complted:true}
    ],
    priority:2,
    privacy:'Public',
    suggestions:[]
  },
];

export const suggestions = [
  {
    _id: new mongoose.Types.ObjectId(),
    text:'A rather nice idea. Were I in your shoes, i\'d try rationalize the functions',
    author:{
      name:`${users[1].firstName} ${users[1].lastName}`,
      authorID: users[1]._id
    },
    edited:false,
    createdAt: new Date(),
    task: tasks[1]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text:'What will be illustrated in the poster?',
    author:{
      name:`${users[3].firstName} ${users[3].lastName}`,
      authorID: users[3]._id
    },
    edited:true,
    createdAt: new Date(),
    task: tasks[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text:'What I had in mind was a scaled out picture of NYC',
    author:{
      name:`${users[0].firstName} ${users[0].lastName}`,
      authorID: users[0]._id
    },
    edited:false,
    createdAt: new Date(),
    task: tasks[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text:'Nice idea! Consider to escalate this to something bigger',
    author:{
      name:`${users[1].firstName} ${users[1].lastName}`,
      authorID: users[1]._id
    },
    edited:false,
    createdAt: new Date(),
    task: tasks[3]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text:'Have you considered the architecture for the whole project?',
    author:{
      name:`${users[2].firstName} ${users[2].lastName}`,
      authorID: users[2]._id
    },
    edited:false,
    createdAt: new Date(),
    task: tasks[4]._id
  },
]
export const activities = [

]

tasks[0].suggestions.push(suggestions[1]._id, suggestions[2]._id)
tasks[1].suggestions.push(suggestions[0]._id)
tasks[3].suggestions.push(suggestions[3]._id)
tasks[4].suggestions.push(suggestions[4]._id)

