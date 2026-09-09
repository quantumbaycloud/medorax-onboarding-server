import React from 'react';

const SidebarFooter = () => {
  return (
    <div className="p-4 border-t border-[#c3c6d2] bg-[#ffffff]">
      <div className="flex items-center gap-2 px-2 py-1">
        <span className="w-2 h-2 rounded-full bg-[#006d40]"></span>
        <span className="text-[12px] font-semibold leading-4 text-[#424751] uppercase tracking-wide">
          Node: Production EU-1
        </span>
      </div>
    </div>
  );
};

export default SidebarFooter;