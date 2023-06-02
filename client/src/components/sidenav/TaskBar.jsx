import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {Box, Drawer, CssBaseline, Toolbar, List, 
        Typography,Divider , IconButton, ListItem,
        ListItemText,ListItemButton} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
        <AppBar position="relative" open={open} sx={{ backgroundColor: theme.palette.background.dark, color:'white'}}>
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
          <IconButton sx={{color:'white'}} onClick={handleDrawerClose}>
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



