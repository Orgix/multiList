import React from 'react'
import Sidenav from '../sidenav/Sidenav'
import { Container, Grid } from '@mui/material'
import TaskBar from '../TaskBar'

const Home = () => {
  return (

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={2}>
          <TaskBar/>
        </Grid>
        <Grid item xs={12} sm={8} md={10}>
          <div>
            tasks here
          </div>
        </Grid>
      </Grid>
  )
}

export default Home