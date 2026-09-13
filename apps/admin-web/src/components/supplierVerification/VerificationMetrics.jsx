import React from 'react';
import { TrendingUp,AlertTriangle } from 'lucide-react';
import { metricsData } from '../../pages/supplierVerification/data';

const VerificationMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metricsData.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="bg-[#ffffff] rounded-xl p-6 shadow-sm flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#424751] leading-4">
                {metric.title}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-bold leading-none text-[#171c24]">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-[20px] font-normal text-[#424751] leading-none">
                    {metric.unit}
                  </span>
                )}
                <span className={`text-[12px] font-medium flex items-center gap-0.5 leading-4 ${
                  metric.color === '#ba1a1a' ? 'text-[#ba1a1a]' : 'text-[#006d40]'
                }`}>
                  {metric.change.includes('High') ? <AlertTriangle size={14} /> : <TrendingUp size={14} />}
                  {metric.change}
                </span>
              </div>
              <span className="text-[12px] text-[#424751] leading-4">{metric.subtitle}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl ${metric.iconBg} flex items-center justify-center`}>
              <Icon size={26} className={metric.color === '#ba1a1a' ? 'text-[#93000a]' : 'text-[#235eac]'} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VerificationMetrics;