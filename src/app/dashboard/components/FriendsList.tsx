'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useFriendStore } from '@/stores/useFriendStore';
import { useEffect } from 'react';
import AddFriendInput from './AddFriendInput';
import { Orbit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useOnlineStore } from '@/stores/useOnlineStore';

//TODO: Style no friends div

const FriendsList = () => {
  const [showRequests, setShowRequests] = useState(false);
  const [open, setOpen] = useState(false);
  const [removingFriend, setRemovingFriend] = useState(false);

  const handleViewRequests = () => {
    setShowRequests(!showRequests);
  };

  const {
    friends,
    pendingRequests,
    loadFriends,
    acceptFriendRequest,
    rejectFriendRequest,
    isLoading,
    removeFriend,
  } = useFriendStore();
  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  const numberOfPendingRequests = pendingRequests.length;

  const handleAcceptRequest = (requestId: string) => {
    acceptFriendRequest(requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    rejectFriendRequest(requestId);
  };

  const handleRemoveFriend = (friendId: string) => {
    setRemovingFriend(true);
    removeFriend(friendId);
    setRemovingFriend(false);
  };

  const { onlineFriends } = useOnlineStore();
  console.log('Online Friendssss:', onlineFriends);
  const onlineCount = friends.filter((f) =>
    onlineFriends.includes(f.id)
  ).length;

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
            Online Friends ( {onlineCount}/{friends.length} )
          </h3>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 ">
              <Orbit className="animate-spin text-white" size={100} />
            </div>
          ) : friends.length === 0 ? (
            <div className="text-center space-font text-white flex flex-col gap-1">
              <div>You have no friends added, yet.</div>
              <div>Add friends to see them here!</div>
            </div>
          ) : (
            <ul className="space-y-3">
              {friends.map((friend) => (
                <li
                  key={friend.id}
                  className="metallic-list-item flex items-center justify-between "
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full inline-block ${
                        onlineFriends.includes(friend.id)
                          ? 'bg-green-400'
                          : 'bg-gray-400'
                      }`}
                    />
                    <span className="space-font text-lg">{friend.name}</span>
                  </div>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                      <Button
                        variant={'destructive'}
                        size={'sm'}
                        className="text-sm"
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-950 border-2 border-cyan-400">
                      <DialogHeader>
                        <DialogTitle className="space-font text-white font-bold text-center text-xl">
                          Are you absolutely sure?
                        </DialogTitle>
                        <DialogDescription className="space-font text-white text-lg mt-4 text-center">
                          <div className="flex flex-col gap-1">
                            <div>
                              Removing{' '}
                              <span className="font-bold text-cyan-300">
                                {friend.name}
                              </span>{' '}
                              from your friends list
                            </div>
                            <div className="flex justify-center flex-col md:flex-row gap-4 mt-6">
                              <Button
                                onClick={() => setOpen(false)}
                                size={'lg'}
                                variant={'secondary'}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleRemoveFriend(friend.id)}
                                size={'lg'}
                                variant={'destructive'}
                              >
                                {removingFriend
                                  ? 'Deleting...'
                                  : 'Delete Friend'}
                              </Button>
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default FriendsList;
