import {useEffect, useState} from 'react'
import { Card, CardHeader, CardContent, Typography,Box, CardActions, TextField, Button, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment';
import {useSelector, useDispatch} from 'react-redux'
import { getComments} from '../../../services/state/commentSlice';
import { fetchTaskSuggestions,postSuggestion } from '../../../services/actions/tasks';
import { styles } from '../styles';

const Suggestions = ({taskID, user, title}) => {
  const [suggData, setsuggData] = useState('')
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchTaskSuggestions(taskID))
  },[taskID])

  const comments = useSelector(getComments)
  
  const handleChange = (event) =>{
    setsuggData(event.target.value)
  }

  const handleSuggestion = () =>{
    //if not empty proceed
    if(suggData.trim() !== ''){
      const newSuggestion = {
        text:suggData,
        author:{
          name:`${user.firstName} ${user.lastName}`,
          authorID: user.id
        }
      }
      dispatch(postSuggestion({id : taskID,suggestion:  newSuggestion}))
    }
  }
  const handleKeyDown = (event) => {
    //in case the enter button without the shift is pressed, proceed
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSuggestion();
      event.preventDefault();
    }
  };
  return (
    <Card elevation={3} sx={{width:1}}>
        <CardHeader
        title="Discuss and suggest"
        subheader={`For task: ${title}`}
        sx={styles.suggestionHeader}
      />
        <CardContent>
          {comments.length > 0 ? 
            comments.map(comment=>{
              return <Comment key={comment.id} comment={comment}/>
            }) : 
            <Box sx={{my:1}}>
              <Typography>Be the first to leave a task-related suggestion to the author!</Typography>
            </Box>
          }
        </CardContent>
        <CardActions sx={styles.Editcontainer}>
                    <TextField sx={styles.suggestionInput} fullWidth type="text" label="Suggest" name="comment" value={suggData} onChange={handleChange} onKeyDown={handleKeyDown} multiline={true} placeholder='Make a suggestion'/>
                    <IconButton sx={styles.suggestionBtn} onClick={handleSuggestion}><SendIcon/></IconButton>
        </CardActions>
    </Card>
  )
}

export default Suggestions