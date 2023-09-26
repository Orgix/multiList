import React from 'react'

import {  Grid } from '@mui/material'

import Tasks from '../Tasks/Tasks'

const Home = () => {
  
  return (
    <Grid container spacing={2} sx={{px:3}}>
          <Tasks />
    </Grid> 
  )
}

export default Home