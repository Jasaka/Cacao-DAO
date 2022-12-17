import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"
import dotenv from "dotenv";

// Keys need to be added
const ALCHEMY_API_KEY = "" + dotenv.config().parsed?.ALCHEMY_URL + dotenv.config().parsed?.ALCHEMY_KEY || "";
const ETH_KEY = dotenv.config().parsed?.ETH_KEY || "";


const config: HardhatUserConfig = {
    solidity: "0.8.9",
    gasReporter: {
        enabled: true
    },
    networks: {
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [ETH_KEY]
        }
    }
};

export default config;