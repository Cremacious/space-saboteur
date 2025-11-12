'use server';

import prisma from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { GameSettingsType } from '@/lib/types/game.type';

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
    const isPlayer = game.players.some(
      (player: { userId: string }) => player.userId === userId
    );
    const isInvited = game.invites.some(
      (invite: { recipientId: string }) => invite.recipientId === userId
    );
    if (!isHost && !isPlayer && !isInvited) {
      return { success: false, game: null };
    }

    return { success: true, game };
  } catch (error) {
    console.error('Error checking authorized game access:', error);
    throw new Error('Failed to check authorized game access');
  }
}

export async function inviteFriendToLobby(
  gameCode: string,
  recipientId: string
) {
  try {
    const game = await prisma.game.findUnique({
      where: { code: gameCode },
    });
    if (!game) {
      throw new Error('Game not found');
    }

    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
    });
    if (!recipient) {
      throw new Error('User not found');
    }

    await prisma.gameInvite.create({
      data: {
        gameId: game.id,
        senderId: game.hostId,
        recipientId: recipient.id,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error('Error inviting player to lobby:', error);
    throw new Error('Failed to invite player to lobby');
  }
}

export async function addPlayerToLobby(gameCode: string, userId: string) {
  try {
    const game = await prisma.game.findUnique({
      where: { code: gameCode },
    });
    if (!game) {
      throw new Error('Game not found');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const existing = await prisma.gamePlayer.findFirst({
      where: { gameId: game.id, userId: user.id },
    });
    if (existing) return;

    await prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        userId: user.id,
        name: user.name,
        isReady: false,
        eliminated: false,
      },
    });
  } catch (error) {
    console.error('Error adding player to lobby:', error);
    throw new Error('Failed to add player to lobby');
  }
}

export async function removePlayerFromLobby(gameCode: string, userId: string) {
  try {
    const game = await prisma.game.findUnique({
      where: { code: gameCode },
    });
    if (!game) {
      throw new Error('Game not found');
    }

    await prisma.gamePlayer.deleteMany({
      where: { gameId: game.id, userId },
    });

    await prisma.gameInvite.deleteMany({
      where: { gameId: game.id, recipientId: userId, status: 'pending' },
    });
  } catch (error) {
    console.error('Error removing player from lobby:', error);
    throw new Error('Failed to remove player from lobby');
  }
}

export async function updateGameSettings(
  gameCode: string,
  settings: GameSettingsType
) {
  try {
    const game = await prisma.game.update({
      where: { code: gameCode },
      data: { settings },
    });
    return { success: true, game };
  } catch (error) {
    console.error('Error updating game settings:', error);
    return { success: false, error: 'Failed to update game settings' };
  }
}
