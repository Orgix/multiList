import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Paper } from '@mui/material';
import { styles as extStyles} from './styles';
const Subtask = ({sub}) => {
  const styles={
   "name":{
      color:'black',
      fontWeight:600,
      fontSize:'15px',
      textDecoration : sub.completed ? 'line-through' : 'none'
    }
  }
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }} style={extStyles["div"]}>
        <span style={styles["name"]}>{sub.name}</span>
        {sub.completed && <CheckIcon color="success" style={extStyles["icon"]}/>}
    </Paper>
  )
}

export default Subtask