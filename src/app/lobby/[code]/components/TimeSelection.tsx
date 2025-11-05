'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLobbyStore } from '@/stores/useLobbyStore';


const MINUTES = [1, 2, 3, 4, 5];

const TimeSelection = () => {
  const [selected, setSelected] = useState(3);
  const { setRoundTimer, roundTimer } = useLobbyStore();

  const handleSelect = (minute: number) => {
    setSelected(minute);
    setRoundTimer(minute);
    console.log('Round time set to:', roundTimer, 'seconds');
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 space-y-6">
      <div className="text-white text-4xl space-font">
        {roundTimer / 60} minute{roundTimer / 60 > 1 ? 's' : ''}
      </div>
      <div className="flex gap-2 md:gap-4 justify-center">
        {MINUTES.map((minute) => (
          <Button
            key={minute}
            variant={selected === minute ? 'defaultLarge' : 'outline'}
            className={`space-font text-lg md:text-2xl px-4 py-2 rounded-full transition-all duration-200 shadow-lg ${
              selected === minute
                ? 'bg-cyan-400 text-black border-cyan-400 scale-105'
                : 'bg-cyan-800 text-cyan-300 border-cyan-700 hover:bg-cyan-700 hover:text-white'
            }`}
            onClick={() => handleSelect(minute)}
          >
            {minute}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
