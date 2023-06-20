import { Box, Button, Container, Grid, Paper, TextField, Typography,InputAdornment, Select, FormControl, MenuItem,InputLabel} from '@mui/material'
import { useState, useEffect } from 'react'
import TitleIcon from '@mui/icons-material/Title';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { styles } from './styles';
import TodoItem from './TodoItem'
import {v4 as uuid} from 'uuid';
import useToggle from '../../../hooks/useToggle'
import { validateTask } from '../../../utils/validateInput';
import { createTask } from '../../../services/actions/tasks';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'



const NewTask = () => {
  const user = useSelector((state)=>state.auth.user)
  const initialState = {title:'', priority:'', scope:'', author:`${user.name} ${user.surname}`,subtask:''}
  const [taskData, setTaskData] = useState(initialState)
  const [todos, setTodos] = useState([])
  const [disabled, setDisabled] = useToggle(true)
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  
  /* TODO LIST FUNCTIONALITIES --- START  */
        const handleDelete = (id) =>{
            //event triggers  from delete button, delete the task with the given id, by filtering the state and setting 
            //itemthe one to not have 
            setTodos(prev=>{
                return prev.filter(todo=> todo.id !== id)
            })
        }

            const handleComplete = (id) =>{
                //toggle completion status of task with the given id, 
                //map throught the state and return a state where the 
                //given task has its complete property toggled
                setTodos(prev=>{
                    return prev.map(todo=>{
                        if(todo.id === id){
                            return {...todo, completed: !todo.completed}
                        }
                        return todo
                    })
                })
            }

        const handleCreate = () =>{
            //check if the input is empty
            if(taskData.subtask.trim() !== ''){
                //create the object
                const newSubtask = {id: uuid(), name:taskData.subtask.trim(), completed:false}
                //set the state with the new object
                setTodos(prev=> [...prev, newSubtask])
                //empty input field
                setTaskData(prev=>({...prev, subtask:''}))
            }
        }
    const handleKeyDown = (event) => {
        //in case the enter button is press, trigger the create process
        if (event.key === 'Enter') {
        handleCreate();
        }
    };
  /* TODO LIST FUNCTIONALITIES --- END  */


  const handleChange = (e) =>{
    //change the value for the given name of form
    setTaskData({...taskData, [e.target.name]:e.target.value})
  }
  const handleSubmit = () =>{
    /*in case data were altered while the save button is not disabled, make one last check and disable it if
    the criteria are met. Else, proceed to creating the task*/

    const task_keys = Object.keys(taskData).filter(key=> key !== 'tasks' && key !== 'subtask' && key !== 'author')
    setDisabled(!validateTask(taskData, task_keys))
    
    if(!disabled){
        //proceed to create the task
        const newTask = {title: taskData.title, priority: taskData.priority, scope:taskData.scope, author:taskData.author}
        
        if(todos.length > 0){
           newTask["tasks"] = todos.map(todo=> ({name: todo.name, completed: todo.completed}))
           console.log(newTask)
        }
        dispatch(createTask(newTask))
        setTaskData(initialState)
        setTodos([])
        navigate('..')
    }
  }

  const handleBlur = ()=>{
    const task_keys = Object.keys(taskData).filter(key=> key !== 'tasks' && key !== 'subtask' && key !== 'author')
    setDisabled(!validateTask(taskData, task_keys))
  }


  return (
    <Container component="main">
        <Paper elevation={3} sx={{py:2, my:2}}>
            <Container  maxWidth="sm" sx={{mt:2}}>
                <Typography variant="h3" sx={{textAlign:'center'}}>
                    Create your task
                </Typography>
            
                <form sx={{mb:2}}>
                    <Grid container spacing={2} justifyContent="center" sx={{my:3}}>
                        <Grid item xs={12}>
                            
                            <TextField 
                                fullWidth 
                                type="text" 
                                label="Title" 
                                name="title" 
                                value={taskData.title} 
                                onChange={handleChange} 
                                onBlur={handleBlur}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start"><TitleIcon sx={{color:'#5dbede'}}/></InputAdornment>,
                                  }}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Priority">Priority</InputLabel>
                                <Select
                                    labelId="Priority"
                                    id="Priority"
                                    value={taskData.priority}
                                    label="Priority"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="priority"
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={0}>No priority</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Scope">Scope</InputLabel>
                                <Select
                                    labelId="Scope"
                                    id="scope"
                                    value={taskData.scope}
                                    label="Scope"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="scope"
                                >
                                    <MenuItem value='Public'>Public</MenuItem>
                                    <MenuItem value='Private'>Private</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Typography variant="h3" sx={{textAlign:'center'}}>
                        Add subtasks
                    </Typography>
                    
                    <Box sx={styles.container}>
                        <TextField variant="outlined" sx={styles.input} InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius:0 } }}fullWidth type="text" label="Add subtask" name="subtask" value={taskData.subtask} onChange={handleChange} onKeyDown={handleKeyDown}/>
                        <Typography variant="subtitle2" sx={[styles.helperText,{display:{xs:'none', sm:'block'}}]}>press enter or the button to add</Typography>
                        <Button onClick={handleCreate} size="large" sx={styles.btn}>Add</Button>
                    </Box>
                </form>
                                
                </Container>
                {/* render only if there are todos */}
                {todos.length > 0 && 
                    <Container maxWidth="xl" sx={{mt:5}}>
                        <Grid container spacing={2}>
                                {todos.map(todo=> <TodoItem 
                                                    key={todo.id} 
                                                    todo={todo} 
                                                    handleComplete={handleComplete}
                                                    handleDelete={handleDelete}
                                                />
                                )}
                        </Grid>
                    </Container>
                }
                <Container sx={styles.saveWrapper} disableGutters>
                    <Button size="small" sx={styles.saveBtn} onClick={handleSubmit} disabled={disabled}>Save</Button>
                </Container>
                
        </Paper>
        </Container>
  )
}

export default NewTask