import { Orbit } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-linear-to-br from-slate-900 via-gray-700 to-gray-950">
      <Orbit className="animate-spin text-white" size={200} />
    </div>
  );
};

export default LoadingPage;
