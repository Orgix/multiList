import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export default function Auth() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false)
    const [error, setError] = useState('')
    
    const handleShowPassword = () => setShowPassword((show) => !show);

    const switchMode = () => {
        setFormData(initialState);
        console.log(formData)
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(prev=> !prev);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        //if pwd !== repeatpwd , clear the form and leave an error message
        console.log(formData)
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const clear = () => {
    setFormData(initialState);
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Typography component="h1" variant="h5">
            {isSignup? 'Sign up':'Sign In'}
          </Typography>
          <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            {isSignup && (
                <>
                    <Grid item xs={12} sm={6}>
                        <Input name="firstName" value={formData.firstName} label="First Name" handleChange={handleChange} autoFocus  />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Input name="lastName" value={formData.lastName} label="Last Name" handleChange={handleChange} />
                    </Grid>
                </>
            )}
              
              <Grid item xs={12}>
                <Input name="email" value={formData.email} label="Email Address" handleChange={handleChange} type="email" />
              </Grid>
              <Grid item xs={12}>
              <Input name="password"  value={formData.password} label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />    
              </Grid>
              <Grid item xs={12}>
              {isSignup && <Input name="confirmPassword"  value={formData.confirmPassword} label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'}/> }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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