import React from 'react'
import { Card, CardContent, CardActions, Typography, Button, Box} from '@mui/material'
import {styled} from '@mui/material/styles'
import {convertToRelativeTime} from '../../../utils/time'
const Task = ({task}) => {
  console.log(task)
  const completed = task.tasks.filter((item)=> item.completed).length
  return (
      <Card sx={{margin:'5px',position:'relative'}}>
      <CardContent>
        <Box sx={{display:'flex'}}>
          <Typography  variant="p" >
            {task.title}
          </Typography>
          <Typography  variant="p" sx={{position:'absolute', right:'5px', fontSize:'12px'}}>
            By: {task.author}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Tasks completed: {completed}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
          {convertToRelativeTime(task.createdAt)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default Task