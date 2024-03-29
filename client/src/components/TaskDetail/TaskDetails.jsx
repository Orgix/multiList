import {useSelector, useDispatch} from 'react-redux'
import { getTaskById, getTasksError, getSinglePostStatus} from '../../services/state/taskSlice'
import {useParams, Link as RouterLink} from 'react-router-dom';
import { fetchTask } from '../../services/actions/tasks';
import { Box, Typography, Grid, Paper,Container , Link, Checkbox} from '@mui/material';
import { convertToRelativeTime } from '../../utils/time';
import { useEffect} from 'react';
import { getLoading } from '../../services/state/taskSlice';
import ActivityLog from './ActivityLog/ActivityLog';
import Subtask from './Subtask';
import HoverableEditButton from './EditButton';
import useToggle from '../../hooks/useToggle';
import Favorite from './Favorite';
import Suggestions from './CommentSection/Suggestions';
import { styles } from './styles';
import {v4 as uuid} from 'uuid'

const TaskDetails = () => {
  const [active, setActive] = useToggle(true)
  const dispatch = useDispatch();
  //get task identifier
  const {id} = useParams();
  //get the task from the state, if exists. also get the rest of the state via other selectors
  const loading = useSelector(getLoading)
  const task = useSelector((state)=>getTaskById(state,id));
  const status = useSelector(getSinglePostStatus)
  const error = useSelector(getTasksError)
  const user = useSelector((state)=> state.auth.user)


  useEffect(()=>{
    if(!task){
      dispatch(fetchTask(id))
    }
  },[id])
  
 
  
  if(error){
    return(
      <article style={styles.error}>
        {error}
      </article>
    )
  }
  if(task){
    //add uuid to the subtasks
    const mutated = task.tasks.map(task=> ({...task, id:uuid()}))
    //get completed tasks count
    const completed = task.tasks.filter(task=> task.completed).length
    //get incomplete count
    const activeTasks = task.tasks.length - completed
    //decide which tasks to display
    const visible = active ? mutated : activeTasks
    //sort task activity log by most recent date
    const sortedLog = [...task.log].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    return (
      <Box p={3} sx={{position:'relative'}}>
        <ActivityLog activities={sortedLog}/>
        <Typography variant="h4" mb={2} textAlign={'center'}>Task Details: {task.title}</Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3, position:'relative'}}>
          <Typography variant="h5" mb={2} textAlign='center' fontWeight={800}>Main Statistics</Typography>
            {user && <Favorite id={id}/>}
          <Grid container spacing={2} justifyContent='center' >
            <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography variant="h5" textAlign={'center'}>Created By: <b><Link component={RouterLink} to={user?.id === task.author.authorID ? '/profile/me' : `/profile/${task.author.authorID}` } sx={{color:'black'}} underline="none">{task.author.name}</Link></b></Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
            <Typography textAlign={'center'} variant="h5">Created At: <b>{convertToRelativeTime(task.createdAt)}</b></Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography textAlign={'center'} variant="h5">Scope: <b>{task.privacy}</b></Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography textAlign={'center'} variant="h5">Priority: <b>{task.priority}</b></Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography  textAlign={'center'} variant="h5">Tasks Completed:  <b>{completed}</b></Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography  textAlign={'center'} variant="h5">Completion Rate:  <b>{task.tasks.length > 0 ? Math.floor((completed/task.tasks.length)*100 ) : 0} %</b> </Typography>
            </Grid>
            {task.completed && 
              <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography textAlign='center' variant="h2" color='green'><b>COMPLETED</b></Typography>
              </Grid>
            }
          </Grid>
          <Box>
            <Typography variant="h4" textAlign='center' sx={{my:2}}>About: </Typography>
            {task.description ?  
              <Box sx={{overflowWrap:'break-word'}}>
                <Typography sx={{flexShrink:1}} textAlign='center'>{task.description}</Typography> 
              </Box>
              
              : <Typography textAlign='center'>No description provided</Typography>}
            
          </Box>
          </Paper>
          <Typography variant="h6" textAlign="center" mb={2}>Subtasks:</Typography>
            <Grid container spacing={2} justifyContent="center">
            
              {visible.map((subtask,index)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${subtask.name}-${index}`}>
                  <Subtask sub={subtask} mode="view"/>
                </Grid>
              ))}
            </Grid>
            {!task.completed && <Container maxWidth={false} sx={styles.container} disableGutters>
             
             { task.author.authorID === user?.id && <HoverableEditButton text="edit" type="button" fontSize="16px" path="edit"/>}
             
             <Box sx={styles.box}>
             <Typography sx={styles.text}>Show completed</Typography><Checkbox  onChange={setActive} checked={active}/>
             </Box>
             
         </Container>}
            <Container sx={{mt:3}} disableGutters>
                <Typography variant="h4" textAlign='center' sx={{mb:2}}>Discussion and suggestions section : </Typography>
                {user ? <Suggestions authorId={task.author.authorID} user={user} taskID={task._id} title={task.title}/> 
                : 
                <Typography variant="h6" textAlign="center">To view or leave a suggestion, please sign in</Typography>
              }
            </Container>
        </Box>
    )
  }
  
};
 

export default TaskDetails