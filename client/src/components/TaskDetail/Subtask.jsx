import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Paper } from '@mui/material';
const Subtask = ({sub}) => {
  const styles={
   "div":{
    display:'flex', 
    justifyContent:'space-between',
    alignItems:'center',
    height:'50px'
   },
   "name":{
    color:'black',
    fontWeight:600,
    fontSize:'15px',
    },
   "icon":{
        fontSize:'26px'
    }
  }
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }} style={styles["div"]}>
        <span style={styles["name"]}>{sub.name}</span>
        {sub.completed && <CheckIcon color="success" style={styles["icon"]}/>}
    </Paper>
  )
}

export default Subtask