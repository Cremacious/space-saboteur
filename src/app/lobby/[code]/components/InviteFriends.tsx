'use client';
import { Button } from '@/components/ui/button';
import { useFriendStore } from '@/stores/useFriendStore';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { Orbit } from 'lucide-react';
import { useEffect } from 'react';

const InviteFriends = ({}: {
  currentUserId: string;
  currentUserName: string;
}) => {
  const { friends, loadFriends, isLoading } = useFriendStore();
  const { inviteFriend, invitedFriends, hostId } = useLobbyStore();

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  return (
    <div className="blue-box ">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Invite Friends
      </h3>

      <ul className="space-y-3 overflow-y-auto min-h-64 max-h-[400px] md:max-h-[756px] md:pr-4 rounded-lg ">
        {isLoading && (
          <div className="flex flex-col justify-center items-center h-64 ">
            <Orbit className="animate-spin text-white" size={75} />
          </div>
        )}
        {!isLoading &&
          friends.map((friend) => (
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
              <Button
                size="sm"
                className="text-sm"
                disabled={
                  invitedFriends.includes(friend.id) || hostId === friend.id
                }
                onClick={() => inviteFriend(friend.id)}
              >
                {invitedFriends.includes(friend.id) ? 'Sent' : 'Invite'}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default InviteFriends;
