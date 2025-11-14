import { create } from 'zustand';
import { assignRolesToPlayers, getGameByCode } from '@/actions/game.action';
import type { PlayerType } from '@/lib/types/player.type';
import type { RoleType } from '@/lib/types/role.type';
import type { GameType } from '@/lib/types/game.type';
import io from 'socket.io-client';
import { devtools } from 'zustand/middleware';

type GamePhase = 'turns' | 'discussion' | 'voting' | 'end';
type CenterCard = { roleId: string; position: number };

type GameStore = {
  players: PlayerType[];
  centerDeck: CenterCard[];
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
  syncCenterDeck: (gameCode: string) => Promise<void>;
  assignRoles: (gameCode: string) => Promise<void>;
  nextTurn: () => void;
  completeTurn: () => void;
  startDiscussion: () => void;
  startVoting: () => void;
  eliminatePlayer: (playerId: string) => void;
  resetGame: () => void;
};

let socket: ReturnType<typeof io> | null = null;

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      players: [],
      centerDeck: [],
      round: 0,
      totalRounds: 0,
      currentTurn: 0,
      turnOrder: [],
      gamePhase: 'turns',

      isReadyDialogOpen: true,
      setIsReadyDialogOpen: (open) => set({ isReadyDialogOpen: open }),

      readyUp: async () => {},
      syncCenterDeck: async (gameCode) => {},

      // src/stores/useGameStore.ts
      syncGame: async (gameCode) => {
        const game = await getGameByCode(gameCode);
        if (!game) return;

        set({
          players: game.players, 
          centerDeck: game.centerCards.map((card) => ({
            roleId: card.roleId,
            position: card.position,
          })),
          round: game.currentRound,
          totalRounds: game.rounds,
          isReadyDialogOpen: !game.players.every((p) => p.isReady),
        });
      },
      initReadySocket: (gameCode: string) => {
        if (!socket) {
          socket = io({ path: '/api/socket' });
        }
        socket.emit('join-lobby', gameCode);
        socket.off('player-ready');
        socket.on('player-ready', async (payload: { gameCode: string }) => {
          await get().syncGame(payload.gameCode);
        });
      },

      assignRoles: async (gameCode: string) => {
        try {
          await assignRolesToPlayers(gameCode);
          await get().syncGame(gameCode);
        } catch (error) {
          console.error('Failed to assign roles:', error);
        }
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
    }),
    { name: 'GameStore' }
  )
);
