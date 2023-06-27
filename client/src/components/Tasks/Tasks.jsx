import React, { useEffect } from 'react'
import Task from './Task/Task'
import { useSelector, useDispatch } from 'react-redux'
import { getTasksStatus, getTasks, getTasksError, getSinglePostStatus} from '../../services/state/taskSlice'
import { fetchTasks } from '../../services/actions/tasks'
import { CircularProgress, Grid, Typography, Container } from '@mui/material'
import Success from '../user/Success'

const Tasks = () => {
  const dispatch = useDispatch();
  //get the state 
  const tasks = useSelector(getTasks)
  const tasksStatus = useSelector(getTasksStatus);
  const error = useSelector(getTasksError);
  const singleStatus = useSelector(getSinglePostStatus)

  useEffect(()=>{
    //load tasks from database
    if(tasksStatus === 'idle'){
      dispatch(fetchTasks())
    }
  },[tasksStatus, dispatch])

  let content;
  let len;
  //in case status is still loading, until otherwise, render a Loading Component
  if (tasksStatus === 'loading') {
    content = <CircularProgress/>;
} else if (tasksStatus === 'succeeded') {
    content = tasks.map(task => <Grid item key={task._id} xs={12} md={6} lg={4} xl={3}><Task task={task} author={true} spacing={2}/></Grid>)
    len = tasks.length
} else if (tasksStatus === 'failed') {
  //present the error
    content = <p>{error}</p>;
}
  return (
   <div>
    <Typography variant="h3" sx={{my:4, textAlign:'center'}}>All user Tasks : {len}</Typography>
    {singleStatus === 'succeeded' && (
      <Container maxWidth="md" sx={{display:'flex',justifyContent:'center', py:2}}>
        <Success title="Task registered successfully" msg="Navigate to your personal profile to view the new task"/>
      </Container>
    )}
    <Grid container spacing={2} sx={{marginLeft:'8px'}}>
        {content}
    </Grid>
    
   </div>
  )
}

export default Tasks