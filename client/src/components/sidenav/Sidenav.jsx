import { Drawer, Box,Typography, IconButton, Divider} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react";

const Sidenav = () =>{
    const [open,setOpen]= useState(false)
    return(
        <>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={()=>setOpen(true)}>
            <MenuIcon/>
        </IconButton>
        <Drawer anchor='left' open={open} onClose={()=>setOpen(false)}>
            <Box p={2} width="250px" textAlign="center" role="presentation">
                <Typography variant="h6" component="div" color="primary.title">
                    Side Panel
                </Typography>
                <Divider/>
            </Box>
        </Drawer>
        </>
    )

}

export default Sidenav;