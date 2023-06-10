import {useSelector, useDispatch} from 'react-redux'
import { getTaskById, getTasksError} from '../../services/state/taskSlice'
import {useParams, useNavigate} from 'react-router-dom';
import { fetchTask } from '../../services/actions/tasks';
import { Box, Typography, Grid, Paper, CircularProgress,Button } from '@mui/material';
import { convertToRelativeTime } from '../../utils/time';
import { useEffect} from 'react';
import { getLoading } from '../../services/state/taskSlice';
import Subtask from './Subtask';
import { styles } from './styles';
import { useState } from 'react';

const EditTask = () => {
  const [taskData, setTaskData] = useState('')
  const dispatch = useDispatch();
  //get task identifier
  const {id} = useParams();
 const navigate = useNavigate();
  //get the task from the state, if exists. also get the rest of the state via other selectors
  const loading = useSelector(getLoading)
  const task = useSelector((state)=>getTaskById(state,id));
  const error = useSelector(getTasksError)
  
  const handleSubmit = (event) =>{

  }
  
  useEffect(()=>{
    if(!task){
      dispatch(fetchTask(id))
    }
  },[])

  useEffect(() => {
    if (task) {
      setTaskData(task);
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
  else if(task){
      
      const completed = task?.tasks.filter(subtask=> subtask.completed).length
    return (
      
      <Box p={3}>
        <Typography variant="h4" mb={2} textAlign={'center'}>Edit Task: {task?.title}</Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <form onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Typography variant="h5" mb={2} textAlign={'center'} fontWeight={800}>Main Statistics</Typography>
            
            <Grid container spacing={2} justifyContent={'center'}>
              <Grid my={1} item xs={12} sm={6} md={4}>
                  <Typography variant="h5" textAlign={'center'}>Created By: <b>{task.author}</b></Typography>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography textAlign={'center'} variant="h5">Created At: <b>{convertToRelativeTime(task.createdAt)}</b></Typography>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography textAlign={'center'} variant="h5">Scope: <b>{task.privacy}</b></Typography>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography textAlign={'center'} variant="h5">Priority: <b>{task.priority}</b></Typography>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography  textAlign={'center'} variant="h5">Tasks Completed:  <b>{completed}</b></Typography>
              </Grid>
              <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography  textAlign={'center'} variant="h5">Completion Rate:  <b>{Math.floor((completed/task.tasks.length)*100 )} %</b> </Typography>
              </Grid>
            </Grid>
            
            <Typography variant="h6" textAlign="center" mb={2}>Subtasks:</Typography>
              <Grid container spacing={2} justifyContent="center">
              
                {task.tasks.map((subtask,index)=>(
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${subtask.name}-${index}`}>
                    <Subtask sub={subtask} />
                  </Grid>
                ))}
              </Grid>
          </form>
          <Button
              type="submit"
              variant="contained"
            >Save Changes</Button>
        </Paper>

        </Box>
    ) 
  }
};
 

export default EditTask