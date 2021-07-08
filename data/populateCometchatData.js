const Realm = require('realm')
const fetch = require('node-fetch')

const REALM_APP_ID = '<REALM_APP_ID>'
const realmApp = new Realm.App({ id: REALM_APP_ID })

const COMETCHAT_API_ENDPOINT = 'https://api-us.cometchat.io/v2.0'
const COMETCHAT_APP_ID = '<COMETCHAT_APP_ID>'
const COMETCHAT_API_KEY = '<COMETCHAT_API_KEY>'

async function main () {
  try {
    // Create CometChat roles
    let url = `${COMETCHAT_API_ENDPOINT}/roles`
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        appId: COMETCHAT_APP_ID,
        apiKey: COMETCHAT_API_KEY
      }
    }

    await fetch(url, { ...options, body: JSON.stringify({ role: 'customer', name: 'Customer' }) })
    await fetch(url, { ...options, body: JSON.stringify({ role: 'shop-owner', name: 'Shop Owner' }) })

    // Get Realm accounts
    const user1 = await realmApp.logIn(Realm.Credentials.emailPassword('user1@email.com', 'password'))
    const user2 = await realmApp.logIn(Realm.Credentials.emailPassword('user2@email.com', 'password'))

    const owner1 = await realmApp.logIn(Realm.Credentials.emailPassword('owner1@email.com', 'password'))
    const owner2 = await realmApp.logIn(Realm.Credentials.emailPassword('owner2@email.com', 'password'))
    const owner3 = await realmApp.logIn(Realm.Credentials.emailPassword('owner2@email.com', 'password'))

    // Create CometChat user accounts
    url = `${COMETCHAT_API_ENDPOINT}/users`

    await fetch(url, { ...options, body: JSON.stringify({ uid: user1.customData._id, name: user1.customData.name, role: 'customer' }) })
    await fetch(url, { ...options, body: JSON.stringify({ uid: user2.customData._id, name: user2.customData.name, role: 'customer' }) })

    await fetch(url, { ...options, body: JSON.stringify({ uid: owner1.customData._id, name: owner1.customData.name, role: 'shop-owner' }) })
    await fetch(url, { ...options, body: JSON.stringify({ uid: owner2.customData._id, name: owner2.customData.name, role: 'shop-owner' }) })
    await fetch(url, { ...options, body: JSON.stringify({ uid: owner3.customData._id, name: owner3.customData.name, role: 'shop-owner' }) })
  } catch (err) {
    console.log(err)
  }
}

main().then(() => {
  console.log('Done')
  process.exit()
})
