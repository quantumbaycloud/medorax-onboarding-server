import React from 'react';
import { Users, Laptop, Clock, Shield } from 'lucide-react';
import { metricsData } from './data';

const iconMap = {
  Users: Users,
  Laptop: Laptop,
  Clock: Clock,
  Shield: Shield
};

const OverviewMetrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metricsData.map((metric, index) => {
        const Icon = iconMap[metric.icon];
        return (
          <div 
            key={index}
            className="bg-[#ffffff] rounded-md p-4 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#424751] leading-4">
                {metric.title}
              </span>
              <div className={`w-8 h-8 rounded-md bg-[#f1f3ff] flex items-center justify-center group-hover:bg-[#235eac] group-hover:text-[#ffffff] transition-colors`}>
                <Icon size={20} className="text-[#235eac] group-hover:text-[#ffffff]" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-bold text-[#171c24] leading-8">
                  {metric.value}
                </span>
                {metric.subtext && (
                  <span className="text-[12px] font-medium text-[#424751] leading-4">
                    {metric.subtext}
                  </span>
                )}
                {metric.change && (
                  <span className="text-[12px] font-semibold text-[#006d40] flex items-center leading-4">
                    <span className="text-[14px]">↑</span> {metric.change}
                  </span>
                )}
              </div>
              {metric.badge && (
                <span className="bg-[#ffdad6] text-[#93000a] px-1 rounded text-[11px] font-semibold leading-4 inline-block">
                  {metric.badge}
                </span>
              )}
              <div className="flex items-center justify-between text-[#424751] text-[12px] font-medium leading-4 mt-1">
                {metric.details && <span className="truncate">{metric.details}</span>}
                {metric.target && <span>{metric.target}</span>}
                {metric.queue && <span>{metric.queue}</span>}
                {metric.threat && <span>{metric.threat}</span>}
                {metric.sla && (
                  <span className="flex items-center gap-1 text-[#006d40] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]"></span>
                    {metric.sla}
                  </span>
                )}
                {metric.period && <span>{metric.period}</span>}
                {metric.audited && <span>{metric.audited}</span>}
              </div>
            </div>
            <div className="w-full bg-[#e5e8f4] h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  width: `${metric.progress}%`,
                  backgroundColor: metric.color 
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewMetrics;