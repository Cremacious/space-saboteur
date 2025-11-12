import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { RoleType } from '@/lib/types/role.type';

//TODO: Replace placeholder image

type RoleSelectionCardProps = {
  card: RoleType;
  quantity: number;
  cardIsSelected: (card: RoleType) => boolean;
  handleRoleSelect: (role: RoleType) => void;
  onAdd: () => void;
  onRemove: () => void;
};

// const quantity = 1;

const RoleSelectionCard = ({
  card,
  cardIsSelected,
  handleRoleSelect,
  onAdd,
  onRemove,
  quantity,
}: RoleSelectionCardProps) => {
  const isSelected = cardIsSelected(card);
  return (
    <div
      onClick={() => handleRoleSelect(card)}
      key={card.id}
      className={`metallic-box hoverAnimate w-full max-w-[340px] h-[540px] mx-auto border-4 border-cyan-400 rounded-3xl overflow-hidden flex flex-col bg-linear-to-br from-gray-900 via-gray-800 to-gray-950 cursor-pointer transition-all duration-150 ${
        isSelected ? 'ring-4 ring-cyan-400' : ''
      }`}
    >
      <div className="w-full px-4 pt-4 pb-2 flex items-center justify-center border-b-2 border-cyan-400">
        <span className="text-white text-2xl space-font tracking-widest">
          {card.name}
        </span>
      </div>

      <div className="relative w-full h-64 bg-gray-900 border-b-2 border-cyan-400 flex items-center justify-center">
        <Image
          src={card.image ?? '/placeholder.png'}
          alt={card.name}
          fill
          className="object-contain"
        />
      </div>

      <div className="py-4 w-full flex flex-col flex-1">
        <div className="flex-1 flex flex-col items-center justify-center min-h-20">
          <div className="text-white space-font font-semibold space-text text-center mb-2">
            {card.description}
          </div>
        </div>
        {isSelected && (
          <div className="bg-cyan-900/30 border border-cyan-400 rounded-xl p-2 text-cyan-200 font-mono shadow-inner flex flex-col items-center mt-2">
            <span className="uppercase text-cyan-300 space-font tracking-widest text-xs mt-1">
              Selected
            </span>
            {(card.id === 1 || card.id === 9) && (
              <div className="flex flex-row gap-4 justify-center items-center mt-1 mb-0.5">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  className="flex items-center justify-center bg-white px-2 py-1"
                >
                  <Minus className="text-black" />
                </Button>
                <div className="text-2xl text-white space-font">{quantity}</div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd();
                  }}
                  className="flex items-center justify-center bg-white px-2 py-1"
                >
                  <Plus className="text-black" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default RoleSelectionCard;
