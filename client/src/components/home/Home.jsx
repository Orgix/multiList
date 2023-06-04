import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { getTasks,getTasksStatus,getTasksError } from '../../services/state/taskSlice'
import { Container, Grid } from '@mui/material'
import { fetchTasks } from '../../services/api';
import TaskBar from '../sidenav/TaskBar'
import Tasks from '../Tasks/Tasks'
const Home = () => {
  
  return (

      <Grid container spacing={2} sx={{px:3}}>
          <Tasks />
      </Grid>
  )
}

export default Home