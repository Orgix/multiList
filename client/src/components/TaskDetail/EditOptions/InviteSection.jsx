import {useContext} from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../../services/state/authSlice'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AssociateListContext } from './EditOptions';

const InviteSection = ({taskId}) => {
    const user = useSelector(getUser)
    const {associateList, setAssociateList} = useContext(AssociateListContext)

    const selectAssociate = (friendId)=>{//if id is in the state, do not setstate, else set it
        const found = associateList.find(associate=> associate === friendId)
        if(found === undefined) setAssociateList(prev=>[...prev, friendId])
    }
  return (
    <Box>
        <Paper elevation={3} sx={{mb:4}}>
            <Typography>Search field here.</Typography>
        </Paper>
        <Typography sx={{color:'rgba(0,0,0,0.5)', py:2}}>Inviting users associated with you may assist you a long way to organize the task/project and break it to even smaller pieces, making it more manageable. Any user invited will be able to view the task details and 
            activity log and will be able to mark any tasks that is correspondently assigned as complete. Inviting a user will send a request to the user. After resolving the request,
            user has access to the task.</Typography>
        <Paper elevation={1} sx={{px:2, pt:1}}>
            <Typography fontWeight='bold'>Recommended Users:</Typography><br/>
            {user.friends.map((friend,index)=>
                <Box key={index} sx={{position:'relative',display:'flex',alignItems:'center'}}>
                    <Typography variant='h5' sx={{p:0,m:0}}>{friend.firstName} {friend.lastName}</Typography>
                    <IconButton 
                        sx={{p:0, m:0,color:'blue'}} 
                        onClick={()=>selectAssociate(friend._id)} 
                        disabled={associateList.find(associate=> associate === friend._id) !== undefined}
                        
                        >
                        <AddIcon fontSize='large'/>
                    </IconButton>
                </Box>
                )}
        </Paper>
        <Paper elevation={3} sx={{py:2,px:1, my:2}}>

            {associateList.length === 0 ? <Typography> No selected users yet.</Typography>: <Typography>Selected users:</Typography>}    
                {associateList.map((user,index)=>
                   <Box key={index} sx={{position:'relative',display:'flex',alignItems:'center'}}>
                   <Typography variant='h5' sx={{p:0,m:0}}>{user}</Typography>
                   <IconButton 
                       sx={{p:0, m:0,color:'red'}}>
                       <DeleteForeverIcon fontSize='large'/>
                   </IconButton>
               </Box>
               )}

        </Paper>
    </Box>
  )
}

export default InviteSection