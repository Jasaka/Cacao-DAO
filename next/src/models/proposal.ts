import { User } from "./user"

export interface BaseProposal {
  id: string;
  title: string;
  description: string;
  currentHash: string;
  predictedCost?: number;
}

export interface Proposal extends BaseProposal{
  author: User;
  status: string;
  cycle: string;
  upvotes?: number;
  downvotes?: number;
}