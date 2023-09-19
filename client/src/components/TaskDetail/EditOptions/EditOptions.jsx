import {useState} from 'react'
import { styles } from './styles'
import { Tooltip, IconButton, Box, Menu,MenuItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const EditOptions = () => {
  const [subtaskActions, setSutaskActions] = useState(null);
    const handleOpenUserMenu = (event) => {
        setSutaskActions(event.currentTarget);
      };
    
    const handleCloseUserMenu = () => {
        setSutaskActions(null);
    };
  return (
    <div style={styles.container}>
       <Box sx={{position:'relative'}}>
    <Tooltip title="Edit Actions" placement="right-start">
            <IconButton onClick={handleOpenUserMenu} sx={{position:'absolute', right:0, bottom:'-20px', color:'#5dbede'}}>
              <MoreVertIcon/>
            </IconButton>
        </Tooltip>
        <Menu
                  sx={{ mb: '25px'}}
                  id="comment-actions"
                  anchorEl={subtaskActions}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical:'bottom'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(subtaskActions)}
                  onClose={handleCloseUserMenu}
                >   
                    <MenuItem key="opt-1" onClick={handleCloseUserMenu}>
                        <IconButton>
                            <Typography textAlign='center' >Invite</Typography>
                        </IconButton>
                    </MenuItem>
                </Menu>
                </Box>
    </div>
  )
}

export default EditOptions