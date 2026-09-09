import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { auditData } from './data';

const AuditStream = () => {
  return (
    <div className="bg-[#ffffff] rounded-md shadow-sm flex flex-col h-full">
      <div className="px-4 py-2 flex items-center justify-between bg-[#ffffff]">
        <div className="flex items-center gap-1">
          <FileText size={20} className="text-[#235eac]" />
          <h2 className="text-[20px] font-semibold text-[#171c24] leading-7">Audit Stream</h2>
        </div>
        <span className="text-[12px] font-medium uppercase tracking-wide text-[#737782] leading-4">Live</span>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2 overflow-y-auto max-h-105">
        {auditData.map((audit, index) => (
          <div key={index} className="flex items-start gap-2 group hover:bg-[#f1f3ff]/40 p-1 rounded transition-colors">
            <div className={`w-8 h-8 rounded-full ${audit.bg} ${audit.text} flex items-center justify-center text-[12px] font-bold flex-shrink-0 leading-4`}>
              {audit.icon ? <audit.icon size={16} /> : audit.initials}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <p className="text-[14px] font-normal text-[#171c24] leading-6">
                <span className="font-semibold text-[#171c24]">{audit.name}</span> {audit.action}{' '}
                {audit.target && <span className="font-semibold text-[#235eac]">{audit.target}</span>}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="flex items-center gap-0.5 text-[11px] font-medium bg-[#e5e8f4] text-[#424751] px-1 rounded leading-4">
                  {audit.tagIcon && <audit.tagIcon size={12} />}
                  {audit.tag}
                </span>
                <span className="text-[#737782] text-[11px] font-medium leading-4">• {audit.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 bg-[#ffffff] mt-auto border-t border-[#f1f3ff]">
        <a className="w-full py-1 rounded bg-[#f1f3ff] hover:bg-[#e5e8f4] text-[#235eac] text-[14px] font-semibold transition-colors flex items-center justify-center gap-1 leading-5 cursor-pointer" href="#">
          <span>Access Audit Logs</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
};

export default AuditStream;