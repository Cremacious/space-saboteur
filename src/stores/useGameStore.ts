import { create } from 'zustand';

type Player = { id: string; name: string; eliminated: boolean; roleId: number; isReady: boolean };
type RoleCard = { id: number; name: string; description: string };

export const useGameStore = create<{
  players: Player[];
  centerDeck: RoleCard[];
  round: number;
  totalRounds: number;
  currentTurn: number;
  turnOrder: string[]; 
  gamePhase: 'turns' | 'discussion' | 'voting' | 'end';
  actions: any[]; 
  assignRoles: () => void;
  nextTurn: () => void;
  completeTurn: () => void;
  startDiscussion: () => void;
  startVoting: () => void;
  eliminatePlayer: (playerId: string) => void;
  resetGame: () => void;
}>((set, get) => ({
  // put logic here
  players: [],
  centerDeck: [],
  round: 1,
  totalRounds: 0,
  currentTurn: 0,
  turnOrder: [],
  gamePhase: 'turns',
  actions: [],
  assignRoles: () => { /* put logic here */ },
  nextTurn: () => { /* put logic here */ },
  completeTurn: () => { /* put logic here */ },
  startDiscussion: () => { /* put logic here */ },
  startVoting: () => { /* put logic here */ },
  eliminatePlayer: (playerId) => { /* put logic here */ },
  resetGame: () => { /* put logic here */ },
}));