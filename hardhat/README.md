# CacaoDAO Hardhat Project

This project comes with our quadratic voting smart contract, as well as test coverage, and a script that deploys our contracts to the Goerli testnet of Ethereum.

Run these commands from within the hardhat directory.

## Setup
You will need to run the following command to enable the `.env.local` file:
`cp dist.env .env`

Then add your respective private key to your wallet for funding to `ETH_KEY`. Also add your Alchemy API key to `ALCHEMY_KEY`. And add the correct Network URL to `ALCHEMY_URL`.

Run `yarn install` to install the dependencies.

## Development
### Basics
Help:
```shell
npx hardhat help
```

To compile the entire project, build all artifacts run:
```shell
npx hardhat compile
```
Running tests (for switching on/off detailed gas report enable/disable gasReporter in [hardhat.config.ts](hardhat.config.ts)):

```shell
npx hardhat test
```

## Deployment
Deploy on in-process Hardhat Network node:
```shell
npx hardhat run scripts/deploy.ts
```
For deployment on Goerli testnet (as configured in [hardhat.config.ts](hardhat.config.ts)):
```shell
npx hardhat run scripts/deploy.ts --network goerli
```
###
### Local Ethereum network node for development
To start the node, just type:
```shell
npx hardhat node
```
This will start a HTTP and WebSocket JSON-RPC server (default port http://127.0.0.1:8545/).
20 test-accounts will be generated automatically, charged up with 10000 ETH each. Key pairs will be printed into console.

If you want to connect further Hardhat tasks to this node, you just need to run using 
`--network localhost`.