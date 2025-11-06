export type FriendType = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export type PendingRequestType = {
  id: string;
  sender: FriendType;
};

