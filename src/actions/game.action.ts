import prisma from '@/lib/prisma';
// import { getAuthenticatedUser } from '@/lib/auth-server';

export async function getGamesByUser(userId: string) {
  try {
    const games = await prisma.game.findMany({
      where: {
        OR: [
          { hostId: userId },
          { players: { some: { id: userId } } },
          { invites: { some: { recipientId: userId } } },
        ],
      },
      include: {
        players: true,
      },
    });

    return games;
  } catch (error) {
    console.error('Error fetching games by user:', error);
    throw new Error('Failed to fetch games');
  }
}
