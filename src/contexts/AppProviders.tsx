import React from 'react'

import { AuthProvider } from './AuthProvider'
import { RealmProvider } from './RealmProvider'
import { UserProvider } from './UserProvider'

export default function AppProviders (props: any) {
  return (
    <RealmProvider>
      <AuthProvider>
        <UserProvider>
          { props.children }
        </UserProvider>
      </AuthProvider>
    </RealmProvider>
  )
}
