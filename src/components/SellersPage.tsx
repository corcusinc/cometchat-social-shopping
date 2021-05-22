import React from 'react'

import { Box, GridList, GridListTile, Typography, useTheme } from '@material-ui/core'
import { mockMerchants } from '../data'
import { MerchantCard } from '.'

export default function SellersPage () {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Typography variant='h6'>Sellers</Typography>

      <Box my={theme.spacing(0.5)}></Box>

      <GridList cellHeight='auto' spacing={64} cols={3}>
        {mockMerchants.map(m => <GridListTile key={m.id}><MerchantCard merchantId={m.id} /></GridListTile>)}
      </GridList>
    </React.Fragment>
  )
}
