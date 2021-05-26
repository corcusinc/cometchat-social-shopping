import React from 'react'

import { AuthProvider } from './AuthProvider'
import { UserProvider } from './UserProvider'

export default function AppProviders (props: any) {
  return (
    <AuthProvider>
      <UserProvider>
      { props.children }
      </UserProvider>
    </AuthProvider>
  )
}
