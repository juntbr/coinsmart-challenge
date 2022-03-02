import React, { FC } from 'react'
import logo from '@assets/logo192.png'
import { Box, Button, Typography } from '@material-ui/core'
import useStyles from './styles'

interface LoginPros {
  Auth: () => void
}

const Login: FC<LoginPros> = ({ Auth }) => {
  const classes = useStyles()

  return (
    <Box
      className={classes.container}
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      p={2}
    >
      <Box
        className={classes.box}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={5}
        borderRadius="10px"
        boxShadow={5}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          maxWidth="400px"
          height="250px"
        >
          <Box className={classes.imageShadow} boxShadow={2}>
            <img className={classes.image} src={logo} alt="" />
          </Box>
          <Typography className={classes.title}>Welcome to APP</Typography>
          <Button variant="contained" color="primary" onClick={Auth} fullWidth>
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
