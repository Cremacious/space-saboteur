'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const JoinGameButton = ({
  code,
  isPlayer,
}: {
  code: string;
  isPlayer: boolean;
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
