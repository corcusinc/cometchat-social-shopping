import React, { useRef, useState } from 'react'

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, makeStyles, createStyles } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import { useAuth } from '../contexts/AuthProvider'

const useStyles = makeStyles(() =>
  createStyles({
    dialogActions: {
      justifyContent: 'center'
    }
  })
)

export default function LoginDialog (props: {open: boolean}) {
  const auth = useAuth()!
  const emailInputRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
  const passwordInputRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef()
  const [showError, setShowError] = useState(false)

  const styles = useStyles()

  const handleLogin = async () => {
    const success = await auth.logIn(emailInputRef.current?.value ?? '', passwordInputRef.current?.value ?? '')

    setShowError(!success)
  }

  return (
    <React.Fragment>
      <Dialog open={props.open}>
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
        <DialogActions className={styles.dialogActions}>
          <Button onClick={handleLogin} disabled={auth.state.status === 'pending'} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={showError} autoHideDuration={3000} onClose={() => setShowError(false)}>
        <MuiAlert severity="error" elevation={6} variant="filled">
          {auth.state.error}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  )
}
