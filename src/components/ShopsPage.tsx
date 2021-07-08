import React from 'react'

import { gql, useQuery } from '@apollo/client'
import { Box, GridList, GridListTile, Typography, useTheme } from '@material-ui/core'

import { ShopCard } from '.'
import { useUser } from '../contexts/UserProvider'
import { Shop } from '../models'

function OwnerShopPage () {
  const theme = useTheme()

  const user = useUser()!

  const { loading, error, data } = useQuery(
    gql`
      query ShopQuery($id: ObjectId!) {
        shop(query: {_id: $id}) {
          _id
          owner: _ownerId { _id }
          description
          logoUrl
          name
        }
      }    
    `,
    { variables: { id: user.shopId } }
  )

  if (loading) {
    return <Typography variant='h6'>My Shop</Typography>
  }

  if (error) {
    // TODO: handle error
    console.log(error)
  }

  return (
    <React.Fragment>
      <Typography variant='h6'>My Shop</Typography>

      <Box my={theme.spacing(0.5)}></Box>

      <ShopCard shop={Shop.fromJson(data.shop)} />
    </React.Fragment>
  )
}

function CustomerShopPage () {
  const theme = useTheme()

  const { loading, error, data } = useQuery(gql`
    query {
      shops {
        _id
        owner: _ownerId { _id }
        description
        logoUrl
        name
      }
    }
  `, { fetchPolicy: 'no-cache' })

  if (loading) {
    return <Typography variant='h6'>Shops</Typography>
  }

  if (error) {
    // TODO: handle error
    console.log(error)
  }

  return (
    <React.Fragment>
      <Typography variant='h6'>Shops</Typography>

      <Box my={theme.spacing(0.5)}></Box>

      <GridList cellHeight='auto' spacing={64} cols={3}>
        {
          data.shops.map((shopJson: any) => {
            const shop = Shop.fromJson(shopJson)
            return <GridListTile key={shop.id}><ShopCard shop={shop} /></GridListTile>
          })
        }
      </GridList>
    </React.Fragment>
  )
}

export default function ShopsPage () {
  const user = useUser()

  return user?.isShopOwner()
    ? <OwnerShopPage />
    : <CustomerShopPage />
}
