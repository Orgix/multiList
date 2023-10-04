import {useState,createContext, useContext} from 'react'
import { styles } from './styles'
import { Tooltip, IconButton, Box, Menu,MenuItem, Typography} from '@mui/material'
import { useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmailIcon from '@mui/icons-material/Email';
import { sendInvitations } from '../../../services/actions/auth';
import DialogWindow from '../DialogWindow';
import useToggle from '../../../hooks/useToggle';
import { useSelector, useDispatch } from 'react-redux';
import { clearSearch } from '../../../services/state/authSlice';

export const AssociateListContext = createContext(null);

const EditOptions = () => {
  const [assignModal, setAssignModal] = useToggle(false)
  const [infoModal, setInfoModal] = useToggle(false)
  const [subtaskActions, setSubtaskActions] = useState(null);
  const [associateList, setAssociateList] = useState([])
  const {id, userId} = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.user)
  
  
    const handleOpenUserMenu = (event) => {
        setSubtaskActions(event.currentTarget);
      };
    
    const handleCloseUserMenu = () => {
        setSubtaskActions(null);
    };
    const dispatchInvitations = () =>{
      setInfoModal(false)
      dispatch(sendInvitations({list:associateList, taskId: id}))
      setAssociateList([])
      dispatch(clearSearch())
      console.log('d')
    }
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
                        <IconButton onClick={()=>setInfoModal(true)}>
                          <EmailIcon/>
                          <Typography textAlign='center' >Invite</Typography>
                          
                        </IconButton>
                    </MenuItem>
                    <MenuItem key="opt-2" onClick={handleCloseUserMenu}>
                        <IconButton onClick={()=>setAssignModal(true)}>
                            <AssignmentIcon/>
                            <Typography textAlign='center' >View Assignment Details</Typography>
                            
                        </IconButton>
                    </MenuItem>
                </Menu>
                <AssociateListContext.Provider value={{associateList, setAssociateList}}>
                <DialogWindow 
                            open={infoModal} 
                            setOpen={setInfoModal}  
                            owner = {userId === undefined}
                            mode = 'invites'
                            confirm = {dispatchInvitations}
                            list={associateList}
                            setList={setAssociateList}
                          />
                </AssociateListContext.Provider>
                
                <DialogWindow 
                  open={assignModal} 
                  setOpen={setAssignModal}  
                  owner = {userId === undefined ? `${user.firstName} ${user.lastName}` : ''}
                  mode = 'information'
                  confirm = {dispatchInvitations}
                />
                </Box>
    </div>
  )
}

export default EditOptions