import React, { useEffect } from 'react'
import Task from './Task/Task'
import { useSelector, useDispatch } from 'react-redux'
import { getTasksStatus, getTasks, getTasksError } from '../../services/state/taskSlice'
import { fetchTasks } from '../../services/actions/tasks'
import { CircularProgress, Grid, Typography } from '@mui/material'

const Tasks = () => {
  const dispatch = useDispatch();
  //get the state 
  const tasks = useSelector(getTasks)
  const tasksStatus = useSelector(getTasksStatus);
  const error = useSelector(getTasksError);

  useEffect(()=>{
    //load tasks from database
    if(tasksStatus === 'idle'){
      dispatch(fetchTasks())
    }
  },[tasksStatus, dispatch])

  let content;
  //in case status is still loading, until otherwise, render a Loading Component
  if (tasksStatus === 'loading') {
    content = <CircularProgress/>;
} else if (tasksStatus === 'succeeded') {
    //sort the tasks by date ascending order 
    const orderedTasks = tasks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //map through the sorted array and create the JSX that will be rendered
    content = orderedTasks.map(task => <Grid item key={task._id} xs={12} md={6} lg={4} xl={3}><Task task={task} spacing={2}/></Grid>)
} else if (tasksStatus === 'failed') {
  //present the error
    content = <p>{error}</p>;
}
  return (
   <div>
    <Typography variant="h3" sx={{my:4, textAlign:'center'}}>All user Tasks</Typography>
    <Grid container spacing={2}>
        {content}
    </Grid>
    
   </div>
  )
}

export default Tasks