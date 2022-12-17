import { ethers } from "hardhat";

async function deployQV() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  let balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());

  const QuadraticVoting = await ethers.getContractFactory("QuadraticVoting");
  const quadraticVoting = await QuadraticVoting.deploy(14, 10, 4);

  await quadraticVoting.deployed();

  console.log(`QuadraticVoting deployed to ${quadraticVoting.address}`);
  console.log("Deployment costs:", (balance.sub(await deployer.getBalance())).toString());
}

deployQV().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});