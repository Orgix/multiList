import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SubtaskView from './EditOptions/SubtaskView'; 
import InviteSection from './EditOptions/InviteSection';
import { Button, Typography,Box,Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const DialogWindow = ({title,text, confirm, open,setOpen, mode, owner}) => {
      const {id} = useParams();
      const handleClose = () => {
        setOpen(false);
      };

      if(mode === 'information'){
        return (
          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"> 
            <DialogTitle id="alert-dialog-title" textAlign='center'>
                Task owned by : {owner}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" textAlign='center'>
                  Assignment List and Assignees :
                </DialogContentText>
                <SubtaskView taskId={id}/>
              </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        ) 
      } 
      else if(mode === 'invites'){
        return (
<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"> 
            <DialogTitle id="alert-dialog-title">
                Provide access to Task
            </DialogTitle>
            <DialogContent>
            <InviteSection taskId={id}/>
              </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button color="success" onClick={confirm} autoFocus>
                  Invite Selected
                </Button>
            </DialogActions>
          </Dialog>

        )
      }
      else {
        return (
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {text}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="error" onClick={confirm} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
        )
      }
  
}

export default DialogWindow
