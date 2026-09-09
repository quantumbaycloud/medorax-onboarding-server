import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const VerificationFilters = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'all', label: 'All Applications', count: 12 },
    { id: 'suppliers', label: 'Suppliers', count: 8 },
    { id: 'wholesale', label: 'Wholesale Customers', count: 4 }
  ];

  return (
    <div className="bg-[#ffffff] rounded-xl p-3 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-3">
      <div className="flex items-center p-0.5 bg-[#f1f3ff] rounded-lg w-full lg:w-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-3 py-1 rounded-md text-[12px] font-medium leading-4 transition-all flex-1 lg:flex-none text-center ${
              activeTab === tab.id
                ? 'bg-[#ffffff] text-[#235eac] shadow-sm font-semibold'
                : 'text-[#424751] hover:text-[#171c24]'
            }`}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
        <div className="relative flex-1 lg:w-56">
          <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#737782]" />
          <input
            className="w-full pl-7 pr-2 py-1 bg-[#f1f3ff] text-[#171c24] rounded-lg text-[12px] focus:outline-none focus:bg-[#ffffff] focus:ring-1 focus:ring-[#235eac] transition-all leading-4"
            placeholder="Search Entity, GSTIN, License..."
            type="text"
          />
        </div>
        <div className="relative shrink-0">
          <select className="bg-[#f1f3ff] text-[#171c24] px-3 py-1 rounded-lg text-[12px] focus:outline-none appearance-none pr-6 cursor-pointer leading-4">
            <option value="pending">Status: Pending</option>
            <option value="approved">Status: Approved</option>
            <option value="rejected">Status: Rejected</option>
          </select>
          <ChevronDown size={14} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#737782] pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default VerificationFilters;