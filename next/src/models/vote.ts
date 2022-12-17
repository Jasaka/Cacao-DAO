import { Proposal } from "./proposal"
import { User } from "./user"
import { Cycle } from "./cycle"

export interface Vote {
  id: string;
  proposal: Proposal;
  voter: User;
  vote: number;
  cycle: Cycle;
}