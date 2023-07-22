import { styles } from "./styles"
import { useState } from "react";
import { Container, Typography,Divider, List, ListItem, ListItemIcon,
    ListItemText,ListItemButton, Drawer,Box,Button } from "@mui/material";

import Activity from "./Activity";


const BoldText = ({ children }) => (
  <Typography  fontWeight="bold">{children}</Typography>
);

const ActivityLog = ({activities}) => {
  const [state, setState] = useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <Container sx={{py:2}}>
            <Typography variant="h4" textAlign='center'>Activity Log</Typography>
        </Container>
        <Divider/>
        <List>
           {activities.map(activity => (
            
          <ListItem key={activity._id} sx={{position:'relative', my:2}} disablePadding>
            <Activity 
              name={activity.user} 
              mode={activity.field} 
              from={activity.from} 
              to={activity.to} 
              toggle={activity.toggleStatus}
              createdAt={activity.createdAt}/>
              {/* <ListItemIcon sx={{minWidth:'5%'}}>
                <MailIcon fontSize="small"/>
              </ListItemIcon>
              <Typography variant="body1" sx={{width:'80%'}}>{activity.text}</Typography>
              <ListItemText primary={convertToRelativeTime(activity.createdAt)} sx={{width:'20%'}}/> */}
          </ListItem>
        ))}
        </List>
    </Box>
  );

  return (
    <div style={styles.container}>
          <Button onClick={toggleDrawer('right', true)}>Activity Log</Button>
          <Drawer
            anchor='right'
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
    </div>
  );
}
export default ActivityLog