import { Box, Container, Paper, Typography,Tooltip,Button } from '@mui/material';
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux'
const FriendList = () => {
  const friends = useSelector((state)=>state.auth.user.friends);
  
  return (
    <Container>
        <Box>
            <Typography textAlign='center' variant="h3">Associated users: {friends.length}</Typography>
        </Box>
        {friends.map(friend=>{
            return (
            <Paper sx={{py:2, my:2,display:'flex',position:'relative'}}>
                <Typography sx={{ml:1}}>{friend.firstName}</Typography>-<Typography>{friend.lastName}</Typography>
                <Box sx={{position:'absolute', right:'5px',bottom:'9px'}}>
                    <Tooltip arrow title="Deny Request">
                        <Button variant="contained" color="error" sx={{marginLeft:'3px'}}>
                            <ClearIcon/>
                        </Button>
                    </Tooltip>
                </Box>
            </Paper>
        )
        })}
    </Container>
  )
}

export default FriendList