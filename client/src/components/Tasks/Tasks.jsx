import React, { useEffect } from 'react'
import Task from './Task/Task'
import { useSelector, useDispatch } from 'react-redux'
import { getTasksStatus, getTasks, getTasksError, getSinglePostStatus} from '../../services/state/taskSlice'
import { fetchTasks } from '../../services/actions/tasks'
import { CircularProgress, Grid, Typography, Container, Box } from '@mui/material'
import Success from '../user/Success'
import CustomPagination from '../CustomPagination'
import { useLocation } from 'react-router-dom'


const Tasks = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search)
  const page = query.get('page') || 1;
  //get the state 
  const tasks = useSelector(getTasks)
  const tasksStatus = useSelector(getTasksStatus);
  const error = useSelector(getTasksError);
  const singleStatus = useSelector(getSinglePostStatus)
  
  let len;
 
if (tasksStatus === 'succeeded') len = tasks.length

  return (
   <Grid item xs={12}>
    <Typography variant="h3" sx={{my:4, textAlign:'center'}}>Tasks at this page:  {len}</Typography>
    {singleStatus === 'succeeded' && (
      <Container maxWidth="md" sx={{display:'flex',justifyContent:'center', py:2}}>
        <Success title="Task registered successfully" msg="Navigate to your personal profile to view the new task"/>
      </Container>
    )}
    <Box sx={{display:'flex', justifyContent:'center'}}><CustomPagination page={page} /></Box>
    <Grid container spacing={2}>
        {tasksStatus === 'loading' ? <CircularProgress/> : tasksStatus === 'failed' ? <Typography>Failed : {error}</Typography> : (
          tasks.map(task => <Grid item key={task._id} xs={12} md={6} lg={4} xl={3}><Task task={task} author={true} spacing={2}/></Grid>)
        )}
    </Grid>
    
   </Grid>
  )
}

export default Tasks