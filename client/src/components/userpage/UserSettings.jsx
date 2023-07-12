import { Container, TextField, Typography,Grid,Box, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { validateSettings } from '../../utils/validateInput'
import { updateUserData, deleteUser } from '../../services/actions/auth'
import useToggle from '../../hooks/useToggle'
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
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth.user)
  const [disabled, setDisabled] = useToggle(true)
  const [settings, setSettings] = useState({
    ...initialState, firstName:user.firstName, lastName: user.lastName, email: user.email, username:'sample name'
  })
  const [open, setOpen] = useState(false)
  
  const handleChange = (evt) =>{
    setSettings({...settings, [evt.target.name]: evt.target.value })
  }
  const handleDelete = () =>{
    //handle the deletion process for the user. Delete all suggestions/tasks created and the user itself
    dispatch(deleteUser(user.id))
    setOpen(false)
  }
  const handleSave = () =>{
    //password change mode and remaining fields mode
    const modes = {
        'passwordChange':false,
        'remainderChange':[]
    }
    //disabled check is true, only check for the length of one of the password fields, if bigger than 0
    //password mode is true
    if(settings.passwordOld.length > 0) modes.passwordChange = true

    //get keys of the remaining fields
    const keys = Object.keys(settings).filter(key=> key!=='username' && key.indexOf('password') === -1)

    //if the state has modfied values , push the key value to the mode
    keys.forEach(key=>{
        if(settings[key] !== user[key]) modes.remainderChange.push(key)
    })
    
    //if password mode is true or there's even a modification in the modification array, proceed updating
    if(modes.passwordChange || modes.remainderChange.length > 0){
        //bundle an object with all the needed data.
        //the state data and the modes
        
        dispatch(updateUserData({modObj: modes, data: settings, id:user.id}))
        setSettings({...settings, passwordNew:'',passwordOld:'', passwordNewConfirm:''})
    }
}

  const handleBlur = () =>{
    const settingKeys = Object.keys(settings).filter(key=> key !== 'username')
    setDisabled(!validateSettings(settings, settingKeys))
  }
  
  return (
    <Container>
        <Typography textAlign='center' variant="h2" sx={{mt:2}}>My user Settings</Typography>
        <form>
            <Grid container spacing={2} sx={{mt:2}}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="text" value={settings.firstName} inputProps={{ autoComplete: 'first-name' }}  onChange={handleChange} onBlur={handleBlur} label="First Name" name="firstName"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="text" value={settings.lastName} inputProps={{ autoComplete: 'last-name' }} onChange={handleChange} onBlur={handleBlur} label="Last Name" name="lastName" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="email" value={settings.email} inputProps={{autoComplete: 'email'}} onChange={handleChange} onBlur={handleBlur} label="email" name="email"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth type="text" value={settings.username} inputProps={{autoComplete: 'username'}} onChange={handleChange} onBlur={handleBlur} label="username" name="username"/>
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
                            <TextField fullWidth type="password" value={settings.passwordOld} inputProps={{ autoComplete: 'current-password' }} onChange={handleChange} onBlur={handleBlur} label="Old password" name="passwordOld" />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{my:2}}>
                            <TextField fullWidth type="password" value={settings.passwordNew} inputProps={{ autoComplete: 'new-password' }} onChange={handleChange} onBlur={handleBlur} label="New password" name="passwordNew" />
                        </Grid>
                        <Grid item xs={12} md={6} sx={{my:2}}>
                            <TextField fullWidth type="password" value={settings.passwordNewConfirm}  inputProps={{ autoComplete: 'new-password' }} onChange={handleChange} onBlur={handleBlur} label="Confirm new password" name="passwordNewConfirm" />
                        </Grid>
                    </Grid>
                </Box>
        </form>
        <Container sx={{my:2, display:'flex', justifyContent:'space-between'}} disableGutters>
            <Button color="error" variant="contained" onClick={()=>setOpen(true)}>
                Delete Account
            </Button>
            <DialogWindow open={open} setOpen={setOpen} confirm={handleDelete} title="Actions with consequences: Delete User" text="You're about to fully delete the whole user profile, and all the subsequent tasks and suggestions provided. Do you agree?"/>
            <Button variant="contained" color="info" onClick={handleSave} disabled={disabled}>
                    Save changes
            </Button>
        </Container>
    </Container>
  )
}

export default UserSettings