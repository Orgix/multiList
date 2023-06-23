import React from 'react'
import { Link,Button } from '@mui/material'
import { Route, Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CardButtons = ({id, auth}) => {
  const user = useSelector((state)=> state.auth.user)
  const pageLink = user?.id === auth ? `/profile/me/tasks/${id}` : `/profile/${auth}/tasks/${id}`
  const editLink = `/profile/me/tasks/${id}/edit`
  
  return (
    <>
        <Button size="small">
          <Link component={RouterLink} to={pageLink} underline="none">
            To Task
          </Link>
        </Button>
        {/* This button will render only if task is authored by the user requesting */}
        {user?.id === auth &&
        <Button size="small">
        <Link component={RouterLink} to={editLink} underline="none">
          Edit
        </Link>
      </Button>
        }
        
    </>
  )
}

export default CardButtons