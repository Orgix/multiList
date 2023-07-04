import React from 'react'
import { convertToRelativeTime } from '../../../utils/time'
import { Box, Typography,Link } from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import { styles } from './styles'

const Comment = ({comment}) => {
  return (
      <Box sx={{my:1}}>
        <Typography> <Link component={RouterLink} underline="none" sx={styles.authorLink}><b>{comment.author.name}</b></Link>: {comment.text}</Typography><Typography variant="subtitle1">{convertToRelativeTime(comment.created)}</Typography>
      </Box>
  )
}

export default Comment