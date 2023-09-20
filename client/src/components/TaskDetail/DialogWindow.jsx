import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Typography,Box,Paper } from '@mui/material';

const DialogWindow = ({title,text, confirm, open,setOpen, mode, owner}) => {
    
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
                <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              gap:3
            }}>
                  <Paper sx={{position:'relative', py:1,px:1}}>
                  <Typography>Task Name: <strong>Smoke a cigarette</strong></Typography>
                      <Typography> Completed:</Typography> 
                      <CheckIcon sx={{position:'absolute',left:'80px', top:'27px', color:'green'}}/>
                      <Typography>Assigned To: <strong>Todor Smirnof</strong></Typography>
                  </Paper>
                  <Paper sx={{position:'relative', py:1,px:1}}>
                  <Typography>Task Name: <strong>Moan the loan (that's right)</strong></Typography>
                    <Typography> Completed:</Typography> 
                    <CloseIcon sx={{position:'absolute',left:'80px', top:'30px', color:'red'}}/>
                    <Typography>Assigned To: <strong>Nick Tsounias</strong></Typography>
                  </Paper>
                  <Paper sx={{position:'relative', py:1,px:1}}>
                    <Typography>Task Name: <strong>Do the dishes</strong></Typography>
                    <Typography> Completed:</Typography> 
                    <CloseIcon sx={{position:'absolute',left:'80px', top:'30px', color:'red'}}/>
                    <Typography>Assigned To: <strong>Bill Tito</strong></Typography>
                  </Paper>

                  <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                    Switching assignees for each subtask may be done by the correspondent subtask's action menu, provided you have ownership or the proper role.
                  </Typography>
                </Box>
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
                <DialogContentText id="alert-dialog-description">
                  sample text here for now!
                  invite section
                </DialogContentText>
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
