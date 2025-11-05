import { Button } from '@/components/ui/button';

const FRIENDS_LIST = [
  { id: 1, name: 'Alex', status: 'online', invited: true },
  { id: 2, name: 'Alex', status: 'online', invited: false },
  { id: 3, name: 'Sam', status: 'offline', invited: false },
  { id: 4, name: 'Jordan', status: 'online', invited: false },
  { id: 5, name: 'Taylor', status: 'offline', invited: false },
  { id: 6, name: 'Morgan', status: 'online', invited: false },
  { id: 7, name: 'Casey', status: 'online', invited: false },
  { id: 8, name: 'Riley', status: 'offline', invited: false },
  { id: 9, name: 'Jamie', status: 'online', invited: false },
  { id: 10, name: 'Drew', status: 'offline', invited: false },
  { id: 11, name: 'Cameron', status: 'online', invited: false },
  { id: 12, name: 'Alex', status: 'online', invited: false },
  { id: 13, name: 'Sam', status: 'offline', invited: false },
  { id: 14, name: 'Jordan', status: 'online', invited: false },
  { id: 15, name: 'Taylor', status: 'offline', invited: false },
];

const InviteFriends = () => {
  return (
    <div className="blue-box ">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Invite Friends
      </h3>

      <ul className="space-y-3 overflow-y-auto max-h-[400px] md:max-h-[756px] md:pr-4 rounded-lg ">
        {FRIENDS_LIST.map((friend) => (
          <li
            key={friend.id}
            className="metallic-list-item flex items-center justify-between "
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full inline-block" />
              <span className="space-font text-lg text-white">
                {friend.name}
              </span>
            </div>
            <Button size={'sm'} className="text-sm">
              {friend.invited ? 'Sent' : 'Invite'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default InviteFriends;
