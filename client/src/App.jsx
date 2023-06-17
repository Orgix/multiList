//import './App.css'
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import EditTask from './components/TaskDetail/EditTask';
import TaskDetails from './components/TaskDetail/TaskDetails';
import Auth from './components/user/Auth';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme';
import TaskLayout from './components/TaskLayout';
import NewTask from './components/Tasks/NewTask/NewTask';
import Profile from './components/userpage/Profile';
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
              <Route index element={<Profile/>}/>
              <Route path="tasks">
                {/* home route */}
                <Route index element={<Home/>}/>
                {/* create a task route. Needs to be protected */}
                <Route path="new" element={<NewTask/>}/>

                {/* single task  route */}
                <Route path=":id" element={<TaskLayout/>}>
                  <Route index element={<TaskDetails/>}/>
                  {/* edit single task route. needs to be protected */}
                  <Route path="edit" element={<EditTask/>}/>
                </Route>
              </Route>
            </Route>
            {/* sign up / sign in  route in case there's a logged in user, redirect*/}
            <Route path="auth" element={<Auth/>} />
            {/* wildcard route  in case no matches for the routes redirect*/}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
        </BrowserRouter>
    </ThemeProvider>    
  )
}

export default App

//for accessing /profile/me/tasks , user needs to be logged in so the route access the posts.