import React from 'react'

import { Header, SellersPage } from './components'
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

  return (
    <ThemeProvider theme={theme}>
      <header>
        <Header />
      </header>

      <main>
        <Container fixed={false} maxWidth={false} className={classes.root}>
          <SellersPage />
        </Container>
      </main>

      <footer>
        <Box mt={theme.spacing(0.5)} py={theme.spacing(0.5)} className={classes.footer}></Box>
      </footer>
    </ThemeProvider>
  )
}
