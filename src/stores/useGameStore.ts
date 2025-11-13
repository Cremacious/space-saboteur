import { create } from 'zustand';
import { setPlayerReady, getGameByCode } from '@/actions/game.action';
import type { PlayerType } from '@/lib/types/player.type';
import type { RoleType } from '@/lib/types/role.type';
import type { GameType } from '@/lib/types/game.type';
import io from 'socket.io-client';

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
  initReadySocket: (gameCode: string) => void;

  assignRoles: () => void;
  nextTurn: () => void;
  completeTurn: () => void;
  startDiscussion: () => void;
  startVoting: () => void;
  eliminatePlayer: (playerId: string) => void;
  resetGame: () => void;
};

let socket: ReturnType<typeof io> | null = null;

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
    // Optimistically update local state
    set((state) => ({
      players: state.players.map((p) =>
        p.id === userId ? { ...p, isReady: true } : p
      ),
    }));

    await setPlayerReady(gameCode, userId);
    // Emit socket event to notify all clients to sync
    if (socket) {
      socket.emit('player-ready', { gameCode });
    }
    await get().syncGame(gameCode);
    // Dialog state will be handled in syncGame for all clients
  },

  syncGame: async (gameCode) => {
    const game: GameType = await getGameByCode(gameCode);
    const allReady =
      game.players.length > 0 && game.players.every((p) => p.isReady);
    set({
      players: game.players,
      round: game.currentRound,
      totalRounds: game.rounds,
      isReadyDialogOpen: !allReady,
      // Add other game state as needed
    });
  },

  // Call this once in the game page/component to set up socket listeners
  initReadySocket: (gameCode: string) => {
    if (!socket) {
      socket = io({ path: '/api/socket' });
    }
    socket.emit('join-lobby', gameCode);
    socket.off('player-ready');
    socket.on('player-ready', async (payload: { gameCode: string }) => {
      // Sync game state when any player is ready
      await get().syncGame(payload.gameCode);
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
