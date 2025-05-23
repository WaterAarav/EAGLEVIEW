import React from 'react';
import { Dog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-[#f5f0e1] shadow-sm py-4 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-amber-700 hover:text-amber-900 transition-colors"
            aria-label="Go to home"
          >
            Home
          </button>
          
          <div className="flex items-center">
            <Dog className="h-8 w-8 text-amber-700" />
            <h1 className="ml-2 text-xl font-semibold text-amber-800">Eagle View</h1>
          </div>
          
          <div className="w-20">
            {/* Empty div for balance */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;