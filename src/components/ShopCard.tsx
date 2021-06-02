import React from 'react'

import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'

import { useUser } from '../contexts/UserProvider'
import { Shop } from '../models'

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

export default function ShopCard (props: {shop: Shop}) {
  const user = useUser()

  const classes = useStyles()

  return <Card variant="outlined" className={classes.root}>
    <CardMedia
      component="img"
      alt={props.shop.name}
      height="auto"
      image={props.shop.logoUrl}
      title={props.shop.name}
      className={classes.media}
    />

    <CardContent>
      <Typography variant='subtitle2' color='textSecondary' gutterBottom>{props.shop.name}</Typography>

      <Typography variant="body2" color="textPrimary" component="p">{props.shop.description}</Typography>
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
