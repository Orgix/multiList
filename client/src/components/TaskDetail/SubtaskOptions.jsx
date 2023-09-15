import { useState } from "react";
import { Tooltip, Menu, MenuItem,Typography,IconButton, Box } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SubtaskOptions = ({completeHandle, editHandle, deleteHandle,completed }) => {
    const [subtaskActions, setSutaskActions] = useState(null);
    const handleOpenUserMenu = (event) => {
        setSutaskActions(event.currentTarget);
      };
    
    const handleCloseUserMenu = () => {
        setSutaskActions(null);
    };

  return (
    <Box sx={{position:'relative'}}>
    <Tooltip title="Actions" placement="right-start">
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
                        <IconButton onClick={deleteHandle}>
                            <DeleteForeverIcon sx={{color:'red'}}/>
                            <Typography textAlign='center' >Delete</Typography>
                        </IconButton>
                    </MenuItem>
                    <MenuItem key="opt-2" onClick={handleCloseUserMenu}>
                        <IconButton onClick={editHandle}>
                            <EditIcon/>
                            <Typography textAlign='center' >Edit</Typography>
                        </IconButton>
                    </MenuItem>
                    <MenuItem key="opt-3" onClick={handleCloseUserMenu}>
                        <IconButton onClick={completeHandle}>
                            {completed ? 
                                <>
                                    <UndoIcon/>
                                    <Typography textAlign='center' >Undo Completion</Typography>
                                </> : 
                                <>
                                    <CheckIcon sx={{color:'green'}}/>
                                    <Typography textAlign='center' >Mark as Completed</Typography>
                                </>
                                }
                        </IconButton>
                    </MenuItem>
                    <MenuItem key="opt-4" onClick={handleCloseUserMenu}>
                        <IconButton>
                            <AssignmentIcon sx={{color:'blue'}}/>
                            <Typography textAlign='center' >Assign To :</Typography>
                        </IconButton>
                    </MenuItem>
                </Menu>
                </Box>
  )
}

export default SubtaskOptions