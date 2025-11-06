import { createNewLobby, inviteFriendToLobby } from '@/actions/lobby.action';
import { create } from 'zustand';
import { useRouter } from 'next/navigation';
import { devtools } from 'zustand/middleware';
import { toast } from 'sonner';

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

  setPlayers: (players: Player[]) => void;
  setRoomCode: (code: string) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  inviteFriend: (friendId: string) => void;
  setSelectedRoles: (roles: RoleCard[]) => void;
  setRoundTimer: (minutes: number) => void;
  setPlayerReady: (playerId: string, ready: boolean) => void;
  startGame: () => void;
  createGame: (
    router: ReturnType<typeof useRouter>
  ) => Promise<{ code: string; hostId: string } | undefined>;
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
          players: game.players.map((p: BackendPlayer) => {
            console.log(
              'Comparing:',
              p.userId,
              game.hostId,
              p.userId === game.hostId
            );
            return {
              id: p.userId,
              name: p.name,
              isHost: p.userId === game.hostId,
              isReady: p.isReady,
            };
          }),
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
    setRoomCode: (code) => {
      set({ roomCode: code });
    },
    setPlayers: (players) => {
      set({ players });
    },
    addPlayer: (player) => {},
    removePlayer: (playerId) => {
      /* put logic here */
    },
    inviteFriend: async (friendId: string) => {
      try {
        await inviteFriendToLobby(get().roomCode, friendId);
        set((state) => ({
          invitedFriends: [...state.invitedFriends, friendId],
        }));
        toast.success('Invite sent!');
      } catch (error) {
        console.log('Failed to send invite:', error);
        toast.error('Failed to send invite');
      }
    },
    setSelectedRoles: (roles) => {
      /* put logic here */
    },
    setRoundTimer: (minutes) => {
      set({ roundTimer: minutes * 60 });
    },
    setPlayerReady: (playerId, ready) => {},
    startGame: () => {
      /* put logic here */
    },
  }))
);
