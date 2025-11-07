'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useLobbyStore } from '@/stores/useLobbyStore';

import { addPlayerToLobby } from '@/actions/lobby.action';

const JoinGameButton = ({
  code,
  isPlayer,
  isInvited,
  userId,
}: {
  code: string;
  isPlayer: boolean;
  isInvited: boolean;
  userId: string;
  userName: string;
}) => {
  const router = useRouter();

  const handleClick = async () => {
    if (isInvited && !isPlayer) {
      await addPlayerToLobby(code, userId);
    }
    router.push(`/lobby/${code}`);
  };

  return (
    <Button onClick={handleClick} className="md:mt-0 mt-4">
      {isPlayer ? 'Resume Hosting' : isInvited ? 'Join Game' : 'JoinX'}
    </Button>
  );
};
export default JoinGameButton;
