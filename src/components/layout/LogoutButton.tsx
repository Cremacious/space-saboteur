'use client';
import { signOut } from '@/lib/auth-client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const handleSignout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <Button className="ml-2" onClick={handleSignout}>
      Logout
    </Button>
  );
};
export default LogoutButton;
