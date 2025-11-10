import { create } from 'zustand';

type OnlineStore = {
  onlineFriends: string[];
  setOnlineFriends: (ids: string[]) => void;
};

export const useOnlineStore = create<OnlineStore>((set) => ({
  onlineFriends: [],
  setOnlineFriends: (ids) => set({ onlineFriends: ids }),
}));
