import Link from 'next/link';
import { Button } from '@/components/ui/button';
import RoleCard from '@/components/roles/RoleCard';
export default function Home() {
  return (
    <>
      <Button className="m-4" asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <Button className="m-4" asChild>
        <Link href="/lobby">Enter Lobby</Link>
      </Button>
      <Button className="m-4" asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
      <Button className="m-4" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>

      <div>
        <RoleCard />
      </div>
    </>
  );
}
