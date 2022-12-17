import { Proposal } from "./proposal"

export interface Version {
  hash: string;
  arweaveId: string;
  timestamp: Date;
  currentProposal: Proposal;
}