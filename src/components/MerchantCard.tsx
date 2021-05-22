import React from 'react'

import { Button, Card, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import { mockMerchants } from '../data/'

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

export default function MerchantCard (props: {merchantId: number}) {
  const classes = useStyles()

  const merchant = mockMerchants.find(m => m.id === props.merchantId)
  if (merchant === undefined) {
    return <React.Fragment />
  }

  return <Card variant="outlined" className={classes.root}>
    <CardMedia
      component="img"
      alt={merchant.name}
      height="auto"
      image={merchant.logoUrl}
      title={merchant.name}
      className={classes.media}
    />

    <CardContent>
      <Typography variant='subtitle2' color='textSecondary' gutterBottom>{merchant.name}</Typography>

      <Typography variant="body2" color="textPrimary" component="p">{merchant.description}</Typography>
    </CardContent>

    <CardActions className={classes.actions}>
      <Button size='small' className={classes.button}>MESSAGE SELLER</Button>
    </CardActions>
  </Card>
}
