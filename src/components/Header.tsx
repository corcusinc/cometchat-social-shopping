import React from 'react'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useAuth } from '../contexts/AuthProvider'
import { useUser } from '../contexts/UserProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#FFF'
  },
  title: {
    flexGrow: 1,
    color: theme.palette.primary.main
  }
}))

export default function Header (props: {handleLoginClick: Function}) {
  const auth = useAuth()!
  const user = useUser()
  const classes = useStyles()

  const onLoginClick = () => props.handleLoginClick()

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Sosho Shop</Typography>

          <Button>Shops</Button>
          <Button>Messages</Button>
          {
            user
              ? <Button onClick={auth.logOut}>Logout</Button>
              : <Button onClick={onLoginClick}>Login</Button>
          }
        </Toolbar>
      </AppBar >

      {/* https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </React.Fragment>
  )
}
