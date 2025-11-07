'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useLobbyStore } from '@/stores/useLobbyStore';

const JoinGameButton = ({
  code,
  isPlayer,
}: {
  code: string;
  isPlayer: boolean;
  userId: string;
  userName: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/lobby/${code}`);
  };
  return (
    <Button onClick={handleClick} className="md:mt-0 mt-4">
      {isPlayer ? 'Resume' : 'Join'}
    </Button>
  );
};
export default JoinGameButton;
