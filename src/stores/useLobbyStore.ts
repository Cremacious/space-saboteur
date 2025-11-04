import { create } from 'zustand';

type Player = { id: string; name: string; isHost: boolean; isReady: boolean };
type RoleCard = { id: number; name: string; description: string };

export const useLobbyStore = create<{
  roomCode: string;
  hostId: string;
  players: Player[];
  invitedFriends: string[];
  selectedRoles: RoleCard[];
  roundTimer: number;
  minPlayers: number;
  maxPlayers: number;
  lobbyStatus: 'waiting' | 'ready' | 'started';
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  inviteFriend: (friendId: string) => void;
  setSelectedRoles: (roles: RoleCard[]) => void;
  setRoundTimer: (seconds: number) => void;
  setPlayerReady: (playerId: string, ready: boolean) => void;
  startGame: () => void;
}>((set, get) => ({
  roomCode: '',
  hostId: '',
  players: [],
  invitedFriends: [],
  selectedRoles: [],
  roundTimer: 120,
  minPlayers: 3,
  maxPlayers: 12,
  lobbyStatus: 'waiting',
  addPlayer: (player) => { /* put logic here */ },
  removePlayer: (playerId) => { /* put logic here */ },
  inviteFriend: (friendId) => { /* put logic here */ },
  setSelectedRoles: (roles) => { /* put logic here */ },
  setRoundTimer: (seconds) => { /* put logic here */ },
  setPlayerReady: (playerId, ready) => { /* put logic here */ },
  startGame: () => { /* put logic here */ },
}));