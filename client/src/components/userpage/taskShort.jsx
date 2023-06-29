import { Grid, Paper, Link,Typography, Tooltip,Box } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from "react-router-dom"
import { styles } from "./styles";

const TaskShort = ({task,self,}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={4} sx={[{backgroundColor:!self && task.completed ? '#52804f':'', height:'50px', display:'flex',justifyContent:'center', alignItems:'center'}, styles.paper]}>
                  <Link component={RouterLink} to={self?`/profile/${self}/tasks/${task.id}`:`/profile/me/tasks/${task.id}`} underline='none'>
                    <Typography fontWeight={500} color={!self && task.completed ? 'white': 'black'} textAlign='center' alignContent='center' sx={{textDecoration: task.completed? 'line-through':''}}>
                        {task.title} 
                    </Typography>   
                    <Box sx={styles.taskIcons}>
                      {task.completed && <Tooltip arrow title="Completed task" placement="right-start"><CheckCircleIcon sx={{color:'white'}}/></Tooltip>}
                      {task.privacy === 'Private' ? 
                        <Tooltip arrow title="This task is private." placement="right-start"><LockIcon size="lg" sx={{color: task.completed? 'white': 'grey'}}/></Tooltip> 
                          : 
                        <Tooltip arrow title="This task is public." placement="right-start"><LockOpenIcon size="lg" sx={{color: task.completed? 'white': 'grey'}}/></Tooltip>
                      }
                    </Box>
                  </Link>
                </Paper>
    </Grid>
    )
}

export default TaskShort