import prisma from '@/lib/prisma';
// import { getAuthenticatedUser } from '@/lib/auth-server';

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

    return games.map((game) => {
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
