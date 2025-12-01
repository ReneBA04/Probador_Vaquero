import React from 'react';
import { Lasso } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-leather-900 text-leather-50 shadow-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lasso className="w-8 h-8 text-amber-500" />
          <h1 className="text-2xl font-western tracking-wider">VAQUERO AI</h1>
        </div>
        <nav className="hidden md:block">
          <span className="text-sm text-leather-300 font-medium">PROBADOR VIRTUAL</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;