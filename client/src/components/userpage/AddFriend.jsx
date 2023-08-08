import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux';
import {Tooltip, Button} from '@mui/material'
import { addFriend, deleteFriend } from '../../services/actions/auth';

const AddFriend = ({userId}) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.user);
    //search friend list if user is there
    const isFriend = user.friends.includes(userId)
    //search if there is an outgoing request to the user
    const inRequests = user.requests.find(request=> request.from === user.id && request.to === userId)
    

    const handleClick = () =>{
        dispatch(isFriend ? deleteFriend(userId) : addFriend(userId))
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
        <Tooltip arrow title="User has received the request and has yet to respond.">
        <Button sx={{my:1}}variant="contained" color="info" onClick={()=>handleClick()}>
          <MoreHorizIcon/>
        </Button>
      </Tooltip> 
  )       
}

export default AddFriend