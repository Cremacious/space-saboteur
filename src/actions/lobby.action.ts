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

export async function getLobbyByCode(code: string) {
  try {
    const game = await prisma.game.findUnique({
      where: { code },
      include: {
        host: true,
        invites: true,
        players: true,
      },
    });
    if (!game) {
      throw new Error('Game not found');
    }
    return game;
  } catch (error) {
    console.error('Error fetching game by code:', error);
    throw new Error('Failed to fetch game');
  }
}

export async function checkAuthorizedGameAccess(code: string, userId: string) {
  try {
    const game = await prisma.game.findUnique({
      where: { code },
      include: {
        host: true,
        invites: true,
        players: true,
      },
    });
    if (!game) {
      throw new Error('Game not found');
    }
    const isHost = game.hostId === userId;
    const isPlayer = game.players.some((player) => player.userId === userId);
    const isInvited = game.invites.some(
      (invite) => invite.recipientId === userId
    );
    if (!isHost && !isPlayer && !isInvited) {
      return { success: false, game: null };
    }
    console.log(userId);
    return { success: true, game };
  } catch (error) {
    console.error('Error checking authorized game access:', error);
    throw new Error('Failed to check authorized game access');
  }
}


