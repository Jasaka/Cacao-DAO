import contract from "./qv_metadata"
import { ethers } from "ethers"

const alchemyProvider = new ethers.providers.AlchemyProvider(process.env.NETWORK, process.env.ALCHEMY_KEY)
// @ts-ignore
const signer = new ethers.Wallet(process.env.ETH_KEY, alchemyProvider)
// @ts-ignore
const quadraticVotingContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contract.output.abi, signer)

// TODO: Correct typecasting
const getCurrentCycleHash = async (): Promise<string> => {
  return quadraticVotingContract.getCurrentCycleHash()
}

const getCycleProposingDeadline = async (cycleHash: string) => {
  return quadraticVotingContract.getCycleProposingDeadline(cycleHash)
}

const getCycleVotingDeadline = async (cycleHash: string) => {
  return quadraticVotingContract.getCycleVotingDeadline(cycleHash)
}

const getCycleStatus = async (cycleHash: string) => {
  return quadraticVotingContract.getCycleStatus(cycleHash)
}

const getVoteCountForProposal = async (cycleHash: string, proposalHash: string) => {
  return quadraticVotingContract.countVotesForProposal(cycleHash, proposalHash)
}

const executeCurrentCycleExtension = async (additionalDays: number) => {
  return quadraticVotingContract.extendCycle(additionalDays)
}

const executeProposalCreation = async (proposalHash: string) => {
  return quadraticVotingContract.createProposal(proposalHash)
}

const executeProposalVote = async (direction: "positive" | "negative", proposalHash: string, vote: number) => {
  return quadraticVotingContract.castVote(proposalHash, vote, direction === "positive")
}

export default quadraticVotingContract
export { getCurrentCycleHash, getCycleProposingDeadline, getCycleVotingDeadline, getCycleStatus, getVoteCountForProposal, executeCurrentCycleExtension, executeProposalCreation, executeProposalVote }