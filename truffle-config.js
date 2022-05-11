const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    development: {
        host: "127.0.0.1",
        // host: "172.20.64.1",
        port: 7545,
        network_id: "*" // Match any network id
    },networks: {
    develop: {
      port: 8545
    }
  }
};
