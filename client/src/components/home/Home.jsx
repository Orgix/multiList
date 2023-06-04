import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { getTasks,getTasksStatus,getTasksError } from '../../services/state/taskSlice'
import { Container, Grid } from '@mui/material'
import { fetchTasks } from '../../services/api';
import TaskBar from '../sidenav/TaskBar'
import Tasks from '../Tasks/Tasks'
const Home = () => {
  
  return (

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <TaskBar/>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Tasks />
        </Grid>
      </Grid>
  )
}

export default Home