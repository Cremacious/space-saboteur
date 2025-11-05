'use client';
import { Button } from '@/components/ui/button';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { useRouter } from 'next/navigation';

const CreateGameButton = () => {
  const router = useRouter();

  const { createGame, isCreatingGame } = useLobbyStore();

  const handleClick = () => {
    createGame(router);
  };

  return (
    <Button
      className="w-full md:w-auto"
      onClick={handleClick}
      disabled={isCreatingGame}
    >
      {isCreatingGame ? 'Creating Game...' : 'Create New Game'}
    </Button>
  );
};

export default CreateGameButton;
