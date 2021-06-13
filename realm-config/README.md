# Setting up Realm Backend

https://docs.mongodb.com/realm/deploy/realm-cli-reference

1. Create a MongoDB account & API Key
  - Navigate to https://account.mongodb.com/account/register and create an account
  - Click on Access Manager in the top -> Organization Access -> Create API Key
  - Provide a description and change the Organization Permissions to "Organization Owner"
    - Note the API key information, this will be used in the next step

2. Create new Atlas project & cluster
  - From the "Projects" tab in the sidebar -> "New Project"
    - Give your project any name, then click "Create Project" on next screen
  - From the "Clusters" tab in the sidebar -> "Build a Cluster" -> Create a shared cluster
    - Make sure the cluster name matches the `clusterName` field [here](./sosho-shop/data_sources/mongodb-atlas/config.json) as well as the cluster name in the mongodb uri [here](./populateData.js)
    - You can keep the default settings for everything else

3. Install realm CLI & login
  - `yarn global add mongodb-realm-cli@beta`
  - `realm-cli login --api-key "<PUBLIC_KEY>" --private-api-key "<PRIVATE_KEY>"`

4. Import Realm project
  - `realm-cli import --local ./sosho-shop`
    - "y" for "Do you wish to create a new app?"
    - "Enter" to use sosho-shop as the app name, or give any app name you like
    - Choose nearest region to you for "App Location"
    - "LOCAL" for "App Deployment Model"
    - "development" for "App Environment"
    - "y" for "Please confirm the changes shown above"
    - Note the outputted app ID. This should replace instances of <REALM_APP_ID> in the code

5. Populate sample data
  - From the Atlas cluster we created in step 2, click "Connect"
    - Click "Add Your Current IP Address" -> "Add IP Address"
    - Create a database user using the form under "Create a Database User"
      - Note the username & password and use them to replace instances of <MONGODB_USER> and <MONGODB_PASSWORD> respectively in the code
  - `node populateData.js`
