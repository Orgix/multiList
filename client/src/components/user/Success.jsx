import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme } from '@emotion/react';
import React, { useState } from 'react'

const Success = ({msg, title}) => {
    const theme = useTheme()
    //define visibility state
    const [visible, setVisible] = useState(true)
    //on close, component will be dismissed and cant be displayed again
  return (<>
    {visible && (
      <Alert onClose={() => setVisible(prev=> !prev)} severity="success" sx={{bgcolor:theme.palette.success.main, color:theme.palette.success.letters, opacity:0.75}}>
        <AlertTitle>{title}</AlertTitle>
        {msg}
      </Alert>
    )}
    </>
  )
}

export default Success