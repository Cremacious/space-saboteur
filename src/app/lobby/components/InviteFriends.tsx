import { Button } from '@/components/ui/button';

const InviteFriends = () => {
  return (
    <div className="blue-box">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Invite Friends
      </h3>
      <ul className="space-y-3">
        <li className="metallic-list-item flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full inline-block" />
            <span className="space-font text-lg text-white">Alex</span>
          </div>
          <Button size={'sm'} className="text-sm">
            Sent
          </Button>
        </li>
        <li className="metallic-list-item flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full inline-block" />
            <span className="space-font text-lg text-white">Alex</span>
          </div>
          <Button size={'sm'} className="text-sm">
            Invite
          </Button>
        </li>
      </ul>
    </div>
  );
};
export default InviteFriends;
