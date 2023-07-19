import { styles } from "./styles"
import { useState } from "react";
import { Container, Typography,Divider, List, ListItem, ListItemIcon,
    ListItemText,ListItemButton, Drawer,Box,Button } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Activity = () => {
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
        {['User31238 changed title from titleroo to titling status', 'User31238 completed subtask \'Titling o2o\'', 'User123123 changed scope to Private'].map((text, index) => (
          <ListItem key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
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
export default Activity