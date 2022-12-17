import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"

// Keys need to be added
const ALCHEMY_API_KEY = "";
const GOERLI_PRIVATE_KEY = "";


const config: HardhatUserConfig = {
    solidity: "0.8.9",
    gasReporter: {
        enabled: true
    },
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY]
        }
    }
};

export default config;