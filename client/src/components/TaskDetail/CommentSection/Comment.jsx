import {useState} from 'react'
import { convertToRelativeTime } from '../../../utils/time'
import { Box, Typography,Link, Paper, IconButton, Tooltip, Menu,MenuItem,Container, TextField,Button} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import { styles } from './styles'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux'
import { editSuggestion } from '../../../services/actions/tasks'

const Comment = ({comment, deleteComment, authorAccess, suggestionAuthorAccess}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);
  const [commentActions, setCommentActions] = useState(null);
  const dispatch = useDispatch()

  const handleOpenUserMenu = (event) => {
    setCommentActions(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setCommentActions(null);
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () =>{
    if(editedComment.trim() !== ''){
      dispatch(editSuggestion({id:comment.id, suggestion: editedComment}))
      setIsEditing(false);
    }
  }

  const handleInputChange = (evt) =>{
    setEditedComment(evt.target.value)
  }
  return (
    <Paper sx={{my:1}} elevation={!isEditing ? 3 : 0}>
      {!isEditing ? 
      
      <Box sx={{py:1, pl:1, position:'relative'}}>
        <Box sx={{display:'flex'}}> 
          <Link component={RouterLink} underline="none" sx={styles.authorLink}><b>{comment.author.name}</b></Link> 
          <Typography variant="subtitle1">&nbsp;- {convertToRelativeTime(comment.created)}</Typography> 
          &nbsp;{comment.edited && <Typography>(edited)</Typography>}
        </Box>
        <Typography>  
          {comment.text}
        </Typography>
        {/* <IconButton onClick={()=>deleteComment(comment.id)} sx={{position:'absolute', right:0, bottom:'20%', color:'#5dbede'}}><DeleteForeverIcon/></IconButton> */}
        {(authorAccess || suggestionAuthorAccess) && 
        <>
          <Tooltip title="Actions" placement="right-start">
            <IconButton onClick={handleOpenUserMenu} sx={{position:'absolute', right:0, bottom:'20%', color:'#5dbede'}}>
              <MoreVertIcon/>
            </IconButton>
        </Tooltip>
        <Menu
                  sx={{ mb: '25px'}}
                  id="comment-actions"
                  anchorEl={commentActions}
                  anchorOrigin={{
                    horizontal: 'left',
                    vertical:'top'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(commentActions)}
                  onClose={handleCloseUserMenu}
                >   
                  {suggestionAuthorAccess && 
                    <MenuItem key="opt-1" onClick={handleCloseUserMenu}>
                      <Typography textAlign='center' onClick={handleEditClick}>Edit</Typography>
                    </MenuItem>
                  }
                    
                    <MenuItem key="opt-2" onClick={handleCloseUserMenu}>
                        <Typography textAlign='center' onClick={()=>deleteComment(comment.id)}>Delete</Typography>
                        
                    </MenuItem>
                </Menu>
                </>
        }
      </Box>
      : 
      <Box>
        <Container sx={styles.Editcontainer} disableGutters>
                        <TextField variant="outlined" sx={styles.input} InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius:0 } }} type="text" label="Edit comment" name="comment" value={editedComment} onChange={handleInputChange}/>
                        <Button onClick={handleSaveClick} size="large" sx={styles.saveEditbtn}>Save</Button>
          </Container>
      </Box>}
    </Paper>
      
  )
}
//authorization time task author may delete all comments(not edit other comments)
//suggesiton author may delete/edit only the self-generated comments
export default Comment