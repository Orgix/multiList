import { Box, Container, Typography,Grid,Link } from "@mui/material"
import Task from "./Task/Task"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUserTasks } from "../../services/actions/auth"
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

  const userTasks = useSelector((state) => state.auth.tasks);

  if(userTasks.length > 0 ){
    const ordered = userTasks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return (
      <Container disableGutters sx={{display:'flex', justifyContent:'center',flexDirection:'column', mt:3}}>
        <Box display='flex' justifyContent='center'>
          <Typography variant="h4" fontWeight="bold">My tasks ({`${userTasks.length}`})</Typography>
        </Box>
        <Grid container spacing={2}>
          {userTasks.map(task => <Grid item key={task._id} xs={12} md={6} lg={4} xl={3}><Task task={task} author={false} spacing={2}/></Grid>)}
        </Grid>
        <Link component={RouterLink} to='/profile/me' underline="none">
          Back to profile
        </Link>
      </Container>
    )
  }
  else if(!user){
    return null
  }
  else{
    return(
      <Container disableGutters sx={{display:'flex', justifyContent:'center',flexDirection:'column', mt:3}}>
        <Box display='flex' justifyContent='center'>
          <Typography variant="h4" fontWeight="bold">My tasks : {`${user.name} ${user.surname}`}</Typography>
        </Box>
        <Typography textAlign='center' my={2} variant="h6">No tasks found</Typography>
      </Container>
    )
  }
}
export default UserTasks