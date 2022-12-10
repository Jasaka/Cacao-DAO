import { Proposal } from "./proposal"
import { User } from "./user"

export interface Flag{
  id: string;
  proposal: Proposal;
  reason: string;
  author?: User;
}