import { Box, Container, Paper, Typography,Tooltip,Button } from '@mui/material';
import {useState} from 'react'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux'
import DialogWindow from '../TaskDetail/DialogWindow';

const FriendList = () => {
    const [open,setOpen] = useState(false)
    const friends = useSelector((state)=>state.auth.user.friends);
  const  deleteFriend = (userId) =>{
    setOpen(false)
  }
  return (
    <Container>
        <Box>
            <Typography textAlign='center' variant="h3">Associated users: {friends.length}</Typography>
        </Box>
        {friends.map(friend=>{
            return (
            <Paper key={friend._id} sx={{py:2, my:2,display:'flex',position:'relative'}}>
                <Typography sx={{ml:1}}>{friend.firstName}</Typography>-<Typography>{friend.lastName}</Typography>
                <Box sx={{position:'absolute', right:'5px',bottom:'9px'}}>
                    <Tooltip arrow title="Deny Request">
                        <Button variant="contained" sx={{marginLeft:'3px'}} onClick={()=>setOpen(true)}>
                            <ClearIcon/>
                        </Button>
                    </Tooltip>
                    <DialogWindow open={open} setOpen={setOpen} confirm={()=>deleteFriend(friend._id)} title="Removing user from friend List does not remove him/her from a team that the user is already part of. It will however disable inviting the user to any additional tasks."/>
                </Box>
            </Paper>
        )
        })}
    </Container>
  )
}

export default FriendList