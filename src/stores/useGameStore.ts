import { create } from 'zustand';
import { setPlayerReady, getGameByCode } from '@/actions/game.action';
import type { PlayerType } from '@/lib/types/player.type';
import type { RoleType } from '@/lib/types/role.type';
import type { GameType } from '@/lib/types/game.type';

type GamePhase = 'turns' | 'discussion' | 'voting' | 'end';

type GameStore = {
  players: PlayerType[];
  centerDeck: RoleType[];
  round: number;
  totalRounds: number;
  currentTurn: number;
  turnOrder: string[];
  gamePhase: GamePhase;

  isReadyDialogOpen: boolean;
  setIsReadyDialogOpen: (open: boolean) => void;
  readyUp: (gameCode: string, userId: string) => Promise<void>;
  syncGame: (gameCode: string) => Promise<void>;

  assignRoles: () => void;
  nextTurn: () => void;
  completeTurn: () => void;
  startDiscussion: () => void;
  startVoting: () => void;
  eliminatePlayer: (playerId: string) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  centerDeck: [],
  round: 0,
  totalRounds: 0,
  currentTurn: 0,
  turnOrder: [],
  gamePhase: 'turns',

  isReadyDialogOpen: true,
  setIsReadyDialogOpen: (open) => set({ isReadyDialogOpen: open }),

  readyUp: async (gameCode, userId) => {
    const { allReady } = await setPlayerReady(gameCode, userId);
    await get().syncGame(gameCode);
    set({ isReadyDialogOpen: !allReady }); // Only close dialog if all are ready
  },

  syncGame: async (gameCode) => {
    const game: GameType = await getGameByCode(gameCode);
    set({
      players: game.players,
      round: game.currentRound,
      totalRounds: game.rounds,
      // Add other game state as needed
    });
  },

  assignRoles: () => {
    /* put logic here */
  },
  nextTurn: () => {
    /* put logic here */
  },
  completeTurn: () => {
    /* put logic here */
  },
  startDiscussion: () => {
    /* put logic here */
  },
  startVoting: () => {
    /* put logic here */
  },
  eliminatePlayer: (playerId) => {
    /* put logic here */
  },
  resetGame: () => {
    /* put logic here */
  },
}));
