import React from 'react';
import { HelpCircle, Bell } from 'lucide-react';

const NavbarActions = () => {
  return (
    <>
      <button 
        type="button" 
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-[#424751] hover:bg-[#f1f3ff] hover:text-[#171c24] transition-colors text-[14px] font-medium leading-5"
        title="Help"
      >
        <HelpCircle size={20} />
        <span>Help</span>
      </button>
      <button 
        type="button" 
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#424751] hover:bg-[#f1f3ff] hover:text-[#171c24] transition-colors relative"
        title="Notifications"
      >
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#ffffff]"></span>
      </button>
    </>
  );
};

export default NavbarActions;