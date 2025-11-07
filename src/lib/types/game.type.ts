import { PlayerType } from './player.type';
import { RoleType } from './role.type';

export type GameType = {
  id: string;
  code: string;
  hostId: string;
  status: string;
  expiresAt: Date;
  rounds: number;
  currentRound: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  players: PlayerType[];
  invites: {
    recipientId: string;
    status: string;
  }[];
};

export type GameSettingsType = {
  selectedRoles: RoleType[];
  roundTimer: number;
  minPlayers?: number;
  maxPlayers?: number;
};
