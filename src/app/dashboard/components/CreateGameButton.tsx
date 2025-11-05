'use client';
import { Button } from '@/components/ui/button';

const CreateGameButton = () => {
  const handleClick = () => {
    console.log('Create New Game button clicked');
  };

  return (
    <Button className="w-full md:w-auto" onClick={handleClick}>
      Create New Game
    </Button>
  );
};
export default CreateGameButton;
