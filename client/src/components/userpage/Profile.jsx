import { Container, Paper, Typography,Grid, List, ListItem, ButtonBase,Link, Button,Box} from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link as RouterLink} from 'react-router-dom'
import { fetchUserProfile, synchronizeUser } from '../../services/actions/profile'
import { convertTimeToDate, convertToRelativeTime } from '../../utils/time'
import TaskShort from './taskShort'
import { styles } from './styles'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.auth.user)
  const {userId} = useParams();
  
  useEffect(()=>{
    if(!userId && !user) navigate('/explore')
    if(userId) dispatch(fetchUserProfile(userId))
  },[])
  
  const handleSync = () =>{
    dispatch(synchronizeUser())
  }
  const userData = useSelector((state)=>userId ? state.profile.profile : state.auth.user)
  console.log(userData)
  return (
    <Container disableGutters >
      
        <Typography textAlign='center' variant="h4" sx={{mt:2}}>
          {userData.firstName} {userData.lastName}
        </Typography>
        <Grid container spacing={2} justifyContent='center' sx={{mt:2}}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography textAlign='center'> Joined: <b>{convertTimeToDate(userData.joined)}</b></Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography textAlign='center'> Active Tasks: <b>{userId ? userData.active : userData.tasks.filter(task=>task.completed === false).length}</b></Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography textAlign='center'> Completed Tasks: <b>{userId ? userData.completed : userData.tasks.filter(task=>task.completed === true).length}</b></Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography textAlign='center'> All tasks: <b>{userId ?  userData.alltasks : userData.tasks.length}</b></Typography>
          </Grid>
          {!userId &&
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Typography textAlign='center'> Synced: <b>{convertToRelativeTime(userData.synced)}</b></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} >
              <Box sx={{display:'flex', justifyContent:'center'}}>
                <Button onClick={handleSync} sx={styles.syncBtn}>Syncronize</Button>
              </Box>
              
            </Grid>
            </>
          }
          
        </Grid>
        <Paper elevation={5} sx={{mt:2, pb:2}}>
          <Container>
            <Typography variant="h4" textAlign='center' py={3}> 
                Tasks
            </Typography>
            <Grid container columnSpacing={3} rowSpacing={1}>
              {userData?.tasks?.map(task=>{
                return <TaskShort task={task} key={task.id} self={userId}/>
              })}
            </Grid>
          </Container>
      </Paper>
    </Container>
    
  )
}

export default Profile