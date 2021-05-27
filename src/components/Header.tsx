import React from 'react'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useAuth } from '../contexts/AuthProvider'
import { useUser } from '../contexts/UserProvider'
import { NullableUser } from '../models'

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

function HeaderButtons (props: {user: NullableUser, handleLogoutClick: Function}) {
  if (!props.user) {
    return <Button>Login</Button>
  }

  if (props.user.isShopOwner()) {
    return <React.Fragment>
      <Button>My Shop</Button>
      <Button>Messages</Button>
      <Button onClick={() => props.handleLogoutClick()}>Logout</Button>
    </React.Fragment>
  }

  return <React.Fragment>
    <Button>Shops</Button>
    <Button>Messages</Button>
    <Button onClick={() => props.handleLogoutClick()}>Logout</Button>
  </React.Fragment>
}

export default function Header () {
  const auth = useAuth()!
  const user = useUser()
  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Sosho Shop</Typography>

          <HeaderButtons user={user} handleLogoutClick={auth.logOut} />
        </Toolbar>
      </AppBar >

      {/* https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </React.Fragment>
  )
}
