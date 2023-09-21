import React from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../../services/state/authSlice'
import { Box, Paper, Typography } from '@mui/material'

const InviteSection = ({taskId}) => {
    const user = useSelector(getUser)
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
            {user.friends.map(friend=>
                <Box>
                    <Typography variant='h5'>{friend.firstName} {friend.lastName}</Typography>
                </Box>
                )}
        </Paper>
    </Box>
  )
}

export default InviteSection