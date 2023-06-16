import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme } from '@emotion/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';

const Error = ({msg}) => {
    const theme= useTheme()
    const [visible, setVisible] = useState(true)
  return (
    <>
    {visible && (<Alert onClose={()=> setVisible(prev=> !prev)}icon={<ErrorOutlineIcon sx={{color:'white'}}/>} sx={{bgcolor:theme.palette.error.light, color:'white', }}>
        <AlertTitle>Error</AlertTitle>
        {msg}
    </Alert>)}
    
    </>
  )
}

export default Error