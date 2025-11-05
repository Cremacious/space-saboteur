'use server';

import prisma from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-server';

export async function createNewLobby() {
  try {
    const { user, error } = await getAuthenticatedUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newGame = await prisma.game.create({
      data: {
        code,
        hostId: user.id,
        status: 'waiting',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        rounds: 0,
        currentRound: 0,
        settings: {},
        players: {
          create: [
            {
              userId: user.id,
              name: user.name,
              isReady: false,
              eliminated: false,
            },
          ],
        },
      },
      include: {
        players: true,
      },
    });

    return {
      code: newGame.code,
      hostId: newGame.hostId,
      players: newGame.players,
    };
  } catch (error) {
    console.error('Error creating new game:', error);
    throw new Error('Failed to create new game');
  }
}
