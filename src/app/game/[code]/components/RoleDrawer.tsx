import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import RoleCard from '@/components/roles/RoleCard';

const RoleDrawer = () => {
  return (
    <div className="">
      <Drawer>
        <DrawerTrigger>
          <button className="space-font bg-cyan-400 text-black px-6 py-3 rounded-full text-xl shadow-lg hover:bg-cyan-500 transition-colors duration-150">
            View Role
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-slate-900/90 backdrop-blur-lg border-4 border-cyan-400 shadow-[0_0_24px_#00f2ff80] rounded-3xl p-6 max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle className="space-font neon-header">
              Your Role Card
            </DrawerTitle>
          </DrawerHeader>
          <RoleCard />
          <DrawerClose>
            <button className="mt-4 blue-box text-cyan-300 px-4 py-2 rounded-xl">
              Close
            </button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default RoleDrawer;
