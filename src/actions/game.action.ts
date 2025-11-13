'use server';

import prisma from '@/lib/prisma';
// import { getAuthenticatedUser } from '@/lib/auth-server';
import { GameType } from '@/lib/types/game.type';

export async function getGamesByUser(userId: string) {
  try {
    const games = await prisma.game.findMany({
      where: {
        OR: [
          { hostId: userId },
          { players: { some: { userId } } },
          { invites: { some: { recipientId: userId } } },
        ],
      },
      include: {
        players: true,
        invites: true,
      },
    });

    return games.map((game: GameType) => {
      const isPlayer = game.players.some((p) => p.userId === userId);
      const isInvited = game.invites.some(
        (invite) => invite.recipientId === userId && invite.status === 'pending'
      );
      return {
        ...game,
        isPlayer,
        isInvited,
      };
    });
  } catch (error) {
    console.error('Error fetching games by user:', error);
    throw new Error('Failed to fetch games');
  }
}

export async function getGameByCode(code: string) {
  try {
    const game = await prisma.game.findUnique({
      where: { code },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        players: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
            role: true,
            votesCast: true,
            votesReceived: true,
            actions: true,
          },
        },
        invites: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
            recipient: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        actions: true,
        votes: true,
      },
    });

    if (!game) throw new Error('Game not found');

    return game;
  } catch (error) {
    console.error('Error fetching game by code', error);
    throw new Error('Failed to fetch game');
  }
}

export async function startGameInDb(gameCode: string) {
  const game = await prisma.game.findUnique({
    where: { code: gameCode },
    include: { players: true },
  });
  if (!game) throw new Error('Game not found');

  const rounds = game.players.length + 2;

  await prisma.game.update({
    where: { code: gameCode },
    data: {
      status: 'inProgress',
      rounds,
    },
  });
}

export async function setPlayerReady(gameCode: string, userId: string) {
  await prisma.gamePlayer.updateMany({
    where: {
      game: { code: gameCode },
      userId,
    },
    data: { isReady: true },
  });

  const game = await prisma.game.findUnique({
    where: { code: gameCode },
    include: { players: true },
  });
  if (!game) throw new Error('Game not found');
  const allReady = game.players.every((p) => p.isReady);

  if (allReady) {
    await prisma.game.update({
      where: { code: gameCode },
      data: { currentRound: 1, status: 'inProgress' },
    });
  }

  return { allReady };
}
