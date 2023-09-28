import { Box, Typography,Link, IconButton } from '@mui/material'
import {useContext} from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { AssociateListContext } from './EditOptions';

const SearchBarResults = ({add}) => {
  const {associateList, setAssociateList} = useContext(AssociateListContext)
  const {id} = useParams();
  const search = useSelector((state)=> state.auth.search)
  console.log(search.length)
  

  return (
    <Box>
      {(search !== undefined && search.length !==0 ) && 
        <Box sx={{position:'relative', display:'flex',alignItems:'center'}}>
          <Link component={RouterLink} to={`/profile/${search.id}`} target='_blank' underline='none'>
            <Typography variant='h5' sx={{p:0,m:0}}>{search.firstName} {search.lastName}</Typography>
          </Link>
          <IconButton 
          sx={{color:'blue'}}
          onClick={()=>add(search.id)} 
                        disabled={associateList.find(associate=> associate === search.id) !== undefined}>
            <AddIcon fontSize='large'/>
          </IconButton>
        </Box>
    
      }
  </Box>
  )
    }

export default SearchBarResults