import {useSelector, useDispatch} from 'react-redux'
import { getTaskById, getTasksError, getSinglePostStatus } from '../../services/state/taskSlice'
import {useParams, Link as RouterLink} from 'react-router-dom';
import { fetchTask } from '../../services/actions/tasks';
import { Box, Typography, Grid, Paper,Container, Link, CircularProgress } from '@mui/material';
import { convertToRelativeTime } from '../../utils/time';
import { useEffect, useState } from 'react';
import { getLoading } from '../../services/state/taskSlice';
import Checkbox from '@mui/material/Checkbox';
import Subtask from './Subtask';
import HoverableEditButton from './EditButton';

const styles= {
  container:{
    display:'flex',

    alignItems:'center',
    justifyContent:'space-between',
  },
  text:{
    fontSize:'20px',
    fontWeight:500
  },
  linkBtn:{
    fontSize:'16px'
  },
  
  box:{
    display:'flex',
    alignItems:'center'
  }
}
const TaskDetails = () => {
  const [active, setActive] = useState(true)
  const dispatch = useDispatch();
  //get task identifier
  const {id} = useParams();
  //get the task from the state, if exists. also get the rest of the state via other selectors
  const loading = useSelector(getLoading)
  const task = useSelector((state)=>getTaskById(state,id))
  const status = useSelector(getSinglePostStatus)
  const error = useSelector(getTasksError)
 

  useEffect(()=>{
    if(loading){
      dispatch(fetchTask(id))
    }
  },[])
  
  

  if(error){
    return(
      <article>
        {error}
      </article>
    )
  }
  if(loading){
    return(
      <section>
        <CircularProgress/>
      </section>
    )
  }else{
    const completed = task.tasks.filter(task=> task.completed).length
    const activeTasks = task.tasks.filter(task=> !task.completed)
    const visible = active ? task.tasks : activeTasks
    return (
      <Box p={3}>
        <Typography variant="h4" mb={2} textAlign={'center'}>Task Details: {task.title}</Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" mb={2} textAlign={'center'} fontWeight={800}>Main Statistics</Typography>
            
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid my={1} item xs={12} sm={6} md={4}>
                <Typography fontWeight={700} variant="h5" textAlign={'center'}>Created By: {task.author}</Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
            <Typography fontWeight={700} textAlign={'center'} variant="h5">Created At: {convertToRelativeTime(task.createdAt)}</Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography fontWeight={700} textAlign={'center'} variant="h5">Scope: {task.privacy}</Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography fontWeight={700} textAlign={'center'} variant="h5">Priority: {task.priority}</Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography fontWeight={700} textAlign={'center'} variant="h5">Tasks Completed:  {completed}</Typography>
            </Grid>
            <Grid my={1} item xs={12} sm={6} md={4}>
              <Typography fontWeight={700} textAlign={'center'} variant="h5">Completion Rate:  {Math.floor((completed/task.tasks.length)*100 )} % </Typography>
            </Grid>
          </Grid>
          </Paper>
          <Typography variant="h6" textAlign="center" mb={2}>Subtasks:</Typography>
            <Grid container spacing={2} justifyContent="center">
            
              {visible.map((subtask,index)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`${subtask.name}-${index}`}>
                  <Subtask sub={subtask} />
                </Grid>
              ))}
            </Grid>
            <Container maxWidth={false} sx={styles.container}>
                <HoverableEditButton text="edit" type="button" fontSize="16px" path="edit"/>
                <Box sx={styles.box}>
                <Typography sx={styles.text}>Show completed</Typography><Checkbox onChange={e => setActive(e.target.checked)} checked={active}/>
                </Box>
                
            </Container>
        </Box>
    )
  }
  
};
 

export default TaskDetails