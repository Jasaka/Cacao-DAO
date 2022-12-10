import { User } from "./user"

export interface Proposal{
  id: string;
  title: string;
  description: string;
  author: User;
  currentHash: string;
  predictedCost?: number;
  status: string;
  cycle: string;
  upvotes?: number;
  downvotes?: number;
}