import React from 'react'

import { Box, GridList, GridListTile, Typography, useTheme } from '@material-ui/core'
import { mockShops } from '../data'
import { ShopCard } from '.'
import { useUser } from '../contexts/UserProvider'

export default function ShopsPage () {
  const user = useUser()

  const theme = useTheme()

  if (user?.isShopOwner()) {
    const shop = user.shop!
    return (
      <React.Fragment>
        <Typography variant='h6'>My Shop</Typography>

        <Box my={theme.spacing(0.5)}></Box>

        <ShopCard shopId={shop.id} />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Typography variant='h6'>Shops</Typography>

      <Box my={theme.spacing(0.5)}></Box>

      <GridList cellHeight='auto' spacing={64} cols={3}>
        {mockShops.map(shop => <GridListTile key={shop.id}><ShopCard shopId={shop.id} /></GridListTile>)}
      </GridList>
    </React.Fragment>
  )
}
