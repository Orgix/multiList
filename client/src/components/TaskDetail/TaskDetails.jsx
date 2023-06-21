import {useSelector, useDispatch} from 'react-redux'
import { getTaskById, getTasksError, getSinglePostStatus } from '../../services/state/taskSlice'
import {useParams} from 'react-router-dom';
import { fetchTask } from '../../services/actions/tasks';
import { Box, Typography, Grid, Paper,Container, CircularProgress } from '@mui/material';
import { convertToRelativeTime } from '../../utils/time';
import { useEffect} from 'react';
import { getLoading } from '../../services/state/taskSlice';
import Checkbox from '@mui/material/Checkbox';
import Subtask from './Subtask';
import HoverableEditButton from './EditButton';
import useToggle from '../../hooks/useToggle';
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
  


  useEffect(()=>{
    if(!task){
      dispatch(fetchTask(id))
    }
  },[])
  
 
  
  if(error){
    return(
      <article style={styles.error}>
        {error}
      </article>
    )
  }
  if(loading){
    return(
      <section style={styles.loading}>
        <CircularProgress/>
      </section>
    )
  }else if(task){
    const mutated = task.tasks.map(task=> ({...task, id:uuid()}))
    const completed = task.tasks.filter(task=> task.completed).length
    const activeTasks = mutated.filter(task=> !task.completed)
    const visible = active ? mutated : activeTasks
    return (
      <Box p={3}>
        <Typography variant="h4" mb={2} textAlign={'center'}>Task Details: {task.title}</Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" mb={2} textAlign={'center'} fontWeight={800}>Main Statistics</Typography>
            
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography variant="h5" textAlign={'center'}>Created By: <b>{task.author}</b></Typography>
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
          </Paper>
          <Typography variant="h6" textAlign="center" mb={2}>Subtasks:</Typography>
            <Grid container spacing={2} justifyContent="center">
            
              {visible.map((subtask,index)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${subtask.name}-${index}`}>
                  <Subtask sub={subtask} mode="view"/>
                </Grid>
              ))}
            </Grid>
            <Container maxWidth={false} sx={styles.container} disableGutters>
                <HoverableEditButton text="edit" type="button" fontSize="16px" path="edit"/>
                <Box sx={styles.box}>
                <Typography sx={styles.text}>Show completed</Typography><Checkbox onChange={setActive} checked={active}/>
                </Box>
                
            </Container>
        </Box>
    )
  }
  
};
 

export default TaskDetails