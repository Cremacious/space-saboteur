'use client';
// import { useSession } from 'better-auth/react'; // Assuming Better Auth provides this hook
import { useSession } from '@/lib/auth-client';
import SocketProvider from './SocketProvider';

export default function AuthSocketWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession(); 

  return (
    <>
      {session?.user && <SocketProvider userId={session.user.id} />}
      {children}
    </>
  );
}