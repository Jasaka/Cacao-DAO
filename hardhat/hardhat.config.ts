import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter"
import dotenv from "dotenv";

// Keys need to be added
const ALCHEMY_URL_AND_KEY = "" + dotenv.config().parsed?.ALCHEMY_URL + dotenv.config().parsed?.ALCHEMY_KEY || "";
const ETH_KEY = dotenv.config().parsed?.ETH_KEY || "";
const ETHERSCAN_API_KEY = dotenv.config().parsed?.ETHERSCAN_API_KEY || "";


const config: HardhatUserConfig = {
    solidity: "0.8.9",
    gasReporter: {
        enabled: true
    },
    networks: {
        goerli: {
            url: `${ALCHEMY_URL_AND_KEY}`,
            accounts: [ETH_KEY]
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    }
};

export default config;