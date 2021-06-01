import React from 'react'
import * as Realm from 'realm-web'

import { NullableUser, User } from '../models'
import { useRealm } from './RealmProvider'

export interface AuthProviderState {
  status: 'success' | 'pending' | 'error';
  error?: string;
  user: NullableUser;
}

export interface AuthProviderData {
  state: AuthProviderState;
  logIn: (email: string, password: string) => Promise<boolean>;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthProviderData | undefined>(undefined)

export function AuthProvider (props: any) {
  const [state, setState] = React.useState<AuthProviderState>({
    status: 'pending',
    user: null
  })

  const realmApp = useRealm()!

  React.useEffect(() => {
    setState({
      status: 'success',
      user: realmApp.currentUser?.isLoggedIn
        ? User.fromRealmUser(realmApp.currentUser)
        : null
    })
  }, [])

  const logIn = async (email: string, password: string) => {
    setState({ status: 'pending', user: null })

    try {
      const user = await realmApp.logIn(Realm.Credentials.emailPassword(email, password))
      console.log(user)

      setState({
        status: 'success',
        user: User.fromRealmUser(user)
      })

      return true
    } catch (err) {
      console.log(err)
      setState({
        status: 'error',
        error: err instanceof Realm.MongoDBRealmError
          ? err.error
          : 'Could not login, please try again.',
        user: null
      })

      return false
    }
  }

  const logOut = async () => {
    await realmApp.currentUser?.logOut()
    setState({ status: 'success', user: null })
  }

  return <AuthContext.Provider value={{ state, logIn, logOut }} {...props} />
}

export const useAuth = () => React.useContext(AuthContext)
