import { useEffect, useState }  from 'react'
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@emotion/react';
import {AppBar, Box, Toolbar, IconButton, Typography, 
        Menu, MenuItem, Avatar, Tooltip, Divider, Button,Link, Container } from '@mui/material';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import userImage from '../../assets/images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import {linkStyles} from './styles'
import { signout,fetchRequests } from '../../services/actions/auth';


const Navbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  let user = useSelector((state) => state.auth.user)
  let requestsLen;
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 
  const handleLogout = () =>{
    console.log('logout')
    dispatch(signout())
    navigate('/explore')
  }

  useEffect(()=>{
    let intervalId, friendLen;

    // Check if there's a logged-in user
    if (user) {
      requestsLen = user.requests.length;
      friendLen = user.friends.length;
      // Set up an interval to periodically fetch new requests
      intervalId = setInterval(() => {
        dispatch(fetchRequests({friends: friendLen, requests: requestsLen}))
      }, 15000); // Fetch every 15seconds
    }

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [dispatch, user])

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
                  <Typography textAlign="center">
                    <Link component={RouterLink} to="/explore" underline="none">
                      Explore
                    </Link>
                  </Typography>
                </MenuItem>
                {user && 
                <MenuItem key="key-3" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link component={RouterLink} to="/profile/me/tasks" underline="none">
                      My Tasks
                    </Link>
                  </Typography>
                </MenuItem>}
                {user && 
                  <MenuItem key="key-2" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link component={RouterLink} to="/profile/me/" underline="none">
                      My profile
                    </Link>
                  </Typography>
                </MenuItem>}
                {user &&
                <MenuItem key="key-4" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link component={RouterLink} to="/profile/me/tasks/new" underline="none">
                      New Task
                    </Link>
                  </Typography>
                </MenuItem>
                }
              
              
            </Menu>
          </Box>
              <Box sx={{flexGrow:1, display:{xs:'none', md:'flex'}, justifyContent:'center'}}>
                  <Link component={RouterLink} to="/explore" style={linkStyles}>
                        Explore
                    </Link>
              {user && <>
                    <Link component={RouterLink} to={`profile/me/tasks`} style={linkStyles}>
                      My Tasks
                    </Link>
                    
                    <Link component={RouterLink} to={`profile/me`} style={linkStyles}>
                        My Profile
                    </Link>
                      <Link component={RouterLink} to={`/profile/me/tasks/new`} style={linkStyles}>
                        New Task
                    </Link>
                    </>}
                    
              </Box>
             {!user ? <Box sx={{flexGrow:0}}>
                <Button variant="contained" href="/auth" color="inherit" sx={{mx:1,display:{xs:'none', sm:'block'}}}>
                  Sign In
                </Button>
              </Box>
                  : <>
                  <Box sx={{flexGrow:0, display:{xs:'none', sm:'block'}}}>
                    <Typography variant="subtitle1" sx={{fontWeight:700, color:'white', fontSize:'1.1em'}}>{`${user.firstName} ${user.lastName}`}</Typography>
                  </Box>
                  <Box sx={{ flexGrow: 0}}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ px: 1 }}>
                      <Avatar alt="user Image" src={userImage} />
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
                  <Container sx={{display:{xs:'block', sm:'none'}}}>
                  <Typography sx={{fontWeight:800}} textAlign="center">{`${user.firstName} ${user.lastName}`}</Typography>
                    <Divider/>
                  </Container>
                    
                    <MenuItem key="opt-1" onClick={handleCloseUserMenu}>
                      <Link component={RouterLink} to='/profile/me/edit' underline='none' color='inherit'>
                        <Typography textAlign="center">Actions</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem key="opt-2" onClick={handleCloseUserMenu}>
                      <Link component={RouterLink} to='/profile/me/tasks/' underline='none' color='inherit'>
                        <Typography textAlign="center">My tasks</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem key="opt-3" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                    </MenuItem>
                  
                </Menu>
              </Box> 
              </>}
          </Toolbar>
      </AppBar>
  )
}

export default Navbar