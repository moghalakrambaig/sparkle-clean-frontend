import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 py-4 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Sparkle Clean. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;