//import './App.css'
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import EditTask from './components/TaskDetail/EditTask';
import TaskDetails from './components/TaskDetail/TaskDetails';
import SignInForm from './components/user/SignInForm';
import SignUpForm from './components/user/SignUpForm';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme';
import TaskLayout from './components/TaskLayout';

const theme  = createTheme(themeSettings)
function App() {
  
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
        <CssBaseline/>
        <Container maxWidth={false} disableGutters>
        <Navbar color="primary"/>
          <Routes>
            <Route  index element={<Navigate to="/profile/me/tasks"/>} />
            
            <Route path="profile/me">
              <Route path="tasks">
                <Route index element={<Home/>}/>

                <Route path=":id" element={<TaskLayout/>}>
                  <Route index element={<TaskDetails/>}/>
                  <Route path="edit" element={<EditTask/>}/>
                </Route>
              </Route>
            </Route>
            
            <Route path="auth">
              <Route path="signin" element={<SignInForm/>}/>
              <Route path="signup" element={<SignUpForm />}/>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
        </BrowserRouter>
    </ThemeProvider>    
  )
}

export default App

//for accessing /profile/me/tasks , user needs to be logged in so the route access the posts.