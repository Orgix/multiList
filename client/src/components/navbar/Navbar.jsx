import React,{ useState }  from 'react'

import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@emotion/react';
import {AppBar, Box, Toolbar, IconButton, Typography, 
        Menu, MenuItem, Avatar, Tooltip } 
        from '@mui/material';
import { Link } from 'react-router-dom';
import user from '../../assets/images/user.png';

const Navbar = () => {
  const theme = useTheme();
  const linkStyles={
    margin: "1rem",
    fontWeight:600,
    fontSize: "1.25rem",
    textDecoration: "none",
    color: 'white'
  }
    
    const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static' color={theme.secondary}>
        
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
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem key="key-1" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Explore</Typography>
                </MenuItem>
                <MenuItem key="key-2" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">My profile</Typography>
                </MenuItem>
                <MenuItem key="key-3" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">New Task</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
              <Box sx={{flexGrow:1, display:{xs:'none', md:'flex'}, justifyContent:'center'}}>
                    <Link to="/profile/me/tasks" style={linkStyles}>
                      Tasks
                    </Link>
                    <Link to="/explore" style={linkStyles}>
                        Explore
                    </Link>
                    <Link to="/profile/me" style={linkStyles}>
                        My Profile
                    </Link>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ px: 1 }}>
                <Avatar alt="Remy Sharp" src={user} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem key="opt-1" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">User Settings</Typography>
                </MenuItem>
                <MenuItem key="opt-2" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">My tasks</Typography>
                </MenuItem>
                <MenuItem key="opt-3" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          </Toolbar>
      </AppBar>
  )
}

export default Navbar