import { mockShops } from '../data'
import { Shop } from './shop'

export class User {
  id: string;
  shop?: Shop;

  constructor (id: string, shopId: string | null) {
    this.id = id

    if (shopId !== undefined) {
      this.shop = mockShops.find((shop) => shop.id === shopId)
    }
  }

  isShopOwner (): boolean {
    return this.shop !== undefined
  }
}

export type NullableUser = User | null;
