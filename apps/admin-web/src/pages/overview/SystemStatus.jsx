import React from 'react';
import { MoreVertical } from 'lucide-react';
import { systemStatusData } from './data';

const SystemStatus = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {systemStatusData.map((system, index) => {
        const Icon = system.icon;
        return (
          <div key={index} className="bg-[#ffffff] rounded-md p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-[#f1f3ff] flex items-center justify-center text-[#235eac]">
                <Icon size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#171c24] leading-5">{system.title}</span>
                <span className={`text-[12px] font-medium flex items-center gap-1 leading-4 ${system.color}`}>
                  {system.status.includes('Operational') && <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]"></span>}
                  {system.status}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[#737782] font-medium">{system.details}</span>
                  <span className="text-[10px] text-[#737782] font-medium bg-[#f1f3ff] px-1 rounded">{system.version}</span>
                </div>
              </div>
            </div>
            <button className="text-[#737782] hover:text-[#235eac] transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SystemStatus;