import { Box } from '@material-ui/core'
import React from 'react'
import './styles.css'

const Loading = () => {
  return (
    <Box display="flex" height="100vh">
      <Box m="auto">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Box>
    </Box>
  )
}

// Normally would use CircularProgress but for some reason it was laggy

export default Loading
