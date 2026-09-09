import React from 'react';
import logo from '../../assets/logo.png';

const SidebarHeader = () => {
  return (
    <div className="h-16 px-4 border-b border-[#c3c6d2] flex items-center ">
      <div className="w-18 h-18 flex-shrink-0 flex items-center justify-center">
        <img
          src={logo}
          alt="Medorax Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-[18px] font-bold tracking-tight text-[#235eac] truncate leading-tight">
          Medorax
        </span>

        <span className="text-[11px] font-medium tracking-wide uppercase text-[#424751] leading-none">
          Enterprise Control
        </span>
      </div>
    </div>
  );
};

export default SidebarHeader;