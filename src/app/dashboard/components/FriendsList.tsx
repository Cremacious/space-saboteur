'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const FriendsList = () => {
  const [showRequests, setShowRequests] = useState(false);

  const handleViewRequests = () => {
    setShowRequests(!showRequests);
  };

  return (
    <div className="metallic-container">
      <h2 className="neon-header space-font">Friends</h2>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Add friend by email"
              className="space-font"
            />
            <Button className="">Add</Button>
          </div>
          <div className="mb-2 space-y-4">
            <Button onClick={handleViewRequests} className="w-full">
              View Pending Requests <Badge className="bg-cyan-700">1</Badge>
            </Button>

            {showRequests && (
              <div>
                <ul className="space-y-1">
                  <li className="flex flex-col space-y-2 items-center justify-between metallic-box">
                    <div className="space-font">
                      <div className="text-center text-sm">
                        Friend Request From
                      </div>
                      <div className="text-center">Taylor</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size={'sm'} className="">
                        Accept
                      </Button>
                      <Button size={'sm'} variant={'destructive'} className="">
                        Decline
                      </Button>
                    </div>
                  </li>
                  {/* More invites... */}
                </ul>
              </div>
            )}
          </div>{' '}
        </div>

        <div>
          <h3 className="font-semibold mb-3 neon-text space-font">
            Online Friends ( 1 )
          </h3>
          <ul className="space-y-3">
            <li className="metallic-list-item flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                <span className="space-font text-lg">Alex</span>
              </div>
              <Button variant={'destructive'} size={'sm'} className="text-sm">
                Delete
              </Button>
            </li>
            <li className="metallic-list-item flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2  rounded-full inline-block" />
                <span className="space-font text-lg">James</span>
              </div>
              <Button variant={'destructive'} size={'sm'} className="text-sm">
                Delete
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default FriendsList;
