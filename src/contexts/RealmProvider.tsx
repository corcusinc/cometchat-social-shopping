import React from 'react'
import * as Realm from 'realm-web'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

const RealmContext = React.createContext<Realm.App | undefined>(undefined)

const REALM_APP_ID = '<REALM_APP_ID>'
const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/${REALM_APP_ID}/graphql`

export function RealmProvider (props: any) {
  const app = new Realm.App({ id: REALM_APP_ID })

  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: graphqlUri,
      fetch: async (uri, options) => {
        return fetch(uri, {
          ...options,
          headers: {
            ...options?.headers,
            Authorization: `Bearer ${app.currentUser?.accessToken}`
          }
        })
      }
    }),
    cache: new InMemoryCache()
  })

  return (
    <RealmContext.Provider value={ app }>
      <ApolloProvider client={apolloClient} {...props} />
    </RealmContext.Provider>
  )
}

export const useRealm = () => React.useContext(RealmContext)
