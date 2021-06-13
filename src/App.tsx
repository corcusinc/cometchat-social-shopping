import React, { useState } from 'react'

import { Box, Container, ThemeProvider } from '@material-ui/core'
import { createMuiTheme, makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Header, ShopsPage, LoginDialog, MessagesPage } from './components'
import { useUser } from './contexts/UserProvider'

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
  const [activePage, setActivePage] = useState<'shops' | 'messages'>('shops')
  const [chattingWithId, setChattingWithId] = useState<string | undefined>()
  const user = useUser()
  const classes = useStyles()

  const handleChangePage = (page: 'shops' | 'messages') => {
    setChattingWithId(undefined)
    setActivePage(page)
  }

  const handleMessageSeller = (shopOwnerId: string) => {
    setChattingWithId(shopOwnerId)
    setActivePage('messages')
  }

  return (
    <ThemeProvider theme={theme}>
      <header>
        <Header setActivePage={handleChangePage} />
      </header>

      <main>
        <Container fixed={false} maxWidth={false} className={classes.root}>
          {
            user
              ? activePage === 'shops'
                ? <ShopsPage handleMessageSeller={handleMessageSeller} />
                : <MessagesPage chattingWithId={chattingWithId} />
              : <Box height="100vh" />
          }
        </Container>
      </main>

      <footer>
        <Box mt={theme.spacing(0.5)} py={theme.spacing(0.5)} className={classes.footer}></Box>
      </footer>

      <LoginDialog open={!user} />
    </ThemeProvider>
  )
}
