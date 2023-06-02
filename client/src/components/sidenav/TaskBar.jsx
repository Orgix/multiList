import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {Link} from '@mui/material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: theme.palette.background.green,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function TaskBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    
<Box sx={{ display: 'flex'}}>
      <CssBaseline />
      {!open && (
        <AppBar position="relative" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My Tasks
          </Typography>
        </Toolbar>
      </AppBar>
      )}
      
      <Drawer
        sx={{
          width: { sm: "none", md: drawerWidth},
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{backgroundColor: theme.palette.background.dark}}>
          <Typography sx={{color:'white', fontWeight:700}}>
            All active Tasks
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem key="task-1" disablePadding alignItems="flex-start">
              <ListItemButton>
                <Link component={RouterLink} to="/profile/me/tasks/45869421" color="text.primary" underline="none">
                  <ListItemText primary="Task 1" color="text.primary" secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color={theme.palette.sidenav.letters}
                      >
                        Sub Tasks Completed : 3<br/>
                        Created at : 4 days ago
                      </Typography>
                    </React.Fragment>
                  }/>
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key="task-2" disablePadding alignItems="flex-start">
              <ListItemButton>
                <Link component={RouterLink} to="/profile/me/tasks/1232131312" color="text.primary" underline="none">
                  <ListItemText primary="Task 2" color="text.primary" secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color={theme.palette.sidenav.letters}
                      >
                        Sub Tasks Completed : 5<br/>
                        Created at : 2 days ago
                      </Typography>
                    </React.Fragment>
                  }/>
                </Link>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    </Box> 
  );
}


{/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
<ListItem alignItems="flex-start">
  <ListItemAvatar>
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  </ListItemAvatar>
  <ListItemText
    primary="Brunch this weekend?"
    secondary={
      <React.Fragment>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          Ali Connors
        </Typography>
        {" — I'll be in your neighborhood doing errands this…"}
      </React.Fragment>
    }
  />
</ListItem>
<Divider variant="inset" component="li" />
<ListItem alignItems="flex-start">
  <ListItemAvatar>
    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
  </ListItemAvatar>
  <ListItemText
    primary="Summer BBQ"
    secondary={
      <React.Fragment>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          to Scott, Alex, Jennifer
        </Typography>
        {" — Wish I could come, but I'm out of town this…"}
      </React.Fragment>
    }
  />
</ListItem>
<Divider variant="inset" component="li" />
<ListItem alignItems="flex-start">
  <ListItemAvatar>
    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
  </ListItemAvatar>
  <ListItemText
    primary="Oui Oui"
    secondary={
      <React.Fragment>
        <Typography
          sx={{ display: 'inline' }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          Sandra Adams
        </Typography>
        {' — Do you have Paris recommendations? Have you ever…'}
      </React.Fragment>
    }
  />
</ListItem>
</List> */}