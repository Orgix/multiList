import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {  ListItem, ListItemIcon,ListItemText,ListItemButton, Typography, Box} from "@mui/material";
import { convertToRelativeTime } from "../../../utils/time";
import { capitalizeFirstLetter } from "../../../utils/utility";
import ActivityIcon from './ActivityIcon';

const Activity = ({name, mode, from, to, toggle, createdAt}) => {
        return (
            <>
              <ListItemIcon sx={{minWidth:'5%', ml:1}}>
                <ActivityIcon mode={mode} toggle={toggle} to={to}/>
              </ListItemIcon>
              {['title','privacy','priority', 'description','subtask'].includes(mode) &&
                <Typography variant="body1" sx={{width:'80%'}}>
                    <b>{name?.username} </b> modified the <b>{mode}</b> from <b>{from}</b> to <b>{to}</b>
                </Typography>

              }
              {mode === 'toggle' && 
                <Typography variant="body1" sx={{width:'80%'}}>
                    <b>{name?.username} </b> marked subtask <b>{to}</b> as <b>{toggle ? "complete":"incomplete"}</b>
                </Typography>
              }
            {(mode === 'add' || mode ==='remove') && 
                    <Typography variant="body1" sx={{width:'80%'}}>
                        <b>{name?.username} </b> <b>{mode==='add' ? 'added' : 'removed'}</b> subtask <b>{to}</b>
                    </Typography>
              }
            {mode === 'create' && 
                <Typography variant="body1" sx={{width:'80%'}}>
                  <b>{name?.username} </b> created Task <b>{to}</b>.
                </Typography>
            }
              <ListItemText primary={convertToRelativeTime(createdAt)} sx={{width:'20%', mr:1}}/> 
              </>
          )
}

export default Activity