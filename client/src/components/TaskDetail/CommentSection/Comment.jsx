import React from 'react'
import { convertToRelativeTime } from '../../../utils/time'
import { Box, Typography,Link, Paper, IconButton } from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import { styles } from './styles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Comment = ({comment, deleteComment}) => {
  return (
    <Paper sx={{my:1}} elevation={3}>
      <Box sx={{py:1, pl:1, position:'relative'}}>
        <Box sx={{display:'flex'}}> 
          <Link component={RouterLink} underline="none" sx={styles.authorLink}><b>{comment.author.name}</b></Link> 
          <Typography variant="subtitle1">&nbsp;- {convertToRelativeTime(comment.created)}</Typography> 
        </Box>
        <Typography>  
          {comment.text}
        </Typography>
        <IconButton onClick={()=>deleteComment(comment.id)} sx={{position:'absolute', right:0, bottom:'20%', color:'#5dbede'}}><DeleteForeverIcon/></IconButton>
      </Box>
    </Paper>
      
  )
}

export default Comment