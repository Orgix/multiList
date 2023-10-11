import { Box, Container, Divider, IconButton, Paper, Typography,Tooltip,Button, Menu,MenuItem } from '@mui/material'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { convertToRelativeTime } from '../../utils/time'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { cancelRequest, resolveUserRequest,resolveTaskInvite } from '../../services/actions/auth';

const ViewRequests = () => {
    const requests = useSelector((state)=> state.auth.user)
    const [requestActions, setRequestActions] = useState(null);
    const dispatch = useDispatch();

    const openRequestOptions = (event) =>{
      setRequestActions(event.currentTarget)
    }

    const closeRequestActions = () =>{
        setRequestActions(null)
    } 

    const cancelFriendRequest = (request) =>{
        dispatch(cancelRequest({id:request._id, from: request.from._id}))
      }
      const resolveRequest = (id, response) =>{
        dispatch(resolveUserRequest({id:id, resp: response}))
      }

      const resolveInvite = (id,response) =>{
        dispatch(resolveTaskInvite({id:id, resp:response}))
      }
    const pending = requests.requests.filter(request=> request.from._id === requests.id)
    const incoming = requests.requests.filter(request=> request.to._id === requests.id)
  return (
    <Box>
        <Box sx={{display:'flex', justifyContent:'center',mb:2}}>
            <Typography variant='h4'>Requests From / To users : {requests.requests.length}</Typography>
        </Box>
        <Box sx={{textAlign:'center'}}>
            <Divider/>
            <Typography variant="h5" sx={{py:1}}>Requests PENDING : {pending.length}</Typography>
        </Box>
       <Container>
            
            {pending.map(request=>{
                return <Paper key={request._id} elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                    <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    {request.requestType === 'FRIEND REQUEST' ? 
                        <Typography variant='h5'>
                            Friend Request sent to: {request.to.firstName} {request.to.lastName}  -
                        </Typography> :
                        <Typography>
                            Invited {request.to.firstName} {request.to.lastName} to participate in the task <strong>{request.for.name}</strong> - 
                        </Typography>
                        }
                        <Typography variant='subtitle2'>{convertToRelativeTime(request.createdAt)}</Typography>
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
                        <Typography textAlign='center' onClick={()=>cancelFriendRequest(request)}>Cancel request.</Typography>
                        </MenuItem>
                    </Menu>
                </Paper> 
            })}
       </Container>
       <Box sx={{textAlign:'center'}}>
            <Divider/>
            <Typography variant="h5" sx={{py:1}}>Incoming Requests : {incoming.length}</Typography>
        </Box>  
       <Container>
            {incoming.map(request=> {
                return <Paper key={request._id} elevation={3} sx={{py:2, pl:1,my:2, display:'flex',position:'relative'}}>
                <Box sx={{display:'flex', flexDirection:'row', gap:1}}>
                    {request.requestType === 'FRIEND REQUEST' ? 
                    <Typography variant='h5'>
                    Friend Request sent from: {request.from.firstName} {request.from.lastName}  -
                </Typography>
                 : 
                <Typography variant='h5'>
                    <strong>{request.from.firstName} {request.from.lastName}</strong> invited you to participate in the task <strong>{request.for.name}</strong>
                </Typography>
                }
                <Typography variant='subtitle2'>{convertToRelativeTime(request.createdAt)}</Typography>
                </Box>
                <Box sx={{position:'absolute', right:'5px', bottom:'9px'}}>
                    {request.requestType === 'FRIEND REQUEST' ? 
                    <>
                        <Tooltip arrow title="Accept request" >
                            <Button variant="contained" color="success" onClick={()=>resolveRequest(request._id, true)}>
                                <DoneIcon/>
                            </Button>
                        </Tooltip> 
                        <Tooltip arrow title="Deny Request">
                            <Button variant="contained" color="error" sx={{marginLeft:'3px'}} onClick={()=>resolveRequest(request._id, false)}> 
                                <ClearIcon/>
                            </Button>
                        </Tooltip>
                    </> : 
                    <>
                        <Tooltip arrow title="Accept request" >
                            <Button variant="contained" color="success" onClick={()=>resolveInvite(request._id, true)}>
                                <DoneIcon/>
                            </Button>
                        </Tooltip> 
                        <Tooltip arrow title="Deny Request">
                            <Button variant="contained" color="error" sx={{marginLeft:'3px'}} onClick={()=>resolveInvite(request._id, false)}> 
                                <ClearIcon/>
                            </Button>
                        </Tooltip>
                    </>
                    }
                    
                </Box>
                </Paper>
            })}
       </Container>
    </Box>
  )
}

export default ViewRequests