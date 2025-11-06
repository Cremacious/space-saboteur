'use server';

import prisma from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-server';

export async function getFriendsList() {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }

    const friendships = await prisma.friend.findMany({
      where: {
        OR: [
          { userId: user.id, status: 'accepted' },
          { friendId: user.id, status: 'accepted' },
        ],
      },
      include: {
        user: true,
        friend: true,
      },
    });

    const friends = friendships.map((f) => {
      const otherUser = f.userId === user.id ? f.friend : f.user;
      return {
        id: otherUser.id,
        name: otherUser.name,
        email: otherUser.email,
        image: otherUser.image,
      };
    });

    const pendingRequests = await prisma.friend.findMany({
      where: {
        friendId: user.id,
        status: 'pending',
      },
      include: {
        user: true, 
      },
    });

    const pending = pendingRequests.map((p) => ({
      id: p.id,
      sender: {
        id: p.user.id,
        name: p.user.name,
        email: p.user.email,
        image: p.user.image,
      },
    }));

    return {
      friends,
      pendingRequests: pending,
    };
  } catch (error) {
    console.error('Error getting friends list:', error);
    throw new Error('Failed to get friends list');
  }
}

export async function sendFriendRequest(recipientEmail: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }

    const recipient = await prisma.user.findUnique({
      where: { email: recipientEmail },
    });
    if (!recipient) {
      throw new Error('User not found');
    }

    if (recipient.id === user.id) {
      throw new Error('Cannot send friend request to yourself');
    }

    const existingRequest = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId: user.id, friendId: recipient.id },
          { userId: recipient.id, friendId: user.id },
        ],
      },
    });
    if (existingRequest) {
      throw new Error('Friend request already exists');
    }

    await prisma.friend.create({
      data: {
        userId: user.id,
        friendId: recipient.id,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw new Error('Failed to send friend request');
  }
}

export async function acceptFriendRequest(requestId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }

    const friendRequest = await prisma.friend.findUnique({
      where: { id: requestId },
    });
    if (!friendRequest || friendRequest.friendId !== user.id) {
      throw new Error('Friend request not found or not authorized');
    }

    if (friendRequest.status !== 'pending') {
      throw new Error('Friend request is not pending');
    }

    await prisma.friend.update({
      where: { id: requestId },
      data: { status: 'accepted' },
    });
  } catch (error) {
    console.error('Error accepting friend request:', error);
    throw new Error('Failed to accept friend request');
  }
}

export async function rejectFriendRequest(requestId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }

    const friendRequest = await prisma.friend.findUnique({
      where: { id: requestId },
    });
    if (!friendRequest || friendRequest.friendId !== user.id) {
      throw new Error('Friend request not found or not authorized');
    }

    if (friendRequest.status !== 'pending') {
      throw new Error('Friend request is not pending');
    }

    await prisma.friend.delete({
      where: { id: requestId },
    });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    throw new Error('Failed to reject friend request');
  }
}

export async function removeFriend(friendId: string) {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }

    const friendship = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId: user.id, friendId },
          { userId: friendId, friendId: user.id },
        ],
        status: 'accepted',
      },
    });
    if (!friendship) {
      throw new Error('Friendship not found');
    }

    await prisma.friend.delete({
      where: { id: friendship.id },
    });
  } catch (error) {
    console.error('Error removing friend:', error);
    throw new Error('Failed to remove friend');
  }
}
