'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const FriendsList = () => {
  const [showRequests, setShowRequests] = useState(false);

  const handleViewRequests = () => {
    setShowRequests(!showRequests);
  };

  return (
    <div className="bg-indigo-800/60 rounded-xl p-6 shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl font-semibold mb-2">Friends</h2>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Add friend by email"
          className="px-3 py-2 rounded bg-indigo-950 border border-indigo-700 text-white flex-1"
        />
        <Button className="mt-0.5">Add</Button>
      </div>
      <div className="mb-2 space-y-4">
        <Button onClick={handleViewRequests} className="w-full">
          View Pending Requests (1)
        </Button>

        {showRequests && (
          <div>
            <ul className="space-y-1">
              <li className="flex flex-col space-y-2 items-center justify-between bg-blue-500 p-2 rounded-xl">
                <div>Invite from Taylor</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="">Accept</Button>
                  <Button className="">Decline</Button>
                </div>
              </li>
              {/* More invites... */}
            </ul>
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold mb-3">Online Friends</h3>
        <ul className="space-y-2">
          <li className="flex items-center justify-between border rounded-xl p-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />{' '}
              Alex
            </span>
            <button className="text-red-400 hover:underline">Delete</button>
          </li>

          <li className="flex items-center justify-between border rounded-xl p-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />{' '}
              Alex
            </span>
            <button className="text-red-400 hover:underline">Delete</button>
          </li>

          <li className="flex items-center justify-between border rounded-xl p-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />{' '}
              Alex
            </span>
            <button className="text-red-400 hover:underline">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default FriendsList;
