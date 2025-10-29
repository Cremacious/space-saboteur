import { Orbit } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full">
      <Orbit className="animate-spin text-white" size={200} />
    </div>
  );
};

export default LoadingPage;
