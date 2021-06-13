import * as Realm from 'realm-web'

export class User {
  id: string;
  name: string;
  shopId?: string;

  constructor (id: string, name: string, shopId?: string) {
    this.id = id
    this.name = name
    this.shopId = shopId
  }

  static fromRealmUser (realmUser: Realm.User): User {
    return new User(realmUser.customData._id, realmUser.customData.name, realmUser.customData._shopId?.$oid)
  }

  isShopOwner (): boolean {
    return this.shopId !== undefined
  }
}

export type NullableUser = User | null;
