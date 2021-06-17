# sosho-shop
sosho-shop is a demo app created to demonstrate how to integrate Cometchat into an online marketplace for a social shopping experience. It is built using Typescript/React for the frontend, MongoDB Atlas for data storage, MongoDB Realm for authentication and querying Atlas data, and Cometchat for the chat integration.

## Repo breakdown
The main branch of this repo contains the final code needed to spin up this demo site locally as well as mongodb/realm config that you can use to import the Realm app into your own Realm project using `realm-cli`. You can see run snapshots of the site at various "checkpoints" by using the `checkpoint-#` tags. Here is a breakdown of the various checkpoints

- `checkpoint-1`: Frontend with mock authentication
    - See [AuthProvider.tsx](./src/contexts/AuthProvider.tsx) for mock usernames & passwords.
- `checkpoint-2`: Integrate Realm for authentication and fetch shops from MongoDB using Realm graphql endpoints
    - This can easily be swapped out with any backend as a service platform (e.g. Firebase) by simply updating the authentication functions in [AuthProvider.tsx](./src/contexts/AuthProvider.tsx)
- `checkpoint-3`: Integrate cometchat login in Auth workflow
- `checkpoint-4`: Integrate Cometchat's React UIKit to message sellers
- `checkpoint-5`: TODO

## Set up
**NOTE**: In order to run the app starting from `checkpoint-2`, you must have set up the Realm backend (or swap it out for your own!). Alternatively, you can use a Realm app hosted by us if you would like to avoid the additional set up.

1. Set up Mongodb/Realm and populate data (skip if using our hosted Realm app or your own backend)
    - Follow steps in [realm-config/README.md](./realm-config/README.md)
2. Populate Cometchat data
    - Create Cometchat account
    - Generate API key and replace `COMETCHAT_APP_ID`, `COMETCHAT_AUTH_KEY` and `COMETCHAT_API_KEY` in the repo with your values.
    From [data](data) folder, run `node populateCometchatData.js` to populate your Cometchat app with the Realm users.
        - This will need to be updated if swapping out for a different Authentication provider
3. Install dependencies
    - `npm install` or `yarn`
4. Run app!
    - `npm run start` or `yarn start` runs the app in the development mode
    - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
