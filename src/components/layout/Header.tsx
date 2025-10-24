import Link from 'next/link';
import { Button } from '../ui/button';
import Sidebar from './Sidebar';

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <h1 className="md:ml-8 text-2xl md:text-3xl font-bold tracking-wide space-font">
          Space Saboteur
        </h1>
      </div>
      <div className="gap-4 items-center hidden md:flex md:mr-8">
        <Link
          href="/how-to-play"
          className="hover:underline space-font text-lg"
        >
          How To Play
        </Link>
        <div>|</div>
        <Link href="/characters" className="hover:underline space-font text-lg">
          Characters
        </Link>
        <div>|</div>
        <Link href="/characters" className="hover:underline space-font text-lg">
          Settings
        </Link>
        <Button className="ml-2">Logout</Button>
      </div>
      <div className="md:hidden">
        <Sidebar />
      </div>
    </header>
  );
};
export default Header;
