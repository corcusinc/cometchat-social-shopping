import React from 'react'

import { AuthProvider } from './AuthProvider'
import { CometChatProvider } from './CometChatProvider'
import { RealmProvider } from './RealmProvider'
import { UserProvider } from './UserProvider'

export default function AppProviders (props: any) {
  return (
    <RealmProvider>
      <AuthProvider>
        <UserProvider>
          <CometChatProvider>
            { props.children }
          </CometChatProvider>
        </UserProvider>
      </AuthProvider>
    </RealmProvider>
  )
}
