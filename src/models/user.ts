import * as Realm from 'realm-web'

import { mockShops } from '../data'
import { Shop } from './shop'

export class User {
  id: string;
  shop?: Shop;

  constructor (id: string, shopId: string | null) {
    this.id = id

    this.shop = mockShops.find((shop) => shop.id === shopId)
  }

  static fromRealmUser (realmUser: Realm.User): User {
    return new User(realmUser.id, realmUser.customData?._shopId?.$oid)
  }

  isShopOwner (): boolean {
    return this.shop !== undefined
  }
}

export type NullableUser = User | null;
