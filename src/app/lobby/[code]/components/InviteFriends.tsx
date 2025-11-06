'use client';
import { Button } from '@/components/ui/button';
// import { FriendType } from '@/lib/types/friend.type';
import { useFriendStore } from '@/stores/useFriendStore';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { useEffect } from 'react';

const InviteFriends = () => {
  const { friends, loadFriends } = useFriendStore();
  const { inviteFriend, invitedFriends } = useLobbyStore();

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  return (
    <div className="blue-box ">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Invite Friends
      </h3>

      <ul className="space-y-3 overflow-y-auto max-h-[400px] md:max-h-[756px] md:pr-4 rounded-lg ">
        {friends.map((friend) => (
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
              disabled={invitedFriends.includes(friend.id)}
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
