import React, { useEffect, useState } from 'react'
import { CometChat } from '@cometchat-pro/chat'

import { useUser } from './UserProvider'
import { User } from '../models'

const COMETCHAT_REGION = 'us'
const COMETCHAT_APP_ID = '<COMETCHAT_APP_ID>'
const COMETCHAT_AUTH_KEY = '<COMETCHAT_AUTH_KEY>'

const appSettings = new CometChat
  .AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(COMETCHAT_REGION)
  .build()

async function logIn (user: User) {
  try {
    const cometChatUser = await CometChat.login(user.id, COMETCHAT_AUTH_KEY)
    console.log('Login Successful:', { cometChatUser })
  } catch (err) {
    console.log('Login failed with exception:', { err })
  }
}

async function init () {
  try {
    await CometChat.init(COMETCHAT_APP_ID, appSettings)
    console.log('Initialization completed successfully')
  } catch (err) {
    console.log('CometChat Initialization failed with error:', err)
  }
}

export function CometChatProvider (props: any) {
  const [isInitializing, setIsInitializing] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const user = useUser()

  useEffect(() => {
    if (isInitializing || isLoggingIn) {
      return
    }

    if (CometChat.isInitialized()) {
      if (user) {
        setIsLoggingIn(true)
        logIn(user).then(() => setIsLoggingIn(false))
      } else if (CometChat.getLoggedinUser() !== null) {
        CometChat.logout()
      }
    } else {
      setIsInitializing(true)
      init().then(() => setIsInitializing(false))
    }
  }, [isInitializing, user])

  return (
    <React.Fragment {...props} />
  )
}
