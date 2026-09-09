import React from 'react';
import { Network } from 'lucide-react';
import { clusterData, clusterStats } from './data';

const ClusterOperations = () => {
  return (
    <div className="bg-[#ffffff] rounded-md shadow-sm p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Network size={20} className="text-[#235eac]" />
          <h2 className="text-[20px] font-semibold text-[#171c24] leading-7">Cluster Operations & Throughput</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[12px] font-medium text-[#424751] leading-4">
            <span className="w-2.5 h-2.5 rounded bg-[#235eac] inline-block"></span>
            Total Transactions
          </span>
          <span className="flex items-center gap-1 text-[12px] font-medium text-[#424751] leading-4">
            <span className="w-2.5 h-2.5 rounded bg-[#9cf6bc] inline-block"></span>
            Validation SLA
          </span>
        </div>
      </div>
      <div className="w-full h-36 flex items-end gap-2 pt-1">
        {clusterData.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full bg-[#e5e8f4] rounded-t flex flex-col justify-end overflow-hidden" style={{ height: `${item.total}%` }}>
              <div className="bg-[#235eac] w-full" style={{ height: `${item.sla}%` }}></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[9px] text-[#737782] font-medium leading-3">{item.transactions}</span>
              <span className="text-[11px] font-medium text-[#424751] leading-4">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 pt-1 bg-[#ffffff]">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[#424751] text-[11px] font-medium block leading-4">AVG LATENCY</span>
            <span className="text-[14px] font-bold text-[#171c24] leading-5">{clusterStats.avgLatency}</span>
          </div>
          <div>
            <span className="text-[#424751] text-[11px] font-medium block leading-4">ERP SYNC RATE</span>
            <span className="text-[14px] font-bold text-[#006d40] leading-5">{clusterStats.syncRate}</span>
          </div>
          <div>
            <span className="text-[#424751] text-[11px] font-medium block leading-4">PEAK LOAD</span>
            <span className="text-[14px] font-bold text-[#171c24] leading-5">{clusterStats.peakLoad}</span>
          </div>
        </div>
        <span className="text-[11px] font-medium text-[#424751] leading-4">Node Cluster: {clusterStats.cluster}</span>
      </div>
    </div>
  );
};

export default ClusterOperations;