import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSelector, useDispatch } from 'react-redux';
import {Tooltip, Button} from '@mui/material'
import { addFriend, deleteFriend } from '../../services/actions/auth';

const AddFriend = ({userId}) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.user);
    const isFriend = user.friends.includes(userId)

    console.log(userId)
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
        <Tooltip arrow title="Add to friend list">
        <Button sx={{my:1}}variant="contained" color="info" onClick={handleClick}>
        <PersonAddIcon/>
        </Button>
    </Tooltip>
  )       
}

export default AddFriend