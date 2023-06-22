import { Box, Container, Typography,Grid,Link } from "@mui/material"
import Task from "./Task/Task"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUserTasks } from "../../services/actions/auth"
import { Link as RouterLink } from "react-router-dom"



const UserTasks = () => {
  const user = useSelector((state)=> state.auth.user)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserTasks());
  }, [dispatch]);

  const userTasks = useSelector((state) => state.auth.tasks);

  if(userTasks.length > 0 ){
    return (
      <Container disableGutters sx={{display:'flex', justifyContent:'center',flexDirection:'column', mt:3}}>
        <Box display='flex' justifyContent='center'>
          <Typography variant="h4" fontWeight="bold">Tasks for user: {`${user.name} ${user.surname}`}</Typography>
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
  else{
    return(
      <Container disableGutters sx={{display:'flex', justifyContent:'center',flexDirection:'column', mt:3}}>
        <Box display='flex' justifyContent='center'>
          <Typography variant="h4" fontWeight="bold">Tasks for user: {`${user.name} ${user.surname}`}</Typography>
        </Box>
        <Typography>No tasks found</Typography>
      </Container>
    )
  }
}
export default UserTasks