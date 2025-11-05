import Link from 'next/link';
import Sidebar from './Sidebar';
import LogoutButton from './LogoutButton';

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <h1 className="md:ml-8 ml-4 text-2xl md:text-3xl font-bold tracking-wide space-font">
          Space Saboteur
        </h1>
      </div>
      <div className="gap-4 items-center hidden md:flex md:mr-8">
        <Link
          href="/how-to-play"
          className="hover:underline space-font text-lg hoverAnimate"
        >
          How To Play
        </Link>
        <div>|</div>
        <Link
          href="/characters"
          className="hover:underline space-font text-lg hoverAnimate"
        >
          Characters
        </Link>
        <div>|</div>
        <Link
          href="/characters"
          className="hover:underline space-font text-lg hoverAnimate"
        >
          Settings
        </Link>
        <LogoutButton />
      </div>
      <div className="md:hidden">
        <Sidebar />
      </div>
    </header>
  );
};
export default Header;
