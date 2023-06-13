import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme } from '@emotion/react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Error = ({msg}) => {
    const theme= useTheme()
  return (
    <Alert icon={<ErrorOutlineIcon sx={{color:'white'}}/>} sx={{bgcolor:theme.palette.error.light, color:'white', }}>
        <AlertTitle>Error during processing:</AlertTitle>
        {msg}
    </Alert>
  )
}

export default Error