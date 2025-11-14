import {
  createNewLobby,
  inviteFriendToLobby,
  addPlayerToLobby,
  getLobbyByCode,
  removePlayerFromLobby,
  updateGameSettings,
} from '@/actions/lobby.action';
import { startGameInDb, assignRolesToPlayers } from '@/actions/game.action';
import { GameSettingsType } from '@/lib/types/game.type';
import { create } from 'zustand';
import { useRouter } from 'next/navigation';
import { devtools } from 'zustand/middleware';
import { toast } from 'sonner';
import io from 'socket.io-client';

type Player = { id: string; name: string; isHost: boolean; isReady: boolean };
type RoleCard = { id: string; name: string; description: string };
type BackendPlayer = { userId: string; isReady: boolean; name: string };
type SelectedRole = RoleCard & { quantity: number };

type LobbyStore = {
  roomCode: string;
  hostId: string;
  players: Player[];
  invitedFriends: string[];
  selectedRoles: SelectedRole[];
  roundTimer: number;
  minPlayers: number;
  maxPlayers: number;
  lobbyStatus: 'waiting' | 'ready' | 'started';
  isCreatingGame: boolean;

  socket: ReturnType<typeof io> | null;
  isHost: boolean;
  connectToLobbySocket: (lobbyCode: string, isHost: boolean) => void;
  disconnectLobbySocket: () => void;

  setPlayers: (players: Player[]) => void;
  setInvitedFriends: (ids: string[]) => void;
  setRoomCode: (code: string) => void;
  setHostId: (id: string) => void;
  syncLobby: (code: string) => Promise<void>;
  addPlayer: (playerId: string, userName: string) => Promise<void>;
  removePlayer: (playerId: string) => void;
  inviteFriend: (friendId: string) => Promise<void>;
  setSelectedRoles: (
    role: RoleCard,
    action: 'add' | 'remove' | 'toggle'
  ) => void;
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
    socket: null,
    isHost: false,

    connectToLobbySocket: (lobbyCode: string, isHost: boolean) => {
      if (get().socket) return;
      console.log('Connecting to socket', lobbyCode, isHost);
      const socket = io('/', { path: '/api/socket' });
      set({ socket, isHost });
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id, 'joining lobby', lobbyCode);
        socket.emit('join-lobby', lobbyCode);
      });
      console.log('Registering lobby-settings-updated handler');
      socket.on('lobby-settings-updated', (settings: GameSettingsType) => {
        console.log('Received lobby-settings-updated', settings);
        if (settings.selectedRoles)
          set({
            selectedRoles: settings.selectedRoles.map((role) => ({
              ...role,
              quantity: (role as SelectedRole).quantity || 1,
            })),
          });
        if (settings.roundTimer) set({ roundTimer: settings.roundTimer });
      });
    },
    disconnectLobbySocket: () => {
      const socket = get().socket;
      if (socket) {
        socket.disconnect();
        set({ socket: null });
      }
    },
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
    reset: () => {
      get().disconnectLobbySocket();
      set({
        roomCode: '',
        hostId: '',
        players: [],
        invitedFriends: [],
        selectedRoles: [],
        roundTimer: 180,
        lobbyStatus: 'waiting',
        isCreatingGame: false,
        socket: null,
        isHost: false,
      });
    },
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
          selectedRoles:
            (game.settings as GameSettingsType)?.selectedRoles?.map((role) => ({
              ...role,
              quantity: (role as SelectedRole).quantity || 1,
            })) || [],
          roundTimer: (game.settings as GameSettingsType)?.roundTimer || 180,
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
    setSelectedRoles: (role, action) => {
      const state = get();
      const existing = state.selectedRoles.find((r) => r.id === role.id);
      let newSelectedRoles = state.selectedRoles;
      if (role.name === 'Saboteur' || role.name === 'Passenger') {
        if (action === 'toggle') {
          if (existing) {
            newSelectedRoles = state.selectedRoles.filter(
              (r) => r.id !== role.id
            );
          } else {
            newSelectedRoles = [
              ...state.selectedRoles,
              { ...role, quantity: 1 },
            ];
          }
        } else if (existing) {
          const newQty =
            action === 'add' ? existing.quantity + 1 : existing.quantity - 1;
          if (newQty < 1) {
            newSelectedRoles = state.selectedRoles.filter(
              (r) => r.id !== role.id
            );
          } else {
            newSelectedRoles = state.selectedRoles.map((r) =>
              r.id === role.id ? { ...r, quantity: newQty } : r
            );
          }
        } else if (action === 'add') {
          newSelectedRoles = [...state.selectedRoles, { ...role, quantity: 1 }];
        }
      } else {
        if (action === 'toggle') {
          if (existing) {
            newSelectedRoles = state.selectedRoles.filter(
              (r) => r.id !== role.id
            );
          } else {
            newSelectedRoles = [
              ...state.selectedRoles,
              { ...role, quantity: 1 },
            ];
          }
        } else if (existing) {
          newSelectedRoles = state.selectedRoles.filter(
            (r) => r.id !== role.id
          );
        } else if (action === 'add') {
          newSelectedRoles = [...state.selectedRoles, { ...role, quantity: 1 }];
        }
      }
      set({ selectedRoles: newSelectedRoles });

      const { socket, isHost, roomCode, roundTimer } = get();
      if (isHost && roomCode) {
        updateGameSettings(roomCode, {
          selectedRoles: newSelectedRoles,
          roundTimer,
        }).catch((error) => {
          console.error('Failed to update DB', error);
        });
      }
      if (isHost && socket && roomCode) {
        console.log('Emitting update-lobby-settings from setSelectedRoles', {
          lobbyCode: roomCode,
          settings: { selectedRoles: newSelectedRoles, roundTimer },
        });
        socket.emit('update-lobby-settings', {
          lobbyCode: roomCode,
          settings: { selectedRoles: newSelectedRoles, roundTimer },
        });
      }
    },
    setRoundTimer: async (minutes) => {
      const roundTimer = minutes * 60;
      set({ roundTimer });
      const { roomCode, selectedRoles, socket, isHost } = get();
      if (isHost && roomCode) {
        try {
          await updateGameSettings(roomCode, {
            selectedRoles,
            roundTimer,
          });
        } catch (error) {
          console.error('Failed to update DB', error);
        }
      }
      if (isHost && socket && roomCode) {
        console.log('Emitting update-lobby-settings from setRoundTimer', {
          lobbyCode: roomCode,
          settings: { selectedRoles, roundTimer },
        });
        socket.emit('update-lobby-settings', {
          lobbyCode: roomCode,
          settings: { selectedRoles, roundTimer },
        });
      }
    },
    setPlayerReady: (playerId: string, ready: boolean) => {
      set((state) => ({
        players: state.players.map((player) =>
          player.id === playerId ? { ...player, isReady: ready } : player
        ),
      }));
    },
    startGame: async () => {
      const { roomCode, socket, players } = get();
      if (!roomCode || !socket) return;

      try {
        await startGameInDb(roomCode);
        await assignRolesToPlayers(roomCode);
        socket.emit('game-started', { lobbyCode: roomCode });
      } catch (error) {
        console.error('Failed to start game:', error);
        toast.error('Failed to start game');
      }
    },
  }))
);
