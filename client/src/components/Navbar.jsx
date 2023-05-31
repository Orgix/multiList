import React,{ useState }  from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const linkStyles = {
        margin: "1rem",
        fontWeight:600,
        fontSize: "1.25rem",
        textDecoration: "none",
        color: 'white'
    }

  return (
    <AppBar position='static'>
        
          <Toolbar disableGutters>
            <ListAltSharpIcon sx={{display:{xs:'none', md:'flex'}, mr:1}}/>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr:2,
                display:{xs:'none', md: 'flex'},
                fontFamily:'monospace',
                fontWeight: 600,
                letterSpacing:'.2rem',
                color:'inherit',
                textDecoration: 'none'
              }}
            >
              Todo NET
              </Typography>
              <Box sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}>
                    <Link to="/tasks" style={linkStyles}>
                        Tasks
                    </Link>
                    <Link to="/tasks" style={linkStyles}>
                        Explore
                    </Link>
                    <Link to="/explore" style={linkStyles}>
                        My Profile
                    </Link>
              </Box>
          </Toolbar>
        
      </AppBar>
  )
}

export default Navbar