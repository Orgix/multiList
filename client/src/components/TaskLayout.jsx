import { Outlet } from "react-router-dom";

import React from 'react'
import { Grid } from "@mui/material";
import TaskBar from "./sidenav/TaskBar";

const TaskLayout = () => {
  return (
    <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <TaskBar/>
            </Grid>
            <Grid item xs={12} sm={8} md={9} lg={10}>
                <Outlet />
            </Grid>
      </Grid>
    </>
  )
}

export default TaskLayout