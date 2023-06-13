import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme } from '@emotion/react';
import React from 'react'

const Success = () => {
    const theme = useTheme()
  return (
    <Alert severity="success" sx={{bgcolor:theme.palette.success.main, color:theme.palette.success.letters, opacity:0.75}}>
        <AlertTitle>Registration Successful!</AlertTitle>
        You can now create your own task Lists! Sign In to get Started!
      </Alert>
  )
}

export default Success