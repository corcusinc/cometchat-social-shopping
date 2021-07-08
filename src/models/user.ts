import * as Realm from 'realm-web'

export class User {
  id: string;
  shopId?: string;

  constructor (id: string, shopId?: string) {
    this.id = id
    this.shopId = shopId
  }

  static fromRealmUser (realmUser: Realm.User): User {
    return new User(realmUser.id, realmUser.customData?._shopId?.$oid)
  }

  isShopOwner (): boolean {
    return this.shopId !== undefined
  }
}

export type NullableUser = User | null;
