import { create } from 'zustand';

export const useVoteStore = create<{
  votes: Record<string, string>; // playerId -> votedForId
  votingOpen: boolean;
  vote: (playerId: string, votedForId: string) => void;
  closeVoting: () => void;
  resetVotes: () => void;
}>((set, get) => ({
  // put logic here
  votes: {},
  votingOpen: false,
  vote: (playerId, votedForId) => {
    /* put logic here */
  },
  closeVoting: () => {
    /* put logic here */
  },
  resetVotes: () => {
    /* put logic here */
  },
}));
