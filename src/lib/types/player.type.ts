export type PlayerType = {
  id: string;
  userId: string;
  name: string;
  isHost?: boolean;
  isReady?: boolean;
  eliminated?: boolean;
  roleId?: string | null;
};
