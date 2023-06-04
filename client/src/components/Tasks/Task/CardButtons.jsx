import React from 'react'
import { Link,Button } from '@mui/material'
import { Route, Link as RouterLink } from 'react-router-dom'

const CardButtons = ({id}) => {
  const pageLink = `/profile/me/tasks/${id}`
  const editLink = `/profile/me/tasks/${id}/edit`
  return (
    <>
        <Button size="small">
          <Link component={RouterLink} to={pageLink} underline="none">
            To Tasks
          </Link>
        </Button>
        {/* This button will render only if task is authored by the user requesting */}
        <Button size="small">
          <Link component={RouterLink} to={editLink} underline="none">
            Edit
          </Link>
        </Button>
    </>
  )
}

export default CardButtons