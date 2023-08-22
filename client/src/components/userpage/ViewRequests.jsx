import { Box, Container, Divider, IconButton, Paper, Typography,Tooltip,Button, Menu,MenuItem } from '@mui/material'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import { convertToRelativeTime } from '../../utils/time'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const ViewRequests = () => {
    const requests = useSelector((state)=> state.auth.user)
    console.log(requests)
    const [requestActions, setRequestActions] = useState(null);

    const openRequestOptions = (event) =>{
      setRequestActions(event.currentTarget)
    }
    const closeRequestActions = () =>{
        setRequestActions(null)
      } 
    const resolveRequest = (requestId, response)=>{
        console.log(requestId)
    }

  return (
    <Box>
        <Box sx={{display:'flex', justifyContent:'center',mb:2}}>
            <Typography variant='h4'>Requests From / To users : 7</Typography>
        </Box>
        <Box sx={{textAlign:'center'}}>
            <Divider/>
            <Typography variant="h5" sx={{py:1}}>Requests PENDING : 4</Typography>
        </Box>
       <Container>
            <Paper elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Typography variant='h5'>
                        Friend Request sent to: Bill Tito  -
                    </Typography>
                    <Typography variant='subtitle2'>5 weeks ago</Typography>
                </Box>
                
                <Tooltip arrow title="User has received the request and has yet to respond." >
                    <Button variant="contained" color="info" onClick={openRequestOptions} sx={{my:1,position:'absolute', right:'5px',top:'2px'}}>
                        <MoreHorizIcon/>
                    </Button>
                </Tooltip> 
                <Menu
                  sx={{ mb: '25px'}}
                  id="comment-actions"
                  anchorEl={requestActions}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical:'bottom'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={Boolean(requestActions)}
                  onClose={closeRequestActions}
                >   
                    <MenuItem key="opt-1" onClick={closeRequestActions}>
                      <Typography textAlign='center'>Cancel request.</Typography>
                    </MenuItem>
                </Menu>
            </Paper>
            <Paper elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Typography variant='h5'>
                        Friend Request sent to: Bill Tito  -
                    </Typography>
                    <Typography variant='subtitle2'>5 weeks ago</Typography>
                </Box>
                
                <Tooltip arrow title="User has received the request and has yet to respond." >
                    <Button variant="contained" color="info" onClick={openRequestOptions} sx={{my:1,position:'absolute', right:'5px',top:'2px'}}>
                        <MoreHorizIcon/>
                    </Button>
                </Tooltip> 
                <Menu
                  sx={{ mb: '25px'}}
                  id="comment-actions"
                  anchorEl={requestActions}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical:'bottom'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={Boolean(requestActions)}
                  onClose={closeRequestActions}
                >   
                    <MenuItem key="opt-1" onClick={closeRequestActions}>
                      <Typography textAlign='center'>Cancel request.</Typography>
                    </MenuItem>
                </Menu>
            </Paper>
            <Paper elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Typography variant='h5'>
                        Friend Request sent to: Bill Tito  -
                    </Typography>
                    <Typography variant='subtitle2'>5 weeks ago</Typography>
                </Box>
                
                <Tooltip arrow title="User has received the request and has yet to respond." >
                    <Button variant="contained" color="info" onClick={openRequestOptions} sx={{my:1,position:'absolute', right:'5px',top:'2px'}}>
                        <MoreHorizIcon/>
                    </Button>
                </Tooltip> 
                <Menu
                  sx={{ mb: '25px'}}
                  id="comment-actions"
                  anchorEl={requestActions}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical:'bottom'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={Boolean(requestActions)}
                  onClose={closeRequestActions}
                >   
                    <MenuItem key="opt-1" onClick={closeRequestActions}>
                      <Typography textAlign='center'>Cancel request.</Typography>
                    </MenuItem>
                </Menu>
            </Paper>
            <Paper elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Typography variant='h5'>
                        Friend Request sent to: Bill Tito  -
                    </Typography>
                    <Typography variant='subtitle2'>5 weeks ago</Typography>
                </Box>
                
                <Tooltip arrow title="User has received the request and has yet to respond." >
                    <Button variant="contained" color="info" onClick={openRequestOptions} sx={{my:1,position:'absolute', right:'5px',top:'2px'}}>
                        <MoreHorizIcon/>
                    </Button>
                </Tooltip> 
                <Menu
                  sx={{ mb: '25px'}}
                  id="comment-actions"
                  anchorEl={requestActions}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical:'bottom'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={Boolean(requestActions)}
                  onClose={closeRequestActions}
                >   
                    <MenuItem key="opt-1" onClick={closeRequestActions}>
                      <Typography textAlign='center'>Cancel request.</Typography>
                    </MenuItem>
                </Menu>
            </Paper>
            
            
       </Container>
       <Box sx={{textAlign:'center'}}>
            <Divider/>
            <Typography variant="h5" sx={{py:1}}>Incoming Requests : 3</Typography>
        </Box>  
       <Container>
       <Paper elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Typography variant='h5'>
                        Friend Request sent from: Savoyrogamiolaros Nikolakis  -
                    </Typography>
                    <Typography variant='subtitle2'>5 weeks ago</Typography>
                </Box>
                <Box sx={{position:'absolute', right:'5px', bottom:'9px'}}>
                    <Tooltip arrow title="Accept request" >
                        <Button variant="contained" color="success" >
                            <DoneIcon/>
                        </Button>
                    </Tooltip> 
                    <Tooltip arrow title="Deny Request">
                        <Button variant="contained" color="error" sx={{marginLeft:'3px'}}>
                            <ClearIcon/>
                        </Button>
                    </Tooltip>
                </Box>
                
                
            </Paper> 
            <Paper elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Typography variant='h5'>
                        Friend Request sent from: Savoyrogamiolaros Nikolakis  -
                    </Typography>
                    <Typography variant='subtitle2'>5 weeks ago</Typography>
                </Box>
                <Box sx={{position:'absolute', right:'5px', bottom:'9px'}}>
                    <Tooltip arrow title="Accept request" >
                        <Button variant="contained" color="success" >
                            <DoneIcon/>
                        </Button>
                    </Tooltip> 
                    <Tooltip arrow title="Deny Request">
                        <Button variant="contained" color="error" sx={{marginLeft:'3px'}}>
                            <ClearIcon/>
                        </Button>
                    </Tooltip>
                </Box>
                
                
            </Paper>
            <Paper elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    <Typography variant='h5'>
                        Friend Request sent from: Savoyrogamiolaros Nikolakis  -
                    </Typography>
                    <Typography variant='subtitle2'>5 weeks ago</Typography>
                </Box>
                <Box sx={{position:'absolute', right:'5px', bottom:'9px'}}>
                    <Tooltip arrow title="Accept request" >
                        <Button variant="contained" color="success" >
                            <DoneIcon/>
                        </Button>
                    </Tooltip> 
                    <Tooltip arrow title="Deny Request">
                        <Button variant="contained" color="error" sx={{marginLeft:'3px'}}>
                            <ClearIcon/>
                        </Button>
                    </Tooltip>
                </Box>
                
                
            </Paper>
            
                    
       </Container>
    </Box>
  )
}

export default ViewRequests