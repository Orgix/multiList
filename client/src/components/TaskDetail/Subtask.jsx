import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit'
import { Paper, ButtonGroup, Button, TextField, Container } from '@mui/material';
import { styles as extStyles} from './styles';
import useScreenWidth from '../../hooks/useScreenWidth';
import { useState } from 'react';

const Subtask = ({sub, mode, handleComplete, handleDelete, setTaskData}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(sub.name);
  const width = useScreenWidth()

  const handleEditClick = () => {
			setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Perform save operation or update the task in your data source (e.g., API)
    // Once the save operation is complete, update the task state with the editedTask value
    if(editedTask.trim() !== ''){
      setTaskData(prev=>({
        ...prev,
        tasks: prev.tasks.map(todo=>{
          if(todo.id === sub.id) return {...todo, name: editedTask}
          return todo
        })
      }))
      setIsEditing(false);
    }
    // Assuming the save operation is synchronous, you can update the task state immediately
    

    
  };

  const handleInputChange = (event) => {
    setEditedTask(event.target.value);
  };

  const handleDeleteClick = () =>{
    handleDelete(sub.id)
  }

  const handleCompleteClick = () =>{
    handleComplete(sub.id)
  }
  const styles={
   "name":{
      color:'black',
      fontWeight:600,
      fontSize:'15px',
      textDecoration : sub.completed ? 'line-through' : 'none'
    }
  }
  //component will be looking different in view mode
  if(mode === 'view'){
    return (
      <Paper elevation={3} sx={{ p: 3, mb: 3 }} style={extStyles["div"]}>
          <span style={styles["name"]}>{sub.name}</span>
          {sub.completed && <CheckIcon color="success" style={extStyles["icon"]}/>}
      </Paper>
    )
  } else{
    return (
      <Paper elevation={3} sx={[extStyles.taskContainer, {overflowWrap:'break-word', px:0}]}>
         {isEditing ? 
              <Container sx={extStyles.Editcontainer} disableGutters>
                        <TextField variant="outlined" sx={extStyles.input} InputProps={{ sx: { borderTopRightRadius: 0, borderBottomRightRadius:0 } }} type="text" label="Edit subtask" name="subtask" value={editedTask} onChange={handleInputChange}/>
                        <Button onClick={handleSaveClick} size="large" sx={extStyles.saveEditbtn}>Save</Button>
              </Container>
         :
         (<>
          <div style={{inlineSize:{xs:'100px',sm:'150px'}, overflowWrap:'break-word', padding:'3px'}}>
              <span style={{textDecoration: sub.completed ? 'line-through' : 'none'}}>{sub.name}</span>
            </div>
            <ButtonGroup  orientation={width < 600 ? 'vertical' : 'horizontal'} variant="contained" aria-label="outlined primary button group">
                <Button onClick={handleDeleteClick}><DeleteForeverIcon sx={{color:'red'}}/></Button>
                <Button onClick={handleEditClick}><EditIcon/></Button>
                <Button onClick={handleCompleteClick}>
                  {sub.completed ? <UndoIcon sx={{color:'white'}}/> : <CheckIcon sx={{color:'green'}}/>}
                  
                </Button>
            </ButtonGroup>
         </>)}
            
        </Paper>
    )
  }
  
}

export default Subtask