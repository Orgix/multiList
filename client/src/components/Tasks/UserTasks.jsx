import { Box, Container, Typography, Card, CardContent, CardActions,Grid, Button, Link } from "@mui/material"
import CardButtons from "./Task/CardButtons" 
import { convertToRelativeTime } from "../../utils/time"
import { useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"



const UserTasks = () => {
  const user = useSelector((state)=> state.auth.user)
  return (
    <Container disableGutters sx={{display:'flex', justifyContent:'center',flexDirection:'column', mt:3}}>
      <Box display='flex' justifyContent='center'>
        <Typography variant="h4" fontWeight="bold">Tasks for user: {`${user.name} ${user.surname}`}</Typography>
      </Box>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{margin:'5px',position:'relative'}}>
            <CardContent>
              <Box sx={{display:'flex'}}>
                <Typography  variant="p">
                  Title here
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Tasks completed: 12
              </Typography>
              <Typography variant='subtitle1'>
                60 %
              </Typography>
              <Typography sx={{position:'absolute', right:'5px', top:'5px'}}>
                Scope: Private
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
                3 days ago
              </Typography>
              <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: 18</Typography>
            </CardContent>
            <CardActions>
              <CardButtons id="648c4e4c31470f42abb5826e"/>
            </CardActions>
          </Card>
        </Grid>
        
      </Grid>
      <Link component={RouterLink} to='/profile/me' underline="none">
        Back to profile
      </Link>
    </Container>
  )
}

export default UserTasks