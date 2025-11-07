import {
  createNewLobby,
  inviteFriendToLobby,
  addPlayerToLobby,
  getLobbyByCode,
  removePlayerFromLobby,
  updateGameSettings,
} from '@/actions/lobby.action';
import { create } from 'zustand';
import { useRouter } from 'next/navigation';
import { devtools } from 'zustand/middleware';
import { toast } from 'sonner';

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

  setPlayers: (players: Player[]) => void;
  setInvitedFriends: (ids: string[]) => void;
  setRoomCode: (code: string) => void;
  setHostId: (id: string) => void;
  syncLobby: (code: string) => Promise<void>;
  addPlayer: (playerId: string, userName: string) => Promise<void>;
  removePlayer: (playerId: string) => void;
  inviteFriend: (friendId: string) => Promise<void>;
  setSelectedRoles: (roles: RoleCard[]) => void;
  setRoundTimer: (minutes: number) => void;
  setPlayerReady: (playerId: string, ready: boolean) => void;
  startGame: () => void;
  createGame: (
    router: ReturnType<typeof useRouter>
  ) => Promise<{ code: string; hostId: string } | undefined>;
  reset: () => void;
};

export const useLobbyStore = create<LobbyStore>()(
  devtools((set, get) => ({
    roomCode: '',
    hostId: '',
    players: [],
    invitedFriends: [],
    selectedRoles: [],
    roundTimer: 180,
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
        toast.success('Lobby created successfully!');
      } catch (error) {
        console.error('Failed to create lobby:', error);
        return undefined;
      } finally {
        set({ isCreatingGame: false });
      }
    },
    reset: () =>
      set({
        roomCode: '',
        hostId: '',
        players: [],
        invitedFriends: [],
        selectedRoles: [],
        roundTimer: 180,
        lobbyStatus: 'waiting',
        isCreatingGame: false,
      }),
    setRoomCode: (code) => {
      set({ roomCode: code });
    },
    setHostId: (id) => {
      set({ hostId: id });
    },
    setPlayers: (players) => {
      set({ players });
    },
    setInvitedFriends: (ids) => set({ invitedFriends: ids }),
    syncLobby: async (code: string) => {
      if (!code) return;
      try {
        const game = await getLobbyByCode(code);
        set({
          roomCode: game.code,
          hostId: game.hostId,
          players: game.players.map((p: BackendPlayer) => ({
            id: p.userId,
            name: p.name,
            isHost: p.userId === game.hostId,
            isReady: p.isReady,
          })),
          invitedFriends: game.invites.map(
            (invite: { recipientId: string }) => invite.recipientId
          ),
        });
      } catch (error) {
        console.error('Failed to sync lobby:', error);
        toast.error('Failed to sync lobby');
      }
    },
    addPlayer: async (playerId) => {
      if (!get().roomCode) return;
      await addPlayerToLobby(get().roomCode, playerId);
      await get().syncLobby(get().roomCode);
    },
    removePlayer: (playerId) => {
      if (!get().roomCode) return;
      removePlayerFromLobby(get().roomCode, playerId);
      get().syncLobby(get().roomCode);
    },
    inviteFriend: async (friendId: string) => {
      if (!get().roomCode) return;
      try {
        await inviteFriendToLobby(get().roomCode, friendId);
        await get().syncLobby(get().roomCode);
        toast.success('Invite sent!');
      } catch (error) {
        console.log('Failed to send invite:', error);
        toast.error('Failed to send invite');
      }
    },
    setSelectedRoles: async (roles) => {
      set({ selectedRoles: roles });
      const { roomCode, roundTimer } = get();
      await updateGameSettings(roomCode, {
        selectedRoles: roles,
        roundTimer,
      });
    },
    setRoundTimer: (minutes) => {
      set({ roundTimer: minutes * 60 });
    },
    startGame: () => {
      /* put logic here */
    },
  }))
);
