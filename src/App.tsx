import React, { useState } from 'react'

import { Header, SellersPage, LoginDialog } from './components'
import { Box, Container, ThemeProvider } from '@material-ui/core'
import { createMuiTheme, makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8DBC2A'
    },
    background: {
      paper: '#f4f4f4'
    },
    text: {
      secondary: '#3a6d82'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      color: '#383838',
      fontSize: '1.125rem',
      fontWeight: 'normal'
    }
  }
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(4)
    },
    footer: {
      backgroundColor: 'black'
    }
  })
)

export default function App () {
  const classes = useStyles()

  const [loginPopupOpen, setLoginPopupOpen] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async (email: string, password: string, setError: Function) => {
    setIsLoggingIn(true)

    // TODO: add auth logic
    await new Promise(resolve => setTimeout(resolve, 200))

    if (email?.length > 0 && password?.length > 0) {
      console.log(`Logging in user ${email}`)
      setLoginPopupOpen(false)
      setError('')
    } else {
      setError('Invalid email/password combination')
    }

    setIsLoggingIn(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <header>
        <Header handleLoginClick={() => setLoginPopupOpen(true)}/>
      </header>

      <main>
        <Container fixed={false} maxWidth={false} className={classes.root}>
          <SellersPage />
        </Container>
      </main>

      <footer>
        <Box mt={theme.spacing(0.5)} py={theme.spacing(0.5)} className={classes.footer}></Box>
      </footer>

      <LoginDialog open={loginPopupOpen} isLoggingIn={isLoggingIn} handleClose={() => setLoginPopupOpen(false)} handleLogin={handleLogin} />
    </ThemeProvider>
  )
}
