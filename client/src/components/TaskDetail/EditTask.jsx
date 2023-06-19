import {useSelector, useDispatch} from 'react-redux'
import { getTaskById, getTasksError} from '../../services/state/taskSlice'
import {useParams, useNavigate} from 'react-router-dom';
import { fetchTask } from '../../services/actions/tasks';
import { Box, Typography, Grid, Paper, CircularProgress,Button, TextField, FormControl, Select, MenuItem, InputLabel,Container } from '@mui/material';
import { convertToRelativeTime } from '../../utils/time';
import { useEffect} from 'react';
import { getLoading } from '../../services/state/taskSlice';
import Subtask from './Subtask';
import { styles } from './styles';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import {v4 as uuid} from 'uuid'

const EditTask = () => {
  const [taskData, setTaskData] = useState('')
  const [newTask, setNewTask] = useState('')
  const dispatch = useDispatch();
  //get task identifier
  const {id} = useParams();
  const navigate = useNavigate();
  //get the task from the state, if exists. also get the rest of the state via other selectors
  const loading = useSelector(getLoading)
  const task = useSelector((state)=>getTaskById(state,id));
  const error = useSelector(getTasksError)
  const theme = useTheme()
  const handleSubmit = (event) =>{
    
    console.log('w')
  }
  const handleSubTaskChange = (evt)=>{
    setNewTask(evt.target.value)
  }
  const handleChange = (evt)=>{
    setTaskData({...taskData, [evt.target.name]:evt.target.value})
  }
  /* TODO LIST FUNCTIONALITIES --- START  */
  const handleDelete = (id) =>{
    //event triggers  from delete button, delete the task with the given id, by filtering the state
    setTaskData(prev=>({
        ...prev, tasks: prev.tasks.filter(todo=> todo.id !== id)
    }))
}

    const handleComplete = (id) =>{
        //toggle completion status of task with the given id, 
        //map throught the state and return a state where the 
        //given task has its complete property toggled
        setTaskData(prev=>({
          ...prev,
          tasks: prev.tasks.map(todo=>{
            if(todo.id === id) return {...todo, completed: !todo.completed}
            return todo
          })
        }))
    }

const handleCreate = () =>{
    //check if the input is empty
    if(newTask.trim() !== ''){
        //create the object
        const newSubtask = { name:newTask, completed:false, id: uuid(),}
        //set the state with the new object
        setTaskData(prev=> ({
          ...prev,
          tasks: [...prev.tasks, newSubtask]
        }))

       setNewTask('')
    }
}
const handleKeyDown = (event) => {
  //in case the enter button is press, trigger the create process
  if (event.key === 'Enter') {
    event.preventDefault();
    handleCreate();
  }
};

const handleBlur =()=>{

}


  useEffect(()=>{
    if(!task){
      dispatch(fetchTask(id))
    }
  },[])

  useEffect(() => {
    if (task) {
      const mutatedTask = {...task, tasks: task.tasks.map(todo=> ({...todo, id:uuid()}))}
      setTaskData(mutatedTask);
    }
  }, [task]);

  useEffect(() => {
    if (error) {
        navigate("/profile/me/tasks");
    }
  }, [error, navigate]);
 
  
  
  if(loading){
    return(
      <section style={styles.loading}>
        <CircularProgress/>
      </section>
    )
  }
  else if(taskData){
      const completed = task?.tasks.filter(subtask=> subtask.completed).length
      console.log(taskData)
    return (
      
      <Box p={3}>
        <Typography variant="h4" mb={2} textAlign={'center'}>Edit Task: {taskData.title}</Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <form sx={{ mt: 3 }}>
          <Typography variant="h5" mb={2} textAlign={'center'} fontWeight={800}>Main Statistics</Typography>
            
            <Grid container spacing={2} justifyContent={'center'}>
              <Grid my={1} item xs={12} sm={6} md={4}>
                  <TextField  variant="outlined" type="text" value={taskData.author}  fullWidth disabled label="Author" name="author"/>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
                  <TextField variant="outlined" type="text" value={taskData.title} fullWidth onChange={handleChange} label="Title" name="title"/>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                                <InputLabel id="Scope">Privacy</InputLabel>
                                <Select
                                    labelId="Privacy"
                                    id="privacy"
                                    value={taskData.privacy}
                                    label="Privacy"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="privacy"
                                >
                                    <MenuItem value='Public'>Public</MenuItem>
                                    <MenuItem value='Private'>Private</MenuItem>
                                </Select>
                            </FormControl>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
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
              <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography  textAlign={'center'} variant="h5">Tasks Completed:  <b>{completed}</b></Typography>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography  textAlign={'center'} variant="h5">Completion Rate:  <b>{task.tasks.length > 0 ? Math.floor((completed/task.tasks.length)*100 ) : 0} %</b> </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="h4" textAlign="center" mb={2}>Subtasks:</Typography>
            <Box sx={[styles.Editcontainer, {mb:5}]}>
                        <TextField variant="outlined" sx={styles.input} InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius:0 } }}fullWidth type="text" label="Add subtask" name="subtask" value={newTask} onChange={handleSubTaskChange} onKeyDown={handleKeyDown}/>
                        <Typography variant="subtitle2" sx={[styles.helperTextEdit,{display:{xs:'none', sm:'block'}}]}>press enter or the button to add</Typography>
                        <Button onClick={handleCreate} size="large" sx={styles.saveEditbtn}>Add</Button>
                    </Box>
                      
                    
              <Grid container spacing={2} justifyContent="center" sx={{mt:3}} >
              
                {taskData.tasks.map((subtask,index)=>(
                  <Grid item xs={12} lg={6} key={subtask.id}>
                    <Subtask sub={subtask} mode="edit" handleDelete={handleDelete} handleComplete={handleComplete} setTaskData={setTaskData}/>
                  </Grid>
                ))}
              </Grid>
          </form>
        
          <Container sx={{display:'flex', justifyContent:'space-between'}} disableGutters>
          <Button
              onClick={handleSubmit}
              variant="contained"
            >Save Changes</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="error"
            >Delete Task</Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{backgroundColor: theme.palette.success.buttons, color:'white',"&:hover":{backgroundColor:'#279029'}}}
              
            >Complete Task</Button>
          </Container>
          
        </Paper>

        </Box>
    ) 
  }
};
 

export default EditTask