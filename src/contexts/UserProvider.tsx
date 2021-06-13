import React from 'react'

import { NullableUser } from '../models'
import { useAuth } from './AuthProvider'

const UserContext = React.createContext<NullableUser>(null)

export function UserProvider (props: any) {
  return <UserContext.Provider value={useAuth()!.state.user} {...props} />
}

export const useUser = () => React.useContext(UserContext)
