import { Container, Paper, Typography,Grid} from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate} from 'react-router-dom'
import { fetchUserProfile } from '../../services/actions/profile'
import { convertTimeToDate } from '../../utils/time'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.auth.user)
  const {userId} = useParams();
  
  useEffect(()=>{
    if(!userId && !user) navigate('/explore')
    if(userId) dispatch(fetchUserProfile(userId))
  },[])
  
  const userData = useSelector((state)=>userId ? state.profile.profile : state.auth.user)
 
  return (
    <Container disableGutters >
      <Paper elevation={5} sx={{mt:2}}>
        <Typography textAlign='center' variant="h4">
          {userData.firstName} {userData.lastName}
        </Typography>
        <Grid container spacing={2} justifyContent='center' sx={{mt:2}}>
          <Grid item xs={12} md={6}>
            <Typography textAlign='center'> Joined: <b>{convertTimeToDate(userData.joined)}</b></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography textAlign='center'> Active Tasks: <b>{userId ? userData.active : userData.tasks.filter(task=>task.completed === false).length}</b></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography textAlign='center'> Completed Tasks: <b>{userId ? userData.completed : userData.tasks.filter(task=>task.completed === true).length}</b></Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography textAlign='center'> All tasks: <b>{userId ?  userData.alltasks : userData.tasks.length}</b></Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    
  )
}

export default Profile