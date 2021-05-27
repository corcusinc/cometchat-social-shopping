import React from 'react'

import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import { mockShops } from '../data/'
import { useUser } from '../contexts/UserProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent'
  },
  media: {
    aspectRatio: '4 / 3'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  button: {
    color: theme.palette.primary.main
  }
}))

export default function ShopCard (props: {shopId: string}) {
  const user = useUser()

  const classes = useStyles()

  const shop = mockShops.find(shop => shop.id === props.shopId)
  if (shop === undefined) {
    return <React.Fragment />
  }

  return <Card variant="outlined" className={classes.root}>
    <CardMedia
      component="img"
      alt={shop.name}
      height="auto"
      image={shop.logoUrl}
      title={shop.name}
      className={classes.media}
    />

    <CardContent>
      <Typography variant='subtitle2' color='textSecondary' gutterBottom>{shop.name}</Typography>

      <Typography variant="body2" color="textPrimary" component="p">{shop.description}</Typography>
    </CardContent>

    {
      user?.isShopOwner()
        ? <React.Fragment />
        : <CardActions className={classes.actions} hidden={user?.isShopOwner()}>
            <Button size='small' className={classes.button}>MESSAGE SELLER</Button>
          </CardActions>
    }
  </Card>
}
