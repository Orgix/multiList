import { IconButton, Tooltip } from '@mui/material'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import GradeIcon from '@mui/icons-material/Grade';
import {useDispatch, useSelector} from 'react-redux'
import { toggleFavorite } from '../../services/actions/auth';

const Favorite = ({id}) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth.user)
  const isFavorite = user?.favorites.find(favorite => favorite === id) !== undefined
 

  const toggleFavorites = () => {
    dispatch(toggleFavorite({id: id, favorite: isFavorite}))  
  }
   
  

  return (
    <Tooltip arrow title={isFavorite ? "Remove from favorites." : "Add to favorites."} placement="right-start">
        <IconButton sx={{position:'absolute', top:'5px', right:'5px'}} onClick={toggleFavorites}>
            {isFavorite ? <GradeIcon size="large" sx={{color:'orange'}}/> : <StarOutlineIcon size="large" sx={{color:'orange'}}/>}
        </IconButton>
    </Tooltip>
  )
}

export default Favorite