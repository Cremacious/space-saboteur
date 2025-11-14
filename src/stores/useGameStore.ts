import { create } from 'zustand';
import {
  assignRolesToPlayers,
  getAllRoles,
  getGameByCode,
  advanceTurn,
} from '@/actions/game.action';
import type { PlayerType } from '@/lib/types/player.type';
import type { RoleType } from '@/lib/types/role.type';
import type { GameType } from '@/lib/types/game.type';
import io from 'socket.io-client';
import { devtools } from 'zustand/middleware';
import { ROLE_TURN_ORDER } from '@/lib/constants/roleTurnOrder';

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
  hasPerformedAction: boolean;
  setHasPerformedAction: (value: boolean) => void;
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
      hasPerformedAction: false,
      isReadyDialogOpen: true,
      setIsReadyDialogOpen: (open) => set({ isReadyDialogOpen: open }),

      readyUp: async () => {},
      syncCenterDeck: async (gameCode) => {},

      syncGame: async (gameCode) => {
        const game = await getGameByCode(gameCode);
        if (!game) return;

        const assignedRoles = game.players.map((p) => p.roleId);

        const allRoles = await getAllRoles();
        const assignedRoleObjs = allRoles.filter((role) =>
          assignedRoles.includes(role.id)
        );
        const turnOrder = ROLE_TURN_ORDER.map((roleName) =>
          assignedRoleObjs.find((r) => r.name === roleName)
        )
          .filter(Boolean)
          .map((r) => r!.id);

        set({
          players: game.players,
          centerDeck: game.centerCards.map((card) => ({
            roleId: card.roleId,
            position: card.position,
          })),
          round: game.currentRound,
          totalRounds: game.rounds,
          turnOrder,
          currentTurn: game.currentTurn,
          isReadyDialogOpen: !game.players.every((p) => p.isReady),
        });
      },
      initReadySocket: (gameCode: string) => {
        if (!socket) {
          socket = io({ path: '/api/socket' });
        }
        socket.emit('join-lobby', gameCode);
        socket.off('turn-advanced');
        socket.on('turn-advanced', async (payload: { gameCode: string }) => {
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
      setHasPerformedAction: (value) => set({ hasPerformedAction: value }),
      nextTurn: async (gameCode: string) => {
        await advanceTurn(gameCode);
        if (!socket) {
          socket = io({ path: '/api/socket' });
        }
        socket.emit('advance-turn', { gameCode });
        await get().syncGame(gameCode);
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
