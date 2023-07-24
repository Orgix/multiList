import TitleIcon from '@mui/icons-material/Title';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DescriptionIcon from '@mui/icons-material/Description';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneIcon from '@mui/icons-material/Done';
import RuleIcon from '@mui/icons-material/Rule';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ActivityIcon = ({mode, toggle, to}) => {
    switch(mode){
        case 'title':
            return <TitleIcon fontSize="small"/>
        case 'privacy':
            return to === 'Private' ? <LockIcon fontSize="small"/> : <LockOpenIcon fontSize="small"/>
        case 'description':  
            return <DescriptionIcon fontSize="small"/>  
        case 'priority':
            return <PriorityHighIcon fontSize="small"/>
        case 'subtask':
            return <DriveFileRenameOutlineIcon fontSize="small"/>
        case 'toggle':
            return toggle ? <DoneIcon fontSize="small"/> :  <RuleIcon fontSize="small"/>
        case 'add':
            return <AddIcon fontSize="small"/>
        case 'remove':
            return <DeleteIcon fontSize="small"/>
        case 'create':
            return <AssignmentIcon fontSize="small"/>
        default:     
            return <MailIcon fontSize="small"/>     
    }
}

export default ActivityIcon