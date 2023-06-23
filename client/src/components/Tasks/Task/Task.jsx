import React from 'react'
import { Card, CardContent, CardActions, Typography, Box} from '@mui/material'
import CardButtons from './CardButtons'
import {convertToRelativeTime} from '../../../utils/time'
import { useSelector } from 'react-redux'

const Task = ({task,author}) => {
  const completed = task.tasks.filter((item)=> item.completed).length
  const percentage = task.tasks.length > 0 ? Math.floor((completed/task.tasks.length)*100 ) : 0
  const user = useSelector((state) => state.auth.user)
  return (
      <Card sx={{margin:'5px',position:'relative'}}>
      <CardContent>
        <Box sx={{display:'flex'}}>
          <Typography  variant="p">
            {task.title}
          </Typography>
          {author && <Typography  variant="p" sx={{position:'absolute', right:'5px',top:'5px', fontSize:'12px'}}>
            By: {task.author.name}
          </Typography>}
          
        </Box>
        
        <Typography variant="body2" color="text.secondary">
          Tasks completed: {completed}
        </Typography>
        <Typography variant='subtitle1' fontWeight={800} color={percentage < 50 ? 'red' : 'green'}>
          {percentage} %
        </Typography>
        <Typography sx={{position:'absolute', right:'5px', top:author? '25px':'5px'}}>
          Scope: {task.privacy}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{position:'absolute', right:'5px', bottom:'5px'}}>
          {convertToRelativeTime(task.createdAt)}
        </Typography>
        <Typography sx={{position:'absolute', left: '15px'}}>Total tasks: {task.tasks.length}</Typography>
      </CardContent>
      <CardActions>
        <CardButtons id={task._id} auth={task.author.authorID}/>
      </CardActions>
    </Card>
  )
}

export default Task