import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { getTaskById } from '../../../services/state/taskSlice'
import { useSelector } from 'react-redux';

const SubtaskView = ({taskId}) => {
    const task = useSelector((state)=>getTaskById(state,taskId));
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 'auto',
        gap:3
      }}>   
            {task.tasks.map((subtask,index)=>
                <Paper key={index} sx={{position:'relative', py:1,px:1}}>
                <Typography>Task Name: <strong>{subtask.name}</strong></Typography>
                    <Typography> Completed:</Typography> 
                    {subtask.completed ? <CheckIcon sx={{position:'absolute',left:'80px', top:'27px', color:'green'}}/> : 
                    <CloseIcon sx={{position:'absolute',left:'80px', top:'30px', color:'red'}}/>}
                    {/* assigned to : before this works with a real assignee, it is strongly suggested to create the subtask accordingly 
                    and for the task structure to have the assignees */}
                    <Typography>Assigned To: <strong>Todor Smirnof</strong></Typography>
                </Paper>
            )}
            <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>
              Switching assignees for each subtask may be done by the correspondent subtask's action menu, provided you have ownership or the proper role.
            </Typography>
          </Box>
  )
}

export default SubtaskView