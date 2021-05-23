import React, { useRef, useState } from 'react'

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

export default function LoginDialog (props: {open: boolean, isLoggingIn: boolean, handleClose: Function, handleLogin: Function}) {
  const emailInputRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
  const passwordInputRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const handleClose = () => props.handleClose()
  const handleLogin = () => props.handleLogin(
    emailInputRef.current?.value ?? '',
    passwordInputRef.current?.value ?? '',
    setLoginErrorMessage
  )

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off" onSubmit={handleLogin}>
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
            <input type="submit" hidden />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} disabled={props.isLoggingIn} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={loginErrorMessage !== ''} autoHideDuration={3000} onClose={() => setLoginErrorMessage('')}>
        <MuiAlert severity="error" elevation={6} variant="filled">
          {loginErrorMessage}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  )
}
