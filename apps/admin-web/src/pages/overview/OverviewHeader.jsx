import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Bolt, Download, ChevronDown } from 'lucide-react';
import { quickActionsData } from './data';

const OverviewHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[12px] font-medium leading-4 text-[#424751]">
          <span>Admin Console</span>
          <ChevronRight size={14} className="text-[#737782]" />
          <span className="text-[#235eac] font-semibold">Overview</span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] font-bold tracking-tight text-[#171c24] leading-8">
            Admin Overview
          </h1>
          <span className="bg-[#9cf6bc] text-[#0f7345] text-[12px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1 leading-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]"></span>
            Live Feed
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative" ref={menuRef}>
          <button 
            className="h-9 px-4 rounded-md bg-[#ffffff] text-[#424751] shadow-sm hover:bg-[#f1f3ff] transition-colors flex items-center gap-1.5 text-[14px] font-medium leading-5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Bolt size={18} className="text-[#235eac]" />
            <span>Quick Actions</span>
            <ChevronDown size={16} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-[#ffffff] rounded-md shadow-xl z-30 py-1 text-[#171c24]">
              {quickActionsData.map((action, index) => (
                <a 
                  key={index}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-[14px] font-medium leading-5 hover:bg-[#f1f3ff] transition-colors cursor-pointer"
                  href="#"
                >
                  <action.icon size={16} />
                  {action.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <button className="h-9 px-4 rounded-md bg-[#235eac] text-[#ffffff] shadow-sm hover:bg-[#004287] transition-colors flex items-center gap-1.5 text-[14px] font-medium leading-5">
          <Download size={18} />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
};

export default OverviewHeader;