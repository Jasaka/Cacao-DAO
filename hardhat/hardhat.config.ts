import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter"

const ALCHEMY_API_KEY = "85R7m6-xyv5NbkgTBKaOmBs7Y6z6mLjw";
const GOERLI_PRIVATE_KEY = "bdb08c55bfbea8dd662770e94ca1d1e0929d3d67dc1f8aaa30da89d3eba348ed";


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