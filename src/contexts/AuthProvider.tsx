import React from 'react'

import { NullableUser } from '../models'

export interface AuthProviderState {
  status: string;
  error?: string;
  user: NullableUser;
}

export interface AuthProviderData {
  state: AuthProviderState;
  logIn: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logOut: () => void;
}

// TODO: get from localStorage
const getUser = () =>
  new Promise(resolve => setTimeout(resolve, 200))
    .then<NullableUser>(() => (null))

const AuthContext = React.createContext<AuthProviderData | undefined>(undefined)

export function AuthProvider (props: any) {
  // TODO: get token from localStorage if it exists
  const [state, setState] = React.useState<AuthProviderState>({
    status: 'pending',
    user: null
  })

  React.useEffect(() => {
    getUser().then(
      user => setState({ status: 'success', user }),
      error => setState({ status: 'error', error, user: null })
    )
  }, [])

  const logIn = async (email: string, password: string) => {
    setState({ status: 'pending', user: null })

    // TODO: implement login
    await new Promise(resolve => setTimeout(resolve, 200))

    if (email?.length > 0 && password?.length > 0) {
      console.log(`Logging in user ${email}`)
      setState({
        status: 'success',
        user: { id: 0 }
      })
      return true
    } else {
      setState({
        status: 'error',
        error: 'Invalid email/password combination',
        user: null
      })
      return false
    }
  }

  const register = async (email: string, password: string) => {
    // TODO: implement register

    await new Promise(resolve => setTimeout(resolve, 200))

    return ''
  }

  const logOut = () => {
    // TODO: clear local storage
    setState({ status: 'success', user: null })
  }

  return <AuthContext.Provider value={{ state, logIn, register, logOut }} {...props} />
}

export const useAuth = () => React.useContext(AuthContext)
