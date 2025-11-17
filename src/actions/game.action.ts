'use server';

import prisma from '@/lib/prisma';
// import { getAuthenticatedUser } from '@/lib/auth-server';
import { GameType } from '@/lib/types/game.type';
import { ROLE_TURN_ORDER } from '@/lib/constants/roleTurnOrder';

export async function getAllRoles() {
  try {
    const roles = await prisma.role.findMany();
    return roles;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw new Error('Failed to fetch roles');
  }
}

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
        centerCards: true,
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

export async function assignRolesToPlayers(gameCode: string) {
  const game = await prisma.game.findUnique({
    where: { code: gameCode },
    include: { players: true },
  });
  if (!game) throw new Error('Game not found');

  interface GameSettings {
    selectedRoles?: { id: string; quantity: number }[];
    [key: string]: unknown;
  }

  let settings: GameSettings = game.settings as GameSettings;
  if (typeof settings === 'string') {
    try {
      settings = JSON.parse(settings) as GameSettings;
    } catch {
      settings = {};
    }
  }
  const selectedRoles = Array.isArray(settings.selectedRoles)
    ? settings.selectedRoles
    : [];

  if (selectedRoles.length === 0) {
    throw new Error('No roles have been selected for this game.');
  }

  const rolePool: string[] = [];
  selectedRoles.forEach((role) => {
    for (let i = 0; i < role.quantity; i++) {
      rolePool.push(role.id);
    }
  });

  if (rolePool.length < game.players.length) {
    throw new Error('Not enough roles selected for the number of players.');
  }

  for (let i = rolePool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rolePool[i], rolePool[j]] = [rolePool[j], rolePool[i]];
  }

  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    const roleId = rolePool[i];
    await prisma.gamePlayer.update({
      where: { id: player.id },
      data: { roleId },
    });
  }

  await prisma.game.update({
    where: { code: gameCode },
    data: { currentRound: 1, status: 'inProgress' },
  });

  const allRoles = [...rolePool];
  const playerRoles = allRoles.slice(0, game.players.length);
  const centerRoles = allRoles.slice(
    game.players.length,
    game.players.length + 3
  );

  for (let i = 0; i < game.players.length; i++) {
    await prisma.gamePlayer.update({
      where: { id: game.players[i].id },
      data: { roleId: playerRoles[i] },
    });
  }

  for (let i = 0; i < 3; i++) {
    await prisma.centerCard.create({
      data: {
        gameId: game.id,
        roleId: centerRoles[i],
        position: i,
      },
    });
  }

  return true;
}

export async function advanceTurn(gameCode: string) {
  const game = await prisma.game.findUnique({
    where: { code: gameCode },
    include: { players: true },
  });
  if (!game) throw new Error('Game not found');

  const assignedRoles = game.players.map((p) => p.roleId);
  const allRoles = await prisma.role.findMany();

  const assignedRoleObjs = allRoles.filter((role) =>
    assignedRoles.includes(role.id)
  );
  const turnOrder = ROLE_TURN_ORDER.map((roleName) =>
    assignedRoleObjs.find((r) => r.name === roleName)
  )
    .filter(Boolean)
    .map((r) => r!.id);

  const nextTurn =
    turnOrder.length === 0 ? 0 : (game.currentTurn + 1) % turnOrder.length;

  await prisma.game.update({
    where: { code: gameCode },
    data: { currentTurn: nextTurn },
  });

  return nextTurn;
}

export async function swapPlayerRoles(
  gameCode: string,
  playerId1: string,
  playerId2: string
) {
  const game = await prisma.game.findUnique({
    where: { code: gameCode },
    include: { players: true },
  });
  if (!game) throw new Error('Game not found');

  const player1 = game.players.find((p) => p.id === playerId1);
  const player2 = game.players.find((p) => p.id === playerId2);
  if (!player1 || !player2) throw new Error('Players not found');

  const role1 = player1.roleId;
  const role2 = player2.roleId;

  await prisma.gamePlayer.update({
    where: { id: player1.id },
    data: { roleId: role2 },
  });
  await prisma.gamePlayer.update({
    where: { id: player2.id },
    data: { roleId: role1 },
  });

  return true;
}

export async function swapDrunkWithCenter(
  gameCode: string,
  playerId: string,
  centerPosition: number
) {
  const game = await prisma.game.findUnique({
    where: { code: gameCode },
    include: {
      players: true,
      centerCards: true,
    },
  });
  if (!game) throw new Error('Game not found');

  const player = game.players.find((p) => p.id === playerId);
  const centerCard = game.centerCards.find(
    (c) => c.position === centerPosition
  );
  if (!player || !centerCard)
    throw new Error('Player or center card not found');

  const playerRoleId = player.roleId;
  const centerRoleId = centerCard.roleId;

  await prisma.gamePlayer.update({
    where: { id: player.id },
    data: { roleId: centerRoleId },
  });
  await prisma.centerCard.update({
    where: { id: centerCard.id },
    data: { roleId: playerRoleId ?? '' },
  });

  return true;
}

export async function startVotingPhase(gameCode: string) {
  await prisma.game.update({
    where: { code: gameCode },
    data: { status: 'voting' },
  });
}

export async function castVote(
  gameCode: string,
  voterId: string,
  votedForId: string,
  round: number
) {
  await prisma.vote.upsert({
    where: {
      gameId_voterId_round: {
        gameId: gameCode,
        voterId: voterId,
        round: round,
      },
    },
    update: { votedForId },
    create: { gameId: gameCode, voterId, votedForId, round },
  });
}

export async function finishVotingPhase(gameCode: string) {
  const game = await prisma.game.findUnique({
    where: { code: gameCode },
    include: { votes: true, players: true },
  });
  if (!game) throw new Error('Game not found');

  const round = game.currentRound;
  const votes = game.votes.filter((v) => v.round === round);

  // Tally
  const tally: Record<string, number> = {};
  for (const vote of votes) {
    tally[vote.votedForId] = (tally[vote.votedForId] || 0) + 1;
  }
  const maxVotes = Math.max(...Object.values(tally));
  const candidates = Object.entries(tally)
    .filter(([_, count]) => count === maxVotes)
    .map(([id]) => id);

  let eliminatedId: string | null = null;
  if (candidates.length === 1) {
    eliminatedId = candidates[0];
  } else if (candidates.length > 1) {
    return { tie: true, candidates };
  } else {
    const activePlayers = game.players.filter((p) => !p.eliminated);
    eliminatedId =
      activePlayers[Math.floor(Math.random() * activePlayers.length)]?.id;
  }

  if (eliminatedId) {
    await prisma.gamePlayer.update({
      where: { id: eliminatedId },
      data: { eliminated: true },
    });
    await prisma.game.update({
      where: { code: gameCode },
      data: { currentRound: game.currentRound + 1, status: 'turns' },
    });
    return { eliminatedId };
  }
  return {};
}
