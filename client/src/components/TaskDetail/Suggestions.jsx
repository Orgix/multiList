import React from 'react'
import { Card, CardHeader, CardContent, Typography,Box, CardActions, TextField, Button, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { styles } from './styles';

const Suggestions = () => {
  return (
    <Card elevation={3} sx={{width:1}}>
        <CardHeader
        title="Discuss and suggest"
        subheader="For task: react header"
        sx={styles.suggestionHeader}
      />
        <CardContent>
        <Box sx={{my:1}}>
                <Typography> <b>Username1</b>: Break down the tasks, make them more manageable</Typography><Typography variant="subtitle1">6 days ago</Typography>
            </Box>
            <Box sx={{my:1}}>
                <Typography> <b>Username2</b>: Break down the tasks, make them more manageable</Typography><Typography variant="subtitle1">6 days ago</Typography>
            </Box>
            <Box sx={{my:1}}>
                <Typography> <b>Username3</b>: Break down the tasks, make them more manageable</Typography><Typography variant="subtitle1">6 days ago</Typography>
            </Box>
            <Box sx={{my:1}}>
                <Typography> <b>Username4</b>: Break down the tasks, make them more manageable</Typography><Typography variant="subtitle1">6 days ago</Typography>
            </Box>
            <Box sx={{my:1}}>
                <Typography><b>Username5</b>: Break down the tasks, make them more manageable</Typography> <Typography variant="subtitle1">6 days ago</Typography>
            </Box>
        </CardContent>
        <CardActions sx={styles.Editcontainer}>
                    <TextField sx={styles.suggestionInput} fullWidth type="text" label="Suggest" name="comment" placeholder='Make a suggestion'/>
                    <IconButton sx={styles.suggestionBtn}><SendIcon/></IconButton>
        </CardActions>
    </Card>
  )
}

export default Suggestions