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
import UserTasks from './components/Tasks/UserTasks';
import Landing from './components/home/Landing';
import { useSelector } from 'react-redux';

const theme  = createTheme(themeSettings)

function App() {
  const user = useSelector((state)=> state.auth.user)
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
        <CssBaseline/>
        <Container maxWidth={false} disableGutters>
        <Navbar color="primary"/>
          <Routes>
            <Route  index element={<Landing/>} />
            <Route path="/explore" element={<Home/>}/>
            <Route path="profile/me">
              <Route index element={user ? <Profile/> : <Navigate to="/profile/me/tasks"/>}/>
              <Route path="tasks">
                {/* home route */}
                <Route index element={<UserTasks/>}/>
                {/* create a task route. Needs to be protected */}
                <Route path="new" element={user ? <NewTask/> : <Navigate to=".."/>}/>

                {/* single task  route */}
                <Route path=":id" element={<TaskLayout/>}>
                  {/* Part of the functionalities here are to be protected. A viewer needs to be readonly whilst the author/authors have different accesss*/}
                  <Route index element={<TaskDetails/>}/>
                  {/* edit single task route. needs to be protected. Needs a useEffect inside the Component that confirms if the user matches*/}
                  <Route path="edit" element={<EditTask/>}/>
                </Route>
              </Route>
            </Route>
            {/* sign up / sign in  route in case there's a logged in user, redirect. DONE with useEffect inside the component*/}
            <Route path="auth" element={<Auth/>}/>
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