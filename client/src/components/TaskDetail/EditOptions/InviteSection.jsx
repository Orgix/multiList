import {useContext} from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../../services/state/authSlice'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AssociateListContext } from './EditOptions';
import SearchBar from './SearchBar';
import SearchBarResults from './SearchBarResults';

const InviteSection = ({taskId}) => {
    const requests = useSelector((state)=> state.auth.user.requests)
  const invitations = requests.filter((request) => request.requestType === 'TASK INVITATION')
    const user = useSelector(getUser)
    const {associateList, setAssociateList} = useContext(AssociateListContext)

    const selectAssociate = (friendObj)=>{//if id is in the state, do not setstate, else set it
        const found = associateList.find(associate=> associate.id === friendObj.id)
        if(found === undefined) setAssociateList(prev=>[...prev, friendObj])
    }
    const removeAssociate = (id) => {
        setAssociateList(prev=> 
            prev.filter(associate=> associate.id !== id))
    }
  return (
    <Box>
        <Paper elevation={3} sx={{mb:4}}>
            <SearchBar/>
        </Paper>
            <SearchBarResults add={selectAssociate}/>
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
                        onClick={()=>selectAssociate({id:friend._id, firstName: friend.firstName,lastName: friend.lastName})} 
                        disabled={(associateList.find(associate=> associate.id === friend._id) !== undefined || invitations.find(invitation=> invitation.to._id === friend._id) !== undefined)}
                        
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
                   <Typography variant='h5' sx={{p:0,m:0}}>{user.firstName} {user.lastName}</Typography>
                   <IconButton 
                       sx={{p:0, m:0,color:'red'}}
                       onClick={()=>removeAssociate(user.id)}>
                       <DeleteForeverIcon fontSize='large' />
                   </IconButton>
               </Box>
               )}

        </Paper>
    </Box>
  )
}

export default InviteSection