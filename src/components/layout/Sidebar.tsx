'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { CircleX, Menu } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-1 text-white bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-200">
          <Menu className="w-10 h-7" />
        </button>
      </SheetTrigger>
      <SheetContent className="[&>button]:hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-950 border-l-2 border-cyan-400">
        <SheetHeader>
          <div className="mb-4 flex items-center justify-between">
            <SheetTitle className="text-2xl space-font text-white drop-shadow-md">
              Space Saboteur
            </SheetTitle>
            <button onClick={() => setIsOpen(false)}>
              <CircleX size={30} className="text-white" />
            </button>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-6">
          <Link href={'/settings'}>
            <div className="metallic-box text-white space-font text-lg text-center">
              How To Play
            </div>
          </Link>
          <Link href={'/settings'}>
            <div className="metallic-box text-white space-font text-lg text-center">
              Characters
            </div>
          </Link>
          <Link href={'/settings'}>
            <div className="metallic-box text-white space-font text-lg text-center">
              Settings
            </div>
          </Link>
        </div>
        <SheetFooter>
          <Button className="text-lg">Logout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Sidebar;
