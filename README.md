## GrowFlow - Phoenix Code Challenge

This application was started by using the [Create React App](https://github.com/facebook/create-react-app) CLI.

> ### Points of Interest

- It is designed to work offline.

- It uses a custom Service Worker to cache the application shell, assets and API calls after initial installation.

- It uses PouchDB to queue any new employees offline, and then sync them when back online.

- It uses a proxy API server to get around the issue of CORS not being enabled on the Leviathan API.
  <br /><br />

> ### Steps for Setting Up

1. Install Node v14.4.0 using [nvm](https://github.com/nvm-sh/nvm) (_node version manager_).<br />
   `$ nvm install v14.4.0`<br />
   `$ nvm use`
   <br /><br />
2. Clone the [Phoenix repository](https://github.com/lanegreg/phoenix-ui) and install dependencies.<br />
   `$ git clone https://github.com/lanegreg/phoenix-ui.git`<br />
   `$ npm install`
   <br /><br />
3. Switch into the `/proxy-server` folder and install dependencies.<br />
   `$ cd proxy-server/ && npm install`
   <br /><br />
4. Install [PouchDB Server](https://github.com/pouchdb/pouchdb-server) globally.<br />
   `$ npm install -g pouchdb-server`
   <br /><br />

> ### Steps for Running

1. In a terminal, start the PouchDB server inside the `/proxy-server` folder.<br />
   **Note:** _PouchDB will setup it's folder stucture based on the folder you start in._<br />
   `$ cd proxy-server/ && npm run start:pouch`<br />
   ...or with **_yarn_**<br />
   `$ cd proxy-server/ && yarn start:pouch`
   <br /><br />
2. In a second terminal, from the same `/proxy-server` folder, start up the proxy server.<br />
   `$ cd proxy-server/ && npm run start`<br />
   ...or with **_yarn_**<br />
   `$ cd proxy-server/ && yarn start`
   <br /><br />
3. In a third terminal, start up the Phoenix application.<br />
   `$ npm run start:prod`<br />
   ...or with **_yarn_**<br />
   `$ yarn start:prod`
   <br /><br />

> Example of Offline Usage:

![Offline Example:](readme-assets/offline-example.gif)
