import * as React from 'react';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Container, Typography, Box, Grid, Button, Avatar} from '@mui/material/'
import useToggle from '../../hooks/useToggle';
import Input from './Input';
import {useDispatch, useSelector} from 'react-redux';
import { register,signin } from '../../services/actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export default function Auth() {
    const [showPassword, setShowPassword] = useToggle(false);
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useToggle(false)
    const [disabled, setDisabled] = useToggle(true)
    const dispatch = useDispatch();
    const {error, success, loading, userInfo} = useSelector((state)=> state.auth)

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup();
        setShowPassword();
        setDisabled(true)
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        //if pwd !== repeatpwd , clear the form and leave an error message
        const check = isSignup ? Object.keys(formData) : Object.keys(formData).filter(field => field === 'email' || field==='password')
        
        //in case there's 
        if(check.length === 2) setDisabled(!validateLoginData(formData, check))
        else setDisabled(!validateRegisterData(formData, check))
        // const check = isSignup ? Object.keys(formData) : Object.keys(formData).filter(field => field === 'email' || field==='password')
        
        if(!disabled){
          //handle the registration or signing in
          if(isSignup) dispatch(register(formData))
          else dispatch(signin(formData))
          clear();
        }
        
    };



  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const clear = () => {
    setFormData(initialState);
    setDisabled(true)
  };

  const handleOnBlur = (e) =>{
    const check = isSignup ? Object.keys(formData) : Object.keys(formData).filter(field => field === 'email' || field==='password')
        
    if(check.length === 2) setDisabled(!validateLoginData(formData, check))
    else setDisabled(!validateRegisterData(formData, check))
  }


  const validateLoginData = (state, keys) =>{
    //validate email and password. email needs to have . and @ and a certain length that is required(about 13) and password min 8 max 20
    const error = keys.filter(key=>{
      const val = state[key]
      if(key === 'password'){
        if(val.length < 8 || val.length > 20) return true
      }
      else if(val.indexOf('@') === -1 || val.indexOf('.')=== -1 || val.length < 15) return true;
  
      return false;
    })
  
    return error.length === 0 
  }
 
  const validateRegisterData = (state,keys)=>{
    const error = keys.filter(key=>{
      const val = state[key]
      if(key==="firstName" || key==="lastName"){
        if(val.length < 5 || val.length > 14) return true
      }
      else if(key==="password" || key==="confirmPassword"){
        if(val.length < 8 || val.length > 20) return true
      }
      else{
        if(val.indexOf('@') === -1 || val.indexOf('.')=== -1 || val.length < 15) return true
      }
      return false;
    })
    return error.length === 0 && state["password"] === state["confirmPassword"];
  }

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{mb:1}}>
            {isSignup? 'Sign up':'Sign In'}
          </Typography>
          <form onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            {error && <div> {error} </div>}
            <Grid container spacing={2}>
            {isSignup && (
                <>
                    <Grid item xs={12} sm={6}>
                        <Input name="firstName" value={formData.firstName} label="First Name" handleOnBlur={handleOnBlur} handleChange={handleChange} autoFocus  />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input name="lastName" value={formData.lastName} label="Last Name" handleOnBlur={handleOnBlur} handleChange={handleChange} />
                    </Grid>
                </>
            )}
              
              <Grid item xs={12}>
                <Input name="email" value={formData.email} handleOnBlur={handleOnBlur} label="Email Address" handleChange={handleChange} type="email" />
              </Grid>
              <Grid item xs={12}>
              <Input name="password"  value={formData.password} handleOnBlur={handleOnBlur} label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={setShowPassword} />    
              </Grid>
              <Grid item xs={12}>
              {isSignup && <Input name="confirmPassword"  handleOnBlur={handleOnBlur} value={formData.confirmPassword} label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'}/> }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            {isSignup && (<Button
              fullWidth
              variant="contained"
              onClick={clear}
            >
              Clear
            </Button>)}
            
            <Grid container justifyContent="center">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                </Button> 
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
  );
}