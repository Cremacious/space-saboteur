import { createNewLobby } from '@/actions/lobby.action';
import { create } from 'zustand';
import { useRouter } from 'next/navigation';

// TODO: Add host to list of players
// TODO: Add players via invite
// TODO: Only let host and invited view lobby

type Player = { id: string; name: string; isHost: boolean; isReady: boolean };
type RoleCard = { id: number; name: string; description: string };
type BackendPlayer = { userId: string; isReady: boolean; name: string };

type LobbyStore = {
  roomCode: string;
  hostId: string;
  players: Player[];
  invitedFriends: string[];
  selectedRoles: RoleCard[];
  roundTimer: number;
  minPlayers: number;
  maxPlayers: number;
  lobbyStatus: 'waiting' | 'ready' | 'started';
  isCreatingGame: boolean;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  inviteFriend: (friendId: string) => void;
  setSelectedRoles: (roles: RoleCard[]) => void;
  setRoundTimer: (seconds: number) => void;
  setPlayerReady: (playerId: string, ready: boolean) => void;
  startGame: () => void;
  createGame: (
    router: ReturnType<typeof useRouter>
  ) => Promise<{ code: string; hostId: string } | undefined>;
};

export const useLobbyStore = create<LobbyStore>((set, get) => ({
  roomCode: '',
  hostId: '',
  players: [],
  invitedFriends: [],
  selectedRoles: [],
  roundTimer: 120,
  minPlayers: 3,
  maxPlayers: 12,
  lobbyStatus: 'waiting',
  isCreatingGame: false,
  createGame: async (
    router: ReturnType<typeof useRouter>
  ): Promise<{ code: string; hostId: string } | undefined> => {
    set({ isCreatingGame: true });
    try {
      const game = await createNewLobby();

      set({
        roomCode: game.code,
        hostId: game.hostId,
        lobbyStatus: 'waiting',
        players: game.players.map((p: BackendPlayer) => ({
          id: p.userId,
          name: p.name,
          isHost: p.userId === game.hostId,
          isReady: p.isReady,
        })),
      });
      router.push(`/lobby/${game.code}`);
    } catch (error) {
      console.error('Failed to create lobby:', error);
      return undefined;
    } finally {
      set({ isCreatingGame: false });
    }
  },
  addPlayer: (player) => {
    /* put logic here */
  },
  removePlayer: (playerId) => {
    /* put logic here */
  },
  inviteFriend: (friendId) => {
    /* put logic here */
  },
  setSelectedRoles: (roles) => {
    /* put logic here */
  },
  setRoundTimer: (seconds) => {
    /* put logic here */
  },
  setPlayerReady: (playerId, ready) => {
    /* put logic here */
  },
  startGame: () => {
    /* put logic here */
  },
}));
