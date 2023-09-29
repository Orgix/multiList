import { Box, Typography,Link, IconButton } from '@mui/material'
import {useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink, useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { AssociateListContext } from './EditOptions';
import { clearSearch } from '../../../services/state/authSlice';

const SearchBarResults = ({add}) => {
  const dispatch = useDispatch()
  const {associateList, setAssociateList} = useContext(AssociateListContext)
  const {id} = useParams();
  const search = useSelector((state)=> state.auth.search)
  console.log(search.length)
  
 const clear = () => {
  dispatch(clearSearch())
 }
  return (
    <Box>
      {(search !== undefined && search.length !==0 ) && 
        <Box sx={{position:'relative', display:'flex',alignItems:'center'}}>
          <Link component={RouterLink} to={`/profile/${search.id}`} target='_blank' underline='none'>
            <Typography variant='h5' sx={{p:0,m:0}}>{search.firstName} {search.lastName}</Typography>
          </Link>
          <IconButton 
          sx={{color:'blue'}}
          onClick={()=>add({id: search.id, firstName: search.firstName, lastName:search.lastName})} 
                        disabled={associateList.find(associate=> associate.id === search.id) !== undefined}>
            <AddIcon fontSize='large'/>
          </IconButton>
          <IconButton onClick={()=>clear()}>
            <CloseIcon sx={{color:'red'}}/>
          </IconButton>
        </Box>
    
      }
  </Box>
  )
    }

export default SearchBarResults