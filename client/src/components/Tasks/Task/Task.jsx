import React from 'react'
import { Card, CardContent, CardActions, Typography, Box} from '@mui/material'
import CardButtons from './CardButtons'
import {convertToRelativeTime} from '../../../utils/time'
const Task = ({task}) => {
  console.log(task)
  const completed = task.tasks.filter((item)=> item.completed).length
  const percentage = Math.floor((completed/task.tasks.length)*100 )
  return (
      <Card sx={{margin:'5px',position:'relative'}}>
      <CardContent>
        <Box sx={{display:'flex'}}>
          <Typography  variant="p" >
            {task.title}
          </Typography>
          <Typography  variant="p" sx={{position:'absolute', right:'5px',top:'5px', fontSize:'12px'}}>
            By: {task.author}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Tasks completed: {completed}
        </Typography>
        <Typography variant='subtitle1'>
          {percentage} %
        </Typography>
        <Typography sx={{position:'absolute', right:'5px', top:'25px'}}>
          Scope: {task.privacy}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
          {convertToRelativeTime(task.createdAt)}
        </Typography>
        <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: {task.tasks.length}</Typography>
      </CardContent>
      <CardActions>
        <CardButtons id={task._id}/>
      </CardActions>
    </Card>
  )
}

export default Task