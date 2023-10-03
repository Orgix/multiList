import { Box, Container, Typography,Grid,Link, Divider } from "@mui/material"
import Task from "./Task/Task"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUserTasks, fetchFavorites } from "../../services/actions/auth"
import { Link as RouterLink, useNavigate } from "react-router-dom"



const UserTasks = () => {
  const user = useSelector((state)=> state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!user) {
      navigate('/explore');
    } else {
      dispatch(fetchUserTasks());
    }
  }, [user, navigate, dispatch]);

  useEffect(()=>{
    if(!user){
      navigate('/explore')
    }
    else{
      dispatch(fetchFavorites())
    }
  }, [user, navigate, dispatch])

  const userTasks = useSelector((state) => state.auth.tasks);
  const favorites = useSelector((state)=> state.auth.favTasks)
  let tasksComp;
  let favsComp;
  console.log(favorites)
  if(userTasks.length > 0 ){
    const ordered = userTasks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    tasksComp = <>
    <Box display='flex' justifyContent='center'>
      <Typography variant="h4" fontWeight="bold">My tasks ({`${userTasks.length}`})</Typography>
    </Box>
    <Grid container spacing={2}>
      {ordered.map(task => <Grid item key={task._id} xs={12} md={6} lg={4} xl={3}><Task task={task} author={false} spacing={2}/></Grid>)}
    </Grid>
    <Link component={RouterLink} to='/profile/me' underline="none">
      Back to profile
    </Link>
    </>
  
  } else{
    const tasksComp = <>
    <Box display='flex' justifyContent='center'>
      <Typography variant="h4" fontWeight="bold">My tasks : {`${user.firstName} ${user.lastName}`}</Typography>
    </Box>
    <Typography textAlign='center' my={2} variant="h6">No tasks found: Create and Organize your first task <b><Link component={RouterLink} to='/profile/me/tasks/new' underline="none">here</Link></b></Typography>
    </>
  }
  if(favorites.length > 0 ){
    favsComp = <>
    <Box display='flex' justifyContent='center'>
      <Typography variant="h4" fontWeight="bold">Favorites:  ({`${favorites.length}`})</Typography>
    </Box>
    <Grid container spacing={2}>
      {favorites.map(task => <Grid item key={task._id} xs={12} md={6} lg={4} xl={3}><Task task={task} author={true} spacing={2}/></Grid>)}
    </Grid>
    </>
  } 
  else {
    favsComp = <Typography>No tasks marked as favorites</Typography>
  }

  if(!user){
    return null
  }
  else{
    return(
    <>
      <Container disableGutters sx={{display:'flex', justifyContent:'center',flexDirection:'column', mt:3}}>
        {favsComp}
      </Container>
      <Divider sx={{my:2}}/>
      <Container disableGutters sx={{display:'flex', justifyContent:'center',flexDirection:'column', mt:3}}>
        {tasksComp}
      </Container>
      </>
    )
  }
}
export default UserTasks