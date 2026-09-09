import React from 'react';

const NavbarProfile = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <img 
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" 
        alt="Sarah Jenkins" 
        className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c3c6d2]"
      />
    </div>
  );
};

export default NavbarProfile;