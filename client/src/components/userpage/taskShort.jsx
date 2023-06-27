import { Grid, Paper, Link,Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const TaskShort = ({task,self,}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={4} sx={{backgroundColor:!self && task.completed ? '#52804f':'', height:'50px', display:'flex',justifyContent:'center', alignItems:'center'}}>
                  <Link component={RouterLink} to={self?`/profile/${self}/tasks/${task.id}`:`/profile/me/tasks/${task.id}`} underline='none'>
                    <Typography fontWeight={500} color={!self && task.completed ? 'white': 'black'} textAlign='center' sx={{textDecoration: task.completed? 'line-through':''}}>
                        {task.title}
                    </Typography>
                  </Link>
                </Paper>
              </Grid>
    )
}

export default TaskShort