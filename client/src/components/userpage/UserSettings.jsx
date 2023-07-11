import { Container, TextField, Typography,Grid,Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import DialogWindow from '../TaskDetail/DialogWindow'

const initialState = {
    firstName:'',
    lastName:'',
    passwordOld:'',
    passwordNew:'',
    passwordNewConfirm:'',
    email:'',
    username: ''

}
const UserSettings = () => {
  const user = useSelector((state)=> state.auth.user)
  const [settings, setSettings] = useState({
    ...initialState, firstName:user.firstName, lastName: user.lastName, email: user.email, username:'sample name'
  })
  const [open, setOpen] = useState(false)
  

  console.log(user) 

  const handleChange = (evt) =>{
    setSettings({...settings, [evt.target.name]: evt.target.value })
  }
  const handleDelete = () =>{
    //handle the deletion process for the user. Delete all suggestions/tasks created and the user itself
    console.log('deleted')
    setOpen(false)
  }
  const handleSave = () =>{
    //check if all the fields are up do date with the validation standard. check if new passwords match (if there are any fields filled) and then submit
  }
  return (
    <Container>
        <Typography textAlign='center' variant="h2" sx={{mt:2}}>My user Settings</Typography>
        <form>
            <Grid container spacing={2} sx={{mt:2}}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="text" value={settings.firstName} inputProps={{ autoComplete: 'first-name' }}  onChange={handleChange} label="First Name" name="firstName"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="text" value={settings.lastName} inputProps={{ autoComplete: 'last-name' }} onChange={handleChange} label="Last Name" name="lastName" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="email" value={settings.email} inputProps={{autoComplete: 'email'}} onChange={handleChange} label="email" name="email"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="text" value={settings.username} inputProps={{autoComplete: 'username'}} onChange={handleChange} label="username" name="username"/>
                </Grid>
            </Grid>
                <Box sx={{position:'relative', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', mt:2 }}>
                    <Typography variant="caption" sx={{
                        position: 'absolute',
                        top: '-10px',
                        left: '10px',
                        backgroundColor: '#fff',
                        padding: '0 4px',
                        zIndex: 1,}}>
                        Passwords:
                    </Typography>
                    <Grid container spacing={2} justifyContent='center'>
                        <Grid item xs={12} md={6} sx={{my:2}}>
                            <TextField fullWidth type="password" value={settings.passwordOld} inputProps={{ autoComplete: 'current-password' }} onChange={handleChange} label="Old password" name="passwordOld" />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{my:2}}>
                            <TextField fullWidth type="password" value={settings.passwordNew} inputProps={{ autoComplete: 'new-password' }} onChange={handleChange} label="New password" name="passwordNew" />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{my:2}}>
                            <TextField fullWidth type="password" value={settings.passwordNewConfirm}  inputProps={{ autoComplete: 'new-password' }} onChange={handleChange} label="Confirm new password" name="passwordNewConfirm" />
                        </Grid>
                    </Grid>
                </Box>
        </form>
        <Container sx={{my:2, display:'flex', justifyContent:'space-between'}} disableGutters>
            <Button color="error" variant="contained" onClick={()=>setOpen(true)}>
                Delete
            </Button>
            <DialogWindow open={open} setOpen={setOpen} confirm={handleDelete} title="Actions with consequences: Delete User" text="You're about to fully delete the whole user profile, and all the subsequent tasks and suggestions provided. Do you agree?"/>
            <Button variant="contained" color="info" onClick={handleSave}>
                    Save changes
            </Button>
        </Container>
    </Container>
  )
}

export default UserSettings