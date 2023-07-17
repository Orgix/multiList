import { Container, Paper, Typography,Grid, List, ListItem, ButtonBase,Link, Button,Box, Checkbox} from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link as RouterLink} from 'react-router-dom'
import { fetchUserProfile, synchronizeUser } from '../../services/actions/profile'
import { convertTimeToDate, convertToRelativeTime } from '../../utils/time'
import TaskShort from './taskShort'
import { styles } from './styles'
import useToggle from '../../hooks/useToggle'

const Profile = () => {
  //dispatch and navigate 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //get user , if exists
  const user = useSelector((state)=> state.auth.user)
  //get userId for profile
  const {userId} = useParams();

  //set a toggle hook for the tasks 
  const [active, setActive] = useToggle(false)

  //if there was no userId in the params and user is null, no reason to be to this link, redirect
  //if there is user id, dispatch a fetcher action to the backedn to bring back the user's profile data
  useEffect(()=>{
    if(!userId && !user) navigate('/explore')
    if(userId) dispatch(fetchUserProfile(userId))
  },[])
  
  //sync authenticated user's profile data
  const handleSync = () =>{
    dispatch(synchronizeUser())
  }

  //fetch User data depending on wether the link is for a user or authenticated user's
  const userData = useSelector((state)=>userId ? state.profile.profile : state.auth.user)
  
  //filter active only tasks
  const filter_active = !userId ? userData?.tasks?.filter(task=> !task.completed) : []
  //depending on toggle value, show only active 
  const visible = active ? filter_active : userData?.tasks;
  if(!user && Object.keys(userData).length === 0){
    return(
      <Container disableGutters>
        <Typography textAlign='center'>
          User not found.
        </Typography>
      </Container>
    )
  }
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
          {visible?.length > 0 ? 
          <>
            <Typography variant="h4" textAlign='center' py={3}> 
                Tasks
            </Typography>
            <Grid container columnSpacing={3} rowSpacing={1}>
              {visible?.map(task=>{
                return <TaskShort task={task} key={task.id} self={userId}/>
              })}
            </Grid>
          </>
          : 
          <Typography variant="h4" textAlign='center' py={3}>
            No visible tasks.
          </Typography>
        }
        </Container>
      </Paper>
      {!userId && 
      <Box sx={styles.box}>
      <Typography sx={styles.text}>Show completed</Typography><Checkbox onChange={setActive} checked={active}/>
    </Box>
      }
      
    </Container>
    
  )
}

export default Profile