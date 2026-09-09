import React from 'react';
import { Search, Download, ChevronDown } from 'lucide-react';
import { roles, statuses, branches } from '../../pages/UserManagement/data';

const UserFilters = () => {
  return (
    <div className="p-4 bg-[#f1f3ff] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
      <div className="relative flex-1 min-w-[260px]">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737782]" />
        <input 
          className="w-full pl-10 pr-4 py-2 bg-[#ffffff] rounded text-[#171c24] text-[14px] placeholder:text-[#737782] focus:outline-none focus:ring-1 focus:ring-[#235eac] shadow-sm leading-5" 
          placeholder="Search users by name, email, staff ID..." 
          type="text"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <select className="appearance-none bg-[#ffffff] rounded px-4 py-2 pr-8 text-[14px] text-[#171c24] shadow-sm focus:outline-none cursor-pointer leading-5">
            {roles.map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#737782]" />
        </div>
        <div className="relative">
          <select className="appearance-none bg-[#ffffff] rounded px-4 py-2 pr-8 text-[14px] text-[#171c24] shadow-sm focus:outline-none cursor-pointer leading-5">
            {statuses.map((status, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#737782]" />
        </div>
        <div className="relative">
          <select className="appearance-none bg-[#ffffff] rounded px-4 py-2 pr-8 text-[14px] text-[#171c24] shadow-sm focus:outline-none cursor-pointer leading-5">
            {branches.map((branch, index) => (
              <option key={index}>{branch}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#737782]" />
        </div>
        <button className="px-4 py-2 rounded bg-[#ffffff] text-[#235eac] hover:bg-[#e5e8f4] transition-colors shadow-sm flex items-center gap-1.5 text-[14px] font-semibold leading-5" type="button">
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
};

export default UserFilters;