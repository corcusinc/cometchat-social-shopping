import React from 'react'

import { NullableUser, User } from '../models'

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

const mockCustomer = {
  email: 'customer1@email.com',
  password: 'password',

  id: 'customer1'
}

const mockShopOwner = {
  email: 'owner1@email.com',
  password: 'password',

  id: 'owner1',
  shopId: 'shop1'
}

export function AuthProvider (props: any) {
  const [state, setState] = React.useState<AuthProviderState>({
    status: 'pending',
    user: null
  })

  React.useEffect(() => {
    const userId = localStorage.getItem('userId')

    setState({
      status: 'success',
      user: userId
        ? new User(userId, localStorage.getItem('shopId'))
        : null
    })
  }, [])

  const logIn = async (email: string, password: string) => {
    setState({ status: 'pending', user: null })

    if (email === mockCustomer.email && password === mockCustomer.password) {
      localStorage.setItem('userId', mockCustomer.id)

      setState({
        status: 'success',
        user: new User(mockCustomer.id, null)
      })

      return true
    }

    if (email === mockShopOwner.email && password === mockShopOwner.password) {
      localStorage.setItem('userId', mockShopOwner.id)
      localStorage.setItem('shopId', mockShopOwner.shopId)

      setState({
        status: 'success',
        user: new User(mockShopOwner.id, mockShopOwner.shopId)
      })

      return true
    }

    setState({
      status: 'error',
      error: 'Invalid email/password',
      user: null
    })

    return false
  }

  const logOut = async () => {
    localStorage.clear()
    setState({ status: 'success', user: null })
  }

  return <AuthContext.Provider value={{ state, logIn, logOut }} {...props} />
}

export const useAuth = () => React.useContext(AuthContext)
