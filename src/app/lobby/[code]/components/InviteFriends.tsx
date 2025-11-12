'use client';
import { Button } from '@/components/ui/button';
import { useFriendStore } from '@/stores/useFriendStore';
import { useLobbyStore } from '@/stores/useLobbyStore';
import { useOnlineStore } from '@/stores/useOnlineStore';
import { Orbit } from 'lucide-react';
import { useEffect } from 'react';

const InviteFriends = ({}: {
  currentUserId: string;
  currentUserName: string;
}) => {
  const { friends, loadFriends, isLoading } = useFriendStore();
  const { inviteFriend, invitedFriends, hostId } = useLobbyStore();
  const { onlineFriends } = useOnlineStore();

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  return (
    <div className="blue-box ">
      <h3 className="neon-text mb-4 text-center space-font text-lg">
        Invite Friends
      </h3>

      <ul className="space-y-3 overflow-y-auto min-h-64 max-h-[400px] md:max-h-[756px]  rounded-lg ">
        {isLoading && (
          <div className="flex flex-col justify-center items-center h-64 ">
            <Orbit className="animate-spin text-white" size={75} />
          </div>
        )}
        {!isLoading &&
          friends.map((friend) => (
            <li
              key={friend.id}
              className="bg-linear-to-br from-gray-800 via-gray-600 to-gray-900 border-2 border-gray-400  rounded-2xl py-2 px-4 relative overflow-hidden flex items-center justify-between "
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full  ${
                    onlineFriends.includes(friend.id)
                      ? 'bg-green-400'
                      : 'bg-gray-400'
                  }`}
                />
                <span className="space-font text-lg text-white">
                  {friend.name}
                </span>
              </div>
              <button
                className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md disabled:bg-red-400 disabled:text-gray font-bold"
                disabled={
                  invitedFriends.includes(friend.id) || hostId === friend.id
                }
                onClick={() => inviteFriend(friend.id)}
              >
                {invitedFriends.includes(friend.id) ? 'Sent' : 'Invite'}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default InviteFriends;
