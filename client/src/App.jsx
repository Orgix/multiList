//import './App.css'
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/home/Home';
import { Container, CssBaseline } from '@mui/material';
function App() {
  
  return (
    <BrowserRouter>
    <CssBaseline/>
    <Container maxWidth={false} disableGutters>
    <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate to="/tasks"/>} />
        <Route path="/tasks" exact element={<Home/>}/>
      </Routes>
    </Container>
    </BrowserRouter>
      
  )
}

export default App
