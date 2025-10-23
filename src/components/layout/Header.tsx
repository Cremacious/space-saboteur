import Link from 'next/link';
import { Button } from '../ui/button';
import Sidebar from './Sidebar';

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        {/* <img src="/globe.svg" alt="Space Saboteur Logo" className="w-10 h-10" /> */}
        <h1 className="text-3xl font-bold tracking-wide">Space Saboteur</h1>
      </div>
      <div className="gap-4 items-center hidden md:flex">
        <Link href="/how-to-play" className="hover:underline">
          How To Play
        </Link>
        <Link href="/characters" className="hover:underline">
          Characters
        </Link>
        <Link href="/characters" className="hover:underline">
          Settings
        </Link>
        <Button className="">Logout</Button>
      </div>
      <div className="md:hidden">
        <Sidebar />
      </div>
    </header>
  );
};
export default Header;
