const Realm = require('realm')
const MongoClient = require('mongodb').MongoClient
const fetch = require('node-fetch')

const REALM_APP_ID = process.env.REACT_APP_SOSHO_SHOP_REALM_APP_ID
const realmApp = new Realm.App({ id: REALM_APP_ID })

const MONGODB_USER = '<MONGODB_USER>'
const MONGODB_PASSWORD = '<MONGODB_PASSWORD>'
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.nzcsc.mongodb.net/sosho-shop?retryWrites=true&w=majority`
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const COMETCHAT_API_ENDPOINT = 'https://api-us.cometchat.io/v2.0'
const COMETCHAT_APP_ID = '<COMETCHAT_APP_ID>'
const COMETCHAT_API_KEY = '<COMETCHAT_API_KEY>'

async function main () {
  try {
    await mongoClient.connect()

    // Register customers
    await realmApp.emailPasswordAuth.registerUser('user1@email.com', 'password')
    await realmApp.emailPasswordAuth.registerUser('user2@email.com', 'password')

    // Register shop owners
    await realmApp.emailPasswordAuth.registerUser('owner1@email.com', 'password')
    await realmApp.emailPasswordAuth.registerUser('owner2@email.com', 'password')
    await realmApp.emailPasswordAuth.registerUser('owner3@email.com', 'password')

    // Create shops
    const database = mongoClient.db('sosho-shop')
    const shopsCollection = database.collection('Shop')

    const shopsWriteRes = await shopsCollection.insertMany([{
      name: 'Big Book Co',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum elit massa, non volutpat nisi pharetra non. Ut sagittis, sem vitae gravida sagittis, augue purus rhoncus augue, a semper erat mi ac enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in dapibus ipsum.',
      logoUrl: 'https://media.timeout.com/images/103021834/630/472/image.jpg'
    }, {
      name: 'Big Teddy Co',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum elit massa, non volutpat nisi pharetra non. Ut sagittis, sem vitae gravida sagittis, augue purus rhoncus augue, a semper erat mi ac enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in dapibus ipsum.',
      logoUrl: 'https://www.buildabear.com/dw/image/v2/BBNG_PRD/on/demandware.static/-/Sites-buildabear-master/default/dw2b81d8a7/28502x.jpg'
    }, {
      name: 'Big Pillow Co',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dictum elit massa, non volutpat nisi pharetra non. Ut sagittis, sem vitae gravida sagittis, augue purus rhoncus augue, a semper erat mi ac enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut in dapibus ipsum.',
      logoUrl: 'http://www.whotelsthestore.com/images/products/lrg/w-hotels-feather-down-pillow-WHO-108-F_lrg.jpg'
    }])

    // Create user profiles
    const profilesCollection = database.collection('User')

    const user1 = await realmApp.logIn(Realm.Credentials.emailPassword('user1@email.com', 'password'))
    const user2 = await realmApp.logIn(Realm.Credentials.emailPassword('user2@email.com', 'password'))

    await profilesCollection.insertMany([{
      _accountId: user1.id,
      name: 'John Smith'
    }, {
      _accountId: user2.id,
      name: 'Alicia Woods'
    }])

    const owner1 = await realmApp.logIn(Realm.Credentials.emailPassword('owner1@email.com', 'password'))
    const owner2 = await realmApp.logIn(Realm.Credentials.emailPassword('owner2@email.com', 'password'))
    const owner3 = await realmApp.logIn(Realm.Credentials.emailPassword('owner2@email.com', 'password'))

    const ownersWriteRes = await profilesCollection.insertMany([{
      _accountId: owner1.id,
      _shopId: shopsWriteRes.insertedIds[0],
      name: 'Crystal Waters'
    }, {
      _accountId: owner2.id,
      _shopId: shopsWriteRes.insertedIds[1],
      name: 'Benjamin Jones'
    }, {
      _accountId: owner3.id,
      _shopId: shopsWriteRes.insertedIds[2],
      name: 'Sarah Watson'
    }])

    // Add owner IDs to shops
    await shopsCollection.updateOne({ _id: shopsWriteRes.insertedIds[0] }, { $set: { _ownerId: ownersWriteRes.insertedIds[0] } })
    await shopsCollection.updateOne({ _id: shopsWriteRes.insertedIds[1] }, { $set: { _ownerId: ownersWriteRes.insertedIds[1] } })
    await shopsCollection.updateOne({ _id: shopsWriteRes.insertedIds[2] }, { $set: { _ownerId: ownersWriteRes.insertedIds[2] } })

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

    // Create CometChat user accounts
    url = `${COMETCHAT_API_ENDPOINT}/users`

    await user1.refreshCustomData()
    await fetch(url, { ...options, body: JSON.stringify({ uid: user1.customData._id, name: user1.customData.name, role: 'customer' }) })
    await user2.refreshCustomData()
    await fetch(url, { ...options, body: JSON.stringify({ uid: user2.customData._id, name: user2.customData.name, role: 'customer' }) })

    await owner1.refreshCustomData()
    await fetch(url, { ...options, body: JSON.stringify({ uid: owner1.customData._id, name: owner1.customData.name, role: 'shop-owner' }) })
    await owner2.refreshCustomData()
    await fetch(url, { ...options, body: JSON.stringify({ uid: owner2.customData._id, name: owner2.customData.name, role: 'shop-owner' }) })
    await owner3.refreshCustomData()
    await fetch(url, { ...options, body: JSON.stringify({ uid: owner3.customData._id, name: owner3.customData.name, role: 'shop-owner' }) })
  } catch (err) {
    console.log(err)
  }
}

main().then(() => {
  console.log('Done')
  process.exit()
})
