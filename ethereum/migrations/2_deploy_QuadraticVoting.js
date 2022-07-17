const QuadraticVoting = artifacts.require("QuadraticVoting");

module.exports = function (deployer) {
    deployer.deploy(QuadraticVoting);
};