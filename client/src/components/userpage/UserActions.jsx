import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ViewRequests from './ViewRequests';
import UserSettings from './UserSettings';
import CustomTabPanel from './CustomTabPanel';

const UserActions = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex',justifyContent:'center' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Requests"/>
          <Tab label="User Settings"/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ViewRequests/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserSettings/>
      </CustomTabPanel>
    </Box>
  );
}

export default UserActions;