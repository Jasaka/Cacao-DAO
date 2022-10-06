# Getting Started with the Cacao DAO Client

This is the API server for Cacao DAO.

The API is written using node.js, using the [Express](http://expressjs.com/) framework.

## Installation

To get started with api development, you need to install the required packages:
`npm install`

Also, while in the api directory, you will need to run the following command to enable the `.env` file:
`cp .env.dist .env`

## Available Scripts

In the project directory, you can run:

### `npm run start:local`

Runs the app in the development mode, using the `.env` file.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

Currently supported routes are:
| Route                                         | Type | Body                                                           | Response         |
| --------------------------------------------- | ---- | -------------------------------------------------------------- | ---------------- |
| /users                                        | GET  |                                                                |                  |
| /users/{id}                                   | GET  |                                                                |                  |
| /login                                        | POST | {userName: string, password: string}                         | {token, expirationDate} |
| /proposals                                     | GET  |                                                                |                  |
| /proposals/{id}                               | GET  |                                                                |                  |
| /proposals                                    | POST | {title: string, description: string, predictedCost?: number}  |                  |
| /proposals/{id}/flags                     | GET  |                                                                |                  |
| /proposals/{id}/flags                     | POST | {proposalHash: string, flagMessage: string, flagAuthorId?: uuid} |                  |
| /proposalFlags                                        | GET  |                                                                |                  |

The currently deployed API can be reached via https://cacao-dao-api.herokuapp.com/

### `npm run test`

Will be used to run the tests.

### `npm run lint`, `lint:fix`, `format` and `preflight`

- `npm run lint`: will search for problems using eslint, but will not fix
- `npm run lint:fix`: will search and try to fix the problems using eslint.
- `npm run format`: will call prettier to fix the code style.
- `npm run preflight`: will run the lint and format commands.


# Interacting with deployed Smart Contracts

## Getting Started
Interacting with any contracts currently only occurs through the API. 
It currently serves as an intermediary between the client and the blockchain to handle user authentication & interactions with the QV contract: 
- Reading Contract State 
- Transacting with the EVM using the "global wallet".

We chose this as a temporary solution to be able to test the prototype on users that don't have their own wallet. This is a temporary solution until we have a frontend client that can interact with the contracts using on-chain user authentication via a (self-custodial) [crypto wallet](https://ethereum.org/en/wallets/)
which is necessary to establish a secure connection between the user and the smart contracts in a trust-less manner.

- The API is automatically connected after spinning up a local _Ganache network_ using ganache's default settings.
- The API's "global wallet" is used to make contract calls ob behalf of the Client. By default, this wallet is the first account in your local Ganache network.


# Developing Resources

To learn more about node.js, check out the [node.js documentation](https://nodejs.org/en/docs/).

There is a [documentation for the Express framework](https://expressjs.com/en/guide/routing.html).

Postgres is a popular database, and can be used to store data. We use the npm package pg, which has its documentation here: [pg docs](https://www.npmjs.com/package/pg).

To query the database, SQL is used. You can find the documentation here: [SQL documentation](https://www.postgresql.org/docs/9.5/static/sql-syntax.html).

To send requests to Arweave (the blockchain), you can use the npm package arweave-js, which has its documentation here: [arweave-js docs](https://www.npmjs.com/package/arweave-js).