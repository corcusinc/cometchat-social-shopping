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

function HeaderButtons (props: {user: NullableUser, handleLogoutClick: Function, setActivePage: Function}) {
  if (!props.user) {
    return <Button>Login</Button>
  }

  return <React.Fragment>
    <Button onClick={() => props.setActivePage('shops')}>{props.user.isShopOwner() ? 'My Shop' : 'Shops'}</Button>
    <Button onClick={() => props.setActivePage('messages')}>Messages</Button>
    <Button onClick={() => props.handleLogoutClick()}>Logout</Button>
  </React.Fragment>
}

export default function Header (props: {setActivePage: Function}) {
  const auth = useAuth()!
  const user = useUser()
  const classes = useStyles()

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>Sosho Shop</Typography>

          <HeaderButtons user={user} handleLogoutClick={auth.logOut} setActivePage={props.setActivePage} />
        </Toolbar>
      </AppBar >

      {/* https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </React.Fragment>
  )
}
