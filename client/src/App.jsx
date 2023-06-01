//import './App.css'
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme';

const theme  = createTheme(themeSettings)
function App() {
  
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
        <CssBaseline/>
        <Container maxWidth={false} disableGutters>
        <Navbar color="primary"/>
          <Routes>
            <Route path="/" exact element={<Navigate to="/profile/me/tasks"/>} />
            <Route path="/profile/me/tasks" exact element={<Home/>}/>
          </Routes>
        </Container>
        </BrowserRouter>
    </ThemeProvider>    
  )
}

export default App

//for accessing /profile/me/tasks , user needs to be logged in so the route access the posts.