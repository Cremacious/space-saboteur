import { create } from 'zustand';
import {
  getFriendsList,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from '@/actions/friend.action';

interface Friend {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface PendingRequest {
  id: string;
  sender: Friend;
}

interface FriendStore {
  friends: Friend[];
  pendingRequests: PendingRequest[];
  isLoading: boolean;
  loadFriends: () => Promise<void>;
  sendFriendRequest: (email: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  rejectFriendRequest: (requestId: string) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
}

export const useFriendStore = create<FriendStore>((set, get) => ({
  friends: [],
  pendingRequests: [],
  isLoading: false,
  loadFriends: async () => {
    set({ isLoading: true });
    try {
      const data = await getFriendsList();
      set({ friends: data.friends, pendingRequests: data.pendingRequests });
    } catch (error) {
      console.error('Failed to load friends:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  sendFriendRequest: async (email: string) => {
    set({ isLoading: true });
    try {
      await sendFriendRequest(email);
      await get().loadFriends(); // Reload after sending
    } catch (error) {
      console.error('Failed to send friend request:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  acceptFriendRequest: async (requestId: string) => {
    set({ isLoading: true });
    try {
      await acceptFriendRequest(requestId);
      await get().loadFriends(); // Reload after accepting
    } catch (error) {
      console.error('Failed to accept friend request:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  rejectFriendRequest: async (requestId: string) => {
    set({ isLoading: true });
    try {
      await rejectFriendRequest(requestId);
      await get().loadFriends(); // Reload after rejecting
    } catch (error) {
      console.error('Failed to reject friend request:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  removeFriend: async (friendId: string) => {
    set({ isLoading: true });
    try {
      await removeFriend(friendId);
      await get().loadFriends(); // Reload after removing
    } catch (error) {
      console.error('Failed to remove friend:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
