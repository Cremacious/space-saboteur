import Image from 'next/image';
import saboteurImage from '@/assets/roles/saboteur-profile.png';

const ROLE_NAME = 'Saboteur';
const ROLE_DESCRIPTION = `The saboteur's goal is to secretly undermine the mission without getting caught.`;
const ROLE_ABILITY = `Wakes at 2 alongside other saboteurs. *If alone, they can look at one card in the center.`;

const RoleCard = () => {
  return (
    <div className="metallic-box hoverAnimate max-w-sm mx-auto border-4 border-cyan-400 shadow-[0_0_24px_#00f2ff80] rounded-3xl overflow-hidden flex flex-col bg-linear-to-br from-gray-900 via-gray-800 to-gray-950">
      <div className="w-full px-4 pt-4 pb-2 flex items-center justify-center border-b-2 border-cyan-400 ">
        <span className="text-white text-2xl space-font tracking-widest">
          {ROLE_NAME}
        </span>
      </div>

      <div className="relative w-full h-64 bg-gray-900 border-b-2 border-cyan-400 flex items-center justify-center">
        <Image
          src={saboteurImage}
          alt={ROLE_NAME}
          fill
          className="object-contain"
        />
      </div>

      <div className="py-4 w-full flex flex-col gap-3 flex-1">
        <div className="text-white space-font font-semibold space-text text-center mb-2">
          {ROLE_DESCRIPTION}
        </div>
        <div className="bg-cyan-900/30 border border-cyan-400 rounded-xl p-3 text-cyan-200  font-mono shadow-inner">
          <span className="uppercase text-cyan-300 space-font tracking-widest">
            Ability:
          </span>
          <br />
          <div className="space-font">{ROLE_ABILITY}</div>
        </div>
      </div>
    </div>
  );
};
export default RoleCard;
