import React, { useRef } from 'react'

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import { useAuth } from '../contexts/AuthProvider'
import { useUser } from '../contexts/UserProvider'

export default function LoginDialog (props: {open: boolean, handleClose: Function}) {
  const auth = useAuth()!
  const user = useUser()
  const emailInputRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
  const passwordInputRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef()

  const handleClose = () => props.handleClose()
  const handleLogin = async () => {
    await auth.logIn(emailInputRef.current?.value ?? '', passwordInputRef.current?.value ?? '')

    if (auth.state.status === 'success') {
      handleClose()
    }
  }

  return (
    <React.Fragment>
      <Dialog open={!user && props.open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              inputRef={emailInputRef}
            />
            <TextField
              margin='dense'
              label='Password'
              type='password'
              fullWidth
              inputRef={passwordInputRef} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} disabled={auth.state.status === 'pending'} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={auth.state.status === 'error'} autoHideDuration={3000}>
        <MuiAlert severity="error" elevation={6} variant="filled">
          {auth.state.error}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  )
}
