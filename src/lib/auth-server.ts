import { auth } from './auth';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

export async function getCurrentServerUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }

  return session.user;
}

export async function getAuthenticatedUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return {
      user: null,
      error: 'User session not found. Please sign in again.',
    };
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    return { user: null, error: 'User not found' };
  }
  return { user, error: null };
}
