import {useState} from 'react'
import { Box, InputAdornment, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch } from 'react-redux'
import { searchUser } from '../../../services/actions/auth'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () =>{
        if(searchTerm.length === 24){//24 is the length of the user ids
            dispatch(searchUser(searchTerm))
            setSearchTerm('')
        }
    }

  return (
    <Box sx={{pt:1}}>
      <TextField
        id="search"
        type="search"
        label="Search user ID:"
        value={searchTerm}
        onChange={handleChange}
        sx={{width:'100%'}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon onClick={handleSearch} sx={{cursor:'pointer'}}/>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

export default SearchBar