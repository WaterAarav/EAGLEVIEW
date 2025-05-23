import React from 'react';
import { Dog } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center">
        <Dog className="h-8 w-8 text-amber-700" />
        <span className="ml-2 text-lg font-semibold text-amber-800">Eagle View</span>
      </div>
    </div>
  );
};

export default Logo;
