import { atom } from 'recoil';

export const openVoteCredits = atom({
  key: 'openVoteCredits',
  default: 100,
});

export interface Vote {
  id: string;
  vote: number;
}

export const votes = atom({
  key: 'votes',
  default: [] as Vote[],
});
