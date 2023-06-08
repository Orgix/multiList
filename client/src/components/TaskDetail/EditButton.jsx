import {useState} from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

const HoverableEditButton = ({text, type,fontSize, path}) => {
    
   const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };

   const handleMouseLeave = () => {
      setIsHover(false);
   };
   const styles={
    fontSize:{fontSize},
    padding:'5px',
    borderRadius:'5px',
    backgroundColor: isHover ? '#5dbede' : 'none',
    color: isHover ? 'white' : '#5dbede'
}
  return (
    <Link onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} variant={type} component={RouterLink} sx={styles} to={path} underline='none'>
        {text}
    </Link>
  )
}

export default HoverableEditButton