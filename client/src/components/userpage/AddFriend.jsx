import { useState } from 'react';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux';
import {Tooltip, Button, Menu, MenuItem,Typography} from '@mui/material'
import { addFriend, deleteFriend, cancelRequest } from '../../services/actions/auth';

const AddFriend = ({userId}) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.user);
    const [requestActions, setRequestActions] = useState(null);
    //search friend list if user is there
    const isFriend = user.friends.includes(userId)
    //search if there is an outgoing request to the user
    const inRequests = user.requests.find(request=> request.from === user.id && request.to === userId)
    
    const openRequestOptions = (event) =>{
      setRequestActions(event.currentTarget)
    }

    const closeRequestActions = () =>{
      setRequestActions(null)
    } 

    const handleClick = () =>{
        dispatch(isFriend ? deleteFriend(userId) : addFriend(userId))
    }
    const cancelFriendRequest = () =>{
      dispatch(cancelRequest(inRequests))
    }
  return (
    isFriend ? 
        <Tooltip arrow title="Add to friend list">
            <Button sx={{my:1}}variant="contained" color="error" onClick={handleClick}>
            <PersonRemoveIcon/>
            </Button>
        </Tooltip>
        : 
        !inRequests ? 
        <Tooltip arrow title="Add to friend list">
          <Button sx={{my:1}}variant="contained" color="info" onClick={handleClick}>
            <PersonAddIcon/>
          </Button>
        </Tooltip> : 
        <>
        <Tooltip arrow title="User has received the request and has yet to respond.">
        <Button sx={{my:1}}variant="contained" color="info" onClick={openRequestOptions}>
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
                      <Typography textAlign='center' onClick={cancelFriendRequest}>Cancel request.</Typography>
                    </MenuItem>
                </Menu>
      </>
  )       
}

export default AddFriend