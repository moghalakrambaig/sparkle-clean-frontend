import React from 'react';
import { SparkleIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <SparkleIcon className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Sparkle Clean Booking
        </h1>
      </div>
    </header>
  );
};

export default Header;