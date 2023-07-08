import contract from "./qv_metadata"
import { ethers } from "ethers"
// @ts-ignore
import sha256 from "crypto-js/sha256"
import { randomUUID } from "crypto"
import { verboseLog } from "../util/util"

const alchemyProvider = new ethers.providers.AlchemyProvider(process.env.NETWORK, process.env.ALCHEMY_KEY)
// @ts-ignore
const signer = new ethers.Wallet(process.env.ETH_KEY, alchemyProvider)
// @ts-ignore
const quadraticVotingContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contract.abi, signer)

export const generateByte32Hash = () => {
  return "0x" + sha256(randomUUID()).toString()
}

export const fixByte32Hash = (hash: string) => {
  if (hash.startsWith("0x")) {
    return hash
  } else {
    return "0x" + hash
  }
}

// TODO: Correct typecasting
const getCurrentCycleHash = async (): Promise<string> => {
  verboseLog("Getting current cycle hash from smart contract")
  return await quadraticVotingContract.getCurrentCycleHash()
}

const getCycleProposingDeadline = async (cycleHash: string): Promise<any> => {
  verboseLog("Getting cycle proposing deadline from smart contract for Hash: " + cycleHash)
  return await quadraticVotingContract.getCycleProposingDeadline(cycleHash)
}

const getCycleVotingDeadline = async (cycleHash: string): Promise<any> => {
  verboseLog("Getting cycle voting deadline from smart contract for Hash: " + cycleHash)
  return await quadraticVotingContract.getCycleVotingDeadline(cycleHash)
}

const getCycleStatus = async (cycleHash: string): Promise<any> => {
  verboseLog("Getting cycle status from smart contract for Hash: " + cycleHash)
  return await quadraticVotingContract.getCycleStatus(cycleHash)
}

const getVoteCountForProposal = async (cycleHash: string, proposalHash: string): Promise<any> => {
  verboseLog("Getting vote count on smart contract for proposal " + proposalHash + " in cycle " + cycleHash)
  return await quadraticVotingContract.countVotesForProposal(cycleHash, proposalHash)
}

const executeCurrentCycleExtension = async (additionalDays: number): Promise<any> => {
  verboseLog("Extending current cycle by " + additionalDays + " days")
  return await quadraticVotingContract.extendCycle(additionalDays)
}

const executeProposalCreation = async (proposalHash: string): Promise<any> => {
  verboseLog("Creating proposal on smart contract with Hash: " + proposalHash)
  return await quadraticVotingContract.createProposal(proposalHash)
}

const executeProposalVote = async (direction: "positive" | "negative", proposalHash: string, vote: number): Promise<any> => {
  verboseLog("Voting on proposal " + proposalHash + " with " + vote + " votes in direction " + direction)
  return await quadraticVotingContract.castVote(proposalHash, vote, direction === "positive")
}

const executeCycleCreation = async (cycleHash: string): Promise<any> => {
  verboseLog("Creating cycle on smart contract with Hash: " + cycleHash)
  return await quadraticVotingContract.createCycle(cycleHash)
}

const executeEndProposingPeriod = async (): Promise<any> => {
  verboseLog("Ending proposing period on smart contract")
  return await quadraticVotingContract.endProposingCycleManuallyONLYForDemoPurposesDeleteAfterwards()
}

const executeEndVotingPeriod = async (): Promise<any> => {
  verboseLog("Ending voting period on smart contract")
  return await quadraticVotingContract.endVotingCycleManuallyONLYForDemoPurposesDeleteAfterwards()
}

export default quadraticVotingContract
export { getCurrentCycleHash, getCycleProposingDeadline, getCycleVotingDeadline, getCycleStatus, getVoteCountForProposal, executeCurrentCycleExtension, executeProposalCreation, executeProposalVote, executeCycleCreation, executeEndVotingPeriod, executeEndProposingPeriod }