import React from 'react';
import { TrendingUp } from 'lucide-react';
import { metricsData } from '../../pages/RolesPermissions/data';

const RoleMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {metricsData.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="p-4 rounded-xl bg-[#ffffff] shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#424751] leading-4">
                {metric.title}
              </span>
              <span className="text-[24px] font-bold text-[#235eac] mt-1 leading-8">
                {metric.value}
              </span>
              <span className={`text-[12px] font-medium flex items-center gap-1 mt-1 leading-4 ${
                metric.color === '#ba1a1a' ? 'text-[#ba1a1a]' : 
                metric.color === '#006d40' ? 'text-[#006d40]' : 'text-[#424751]'
              }`}>
                {metric.change.includes('Requires') ? '⚠' : <TrendingUp size={14} />}
                {metric.change}
              </span>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.iconBg}`}>
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoleMetrics;