'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
// import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useFriendStore } from '@/stores/useFriendStore';
import { useEffect } from 'react';
import AddFriendInput from './AddFriendInput';

//TODO: Style no friends div

const FriendsList = () => {
  const [showRequests, setShowRequests] = useState(false);

  const handleViewRequests = () => {
    setShowRequests(!showRequests);
  };

  const {
    friends,
    pendingRequests,
    loadFriends,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useFriendStore();
  useEffect(() => {
    loadFriends();
  }, [loadFriends, friends]);

  const numberOfPendingRequests = pendingRequests.length;

  const handleAcceptRequest = (requestId: string) => {
    acceptFriendRequest(requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    rejectFriendRequest(requestId);
  };

  return (
    <div className="metallic-container">
      <h2 className="neon-header space-font">Friends</h2>
      <div className="space-y-8">
        <div className="space-y-4">
          <AddFriendInput />

          {pendingRequests.length > 0 && (
            <div className="mb-2 space-y-4">
              <Button onClick={handleViewRequests} className="w-full">
                View Pending Requests
                <Badge className="bg-cyan-700">{numberOfPendingRequests}</Badge>
              </Button>

              {showRequests && pendingRequests.length > 0 ? (
                <div>
                  <ul className="space-y-1">
                    {pendingRequests.map((request) => (
                      <li
                        key={request.id}
                        className="flex flex-col space-y-2 items-center justify-between metallic-box"
                      >
                        <div className="space-font">
                          <div className="text-center text-sm">
                            Friend Request From
                          </div>
                          <div className="text-center">
                            {request.sender.name}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            onClick={() => handleAcceptRequest(request.id)}
                            size={'sm'}
                            className=""
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleRejectRequest(request.id)}
                            size={'sm'}
                            variant={'destructive'}
                            className=""
                          >
                            Decline
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-3 neon-text space-font">
            Online Friends ( 0/{friends.length} )
          </h3>

          {/* {isLoading ? (
            <div>Loading</div>
          ) : ( */}
          <ul className="space-y-3">
            {friends.length === 0 ? (
              <div className="text-center neon-text space-font">
                You have no friends added. Add friends to see them here!
              </div>
            ) : null}
            {friends.map((friend) => (
              <li
                key={friend.id}
                className="metallic-list-item flex items-center justify-between "
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2  rounded-full inline-block" />
                  <span className="space-font text-lg">{friend.name}</span>
                </div>
                <Button variant={'destructive'} size={'sm'} className="text-sm">
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};
export default FriendsList;
