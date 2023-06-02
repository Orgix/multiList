import React from 'react'

import { Container, Grid } from '@mui/material'
import TaskBar from '../sidenav/TaskBar'

const Home = () => {
  return (

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          <TaskBar/>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <div>
            tasks here
          </div>
        </Grid>
      </Grid>
  )
}

export default Home