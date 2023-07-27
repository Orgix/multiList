import { useState } from 'react'
import { Button,Typography, Paper, TextField, Container, Box, IconButton,Tooltip, Menu,MenuItem,Link } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link as RouterLink} from 'react-router-dom'
import { styles } from './styles'

const ReplyActions = () => {
  const [openReply, setOpenReply] = useState(false)
  const [openReplies, setOpenReplies] = useState(false)
  
  const handleClickReply = () =>{
    setOpenReply(true)
  }
  const handleClickReplies = () =>{
    setOpenReplies(!openReplies)
  }
  return (
    <>
        <Button sx={{position:'absolute',top:'60px', left:'13px'}} onClick={handleClickReply} variant="text" >Reply</Button>
        <Button sx={{position:'absolute',top:'60px', left:'66px'}} onClick={handleClickReplies} variant="text" >{!openReplies ? 'View replies(4)' : 'Hide Replies'}</Button>
        {openReplies && 
            <>  
                <Container sx={{mt:4}} disableGutters>
            
                <Paper key="1" elevation={3} sx={{ml:3, my:1, p:1}}>
                    <Box sx={{display:'flex'}}> 
                        <Link component={RouterLink} underline="none"><b>uwunistis</b></Link> 
                        <Typography variant="subtitle1">&nbsp;- 5 minutes ago</Typography> 
                        <Typography>(edited)</Typography>
                    </Box>
                    <Typography>  
                        reply text 1
                    </Typography>
                </Paper>
                <Paper key="3" elevation={3} sx={{ml:3, my:1, p:1}}>
                    <Box sx={{display:'flex'}}> 
                        <Link component={RouterLink} underline="none"><b>uwunistis</b></Link> 
                        <Typography variant="subtitle1">&nbsp;- 5 minutes ago</Typography> 
                        <Typography>(edited)</Typography>
                    </Box>
                    <Typography>  
                        reply text 1
                    </Typography>
                </Paper>
                <Paper key="4" elevation={3} sx={{ml:3, my:1, p:1}}>
                    <Box sx={{display:'flex'}}> 
                        <Link component={RouterLink} underline="none"><b>uwunistis</b></Link> 
                        <Typography variant="subtitle1">&nbsp;- 5 minutes ago</Typography> 
                        <Typography>(edited)</Typography>
                    </Box>
                    <Typography>  
                        reply text 1
                    </Typography>
                </Paper>
                <Paper key="2" elevation={3} sx={{ml:3, my:1, p:1}}>
                    <Box sx={{display:'flex'}}> 
                        <Link component={RouterLink} underline="none"><b>uwunistis</b></Link> 
                        <Typography variant="subtitle1">&nbsp;- 5 minutes ago</Typography> 
                        <Typography>(edited)</Typography>
                    </Box>
                    <Typography>  
                        reply text 1
                    </Typography>
                </Paper>
                
                </Container>
                
            </>
        }
        {openReply && 
            <>
                <Box sx={{my:4, ml:4}}>
                    <Container sx={styles.Editcontainer} disableGutters>
                        <TextField variant="outlined" sx={styles.input} InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius:0 } }} type="text" label="Post a reply" name="reply"/>
                        <Button size="large" sx={styles.saveEditbtn}>Save</Button>
                    </Container>
                </Box>
            </>
        }
    </>
  )
}

export default ReplyActions