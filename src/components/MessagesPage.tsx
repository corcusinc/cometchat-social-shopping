import React from 'react'
import { Box } from '@material-ui/core'

import { CometChatUI } from '../cometchat/CometChatWorkspace/src'

export default function MessagesPage (props: {chattingWithId?: string}) {
  return (
    <Box width='100%' height='100vh'>
      <CometChatUI chatWithUser={props.chattingWithId} />
    </Box>
  )
}
