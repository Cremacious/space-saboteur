'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFriendStore } from '@/stores/useFriendStore';
import { useState } from 'react';

const AddFriendInput = () => {
  const { sendFriendRequest } = useFriendStore();
  const [email, setEmail] = useState('');
  const [sendingRequest, setSendingRequest] = useState(false);

  const handleAddFriend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSendingRequest(true);
    sendFriendRequest(email).finally(() => {
      setEmail('');
      setSendingRequest(false);
    });
  };

  return (
    <div className="flex gap-2">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Add friend by email"
        className="space-font"
      />
      <Button disabled={sendingRequest} onClick={handleAddFriend} className="">
        {sendingRequest ? 'Sending...' : 'Add'}
      </Button>
    </div>
  );
};
export default AddFriendInput;
