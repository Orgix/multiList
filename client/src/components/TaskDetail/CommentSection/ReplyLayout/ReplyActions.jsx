import { useState } from 'react'
import { Button,Typography, Paper, TextField, Container, Box, IconButton,Tooltip, Menu,MenuItem,Link } from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {Link as RouterLink, useParams} from 'react-router-dom'
import { fetchReplies,postReply, deleteSuggestion } from '../../../../services/actions/tasks'
import { getComment } from '../../../../services/state/commentSlice'
import Comment from '../Comment'
import { styles } from './styles'
import { getTaskById } from '../../../../services/state/taskSlice'

const ReplyActions = ({suggestionId, replies}) => { 
  
  const [openReply, setOpenReply] = useState(false)
  const [openReplies, setOpenReplies] = useState(false)
  const [replyData, setReplyData] = useState('')
  const dispatch = useDispatch()
  const {id} = useParams();
  const user = useSelector((state)=> state.auth.user)
  const author = useSelector((state)=> getTaskById(state,id)).author

  const handleChange = (event) =>{
    setReplyData(event.target.value)
  }

  const handleReply = () =>{
    //if not empty proceed
    if(replyData.trim() !== ''){
      const newSuggestion = {
        text:replyData,
        author:{
          name:`${user.firstName} ${user.lastName}`,
          authorID: user.id
        },
        isReply:true,
        to:suggestionId
      }
      dispatch(postReply({id : suggestionId, reply:  newSuggestion}))
      setReplyData('')
    }
  }
  
  const deleteComment = (suggestionId) =>{
    dispatch(deleteSuggestion({taskId: taskID, suggestionId: suggestionId}))
  }
  
  const handleClickReply = () =>{
    setOpenReply(true)
  }

  const handleClickReplies = () =>{
    dispatch(fetchReplies(suggestionId))
    setOpenReplies(!openReplies)
  }
  const replyObjs = useSelector((state)=> getComment(state,suggestionId)).replies
  return (
    <>
        <Button sx={{position:'absolute',top:'60px', left:'13px'}} onClick={handleClickReply} variant="text" >Reply</Button>
        {replies > 0 && <Button sx={{position:'absolute',top:'60px', left:'66px'}} onClick={handleClickReplies} variant="text" >{!openReplies ? `View replies (${replies})` : 'Hide Replies'}</Button>}
        {openReplies && 
            <>  
                <Container sx={{mt:4}} disableGutters>
                {Array.isArray(replyObjs) ? 
                    replyObjs.map(reply=>{
                        return <Comment key={reply._id} comment={reply} deleteComment={deleteComment} authorAccess={user.id === author.authorID} suggestionAuthorAccess={user.id === reply.author.authorID} />
                    }): '' 
                }
                </Container>
                
            </>
        }
        {openReply && 
            <>
                <Box sx={{my:4, ml:4}}>
                    <Container sx={styles.Editcontainer} disableGutters>
                        <TextField variant="outlined" sx={styles.input} InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius:0 } }} value={replyData} onChange={handleChange} type="text" label="Post a reply" name="reply"/>
                        <Button size="large" onClick={handleReply} sx={styles.saveEditbtn}>Save</Button>
                    </Container>
                </Box>
            </>
        }
    </>
  )
}

export default ReplyActions