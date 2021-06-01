import React from 'react'
import * as Realm from 'realm-web'

const RealmContext = React.createContext<Realm.App | undefined>(undefined)

const REALM_APP_ID = process.env.REACT_APP_SOSHO_SHOP_REALM_APP_ID!

export function RealmProvider (props: any) {
  const app = new Realm.App({ id: REALM_APP_ID })

  return <RealmContext.Provider value={ app } {...props} />
}

export const useRealm = () => React.useContext(RealmContext)
