import { styles } from "./styles"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, ButtonGroup, Paper, Grid } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import useScreenWidth from "../../../hooks/useScreenWidth";
const TodoItem = ({todo, handleComplete, handleDelete}) => {
  const width = useScreenWidth();
  const handleDeleteClick = () =>{
    handleDelete(todo.id)
  }

  const handleCompleteClick = () =>{
    handleComplete(todo.id)
  }

  return (
    <Grid item xs={12} md={6} xl={4}>
        <Paper elevation={3} sx={[styles.taskContainer, {overflowWrap:'break-word'}]}>
            <div style={{inlineSize:{xs:'100px',sm:'150px'}, overflowWrap:'break-word', padding:'3px'}}>
              <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.name}</span>
            </div>
            <ButtonGroup  orientation={width < 600 ? 'vertical' : 'horizontal'} variant="contained" aria-label="outlined primary button group">
                <Button onClick={handleDeleteClick}><DeleteForeverIcon sx={{color:'red'}}/></Button>
                <Button onClick={handleCompleteClick}>
                  {todo.completed ? <UndoIcon sx={{color:'white'}}/> : <CheckIcon sx={{color:'green'}}/>}
                  
                </Button>
            </ButtonGroup>
        </Paper>
    </Grid>
  )
}

export default TodoItem