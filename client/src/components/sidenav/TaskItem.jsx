
import { useParams } from "react-router-dom"
import { Fragment } from "react"
import { ListItem, ListItemText,Typography,ListItemButton, Link } from "@mui/material"
import {Link as RouterLink} from 'react-router-dom'
import { useTheme } from "@emotion/react"
import { convertToRelativeTime } from "../../utils/time"
const TaskItem = ({task}) => {
  const {id} = useParams();
  const theme = useTheme();
  const completed = task.tasks.filter(subtask=> subtask.completed === true).length
  const percentage = task.tasks.length > 0 ? Math.floor((completed/task.tasks.length)*100 ) : 0
  return (
    <ListItem  disablePadding alignItems="flex-start" sx={{backgroundColor: id === task._id? '#1e375a' : ''}}>
                <ListItemButton>
                  <Link component={RouterLink} to={`/profile/me/tasks/${task._id}/edit`} color="text.primary" underline="none">
                  <ListItemText primary={task.title} color={task._id !== id ? "text.primary" : ''} sx={{color:task._id === id ? 'white' :''}}secondary={
                    <Fragment>
                      <Typography component="span" variant="body2" color={theme.palette.sidenav.letters}> 
                        Number of tasks : {task.tasks.length} <br/>
                        Sub Tasks Completed : {completed}<br/>
                      </Typography>
                      <Typography component="span" variant="body2" color={theme.palette.sidenav.letters}>
                        Completion Rate : <span style={{color:percentage < 50 ? 'red' : 'green', fontWeight:700}}>{percentage} %</span> <br/>
                      </Typography>
                        
                     <Typography component="span" variant="body2" color={theme.palette.sidenav.letters}>
                        Created at : {convertToRelativeTime(task.createdAt)}
                      </Typography>
                    </Fragment>
                  }/>
                  </Link>
                </ListItemButton>
              </ListItem>
  )
}

export default TaskItem