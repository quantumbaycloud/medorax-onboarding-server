import React from 'react';
import { Check, X, Eye, ChevronRight, RefreshCw, CheckCircle } from 'lucide-react';
import { verificationData } from '../../pages/SupplierVerification/data';

const VerificationTable = ({ onRowSelect, selectedRow }) => {
  return (
    <div className="bg-[#ffffff] rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between bg-[#f1f3ff]/40">
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-semibold text-[#171c24] leading-7">Pending Verification Queue</span>
          <span className="px-2 py-0.5 rounded-full bg-[#f1f3ff] text-[#235eac] text-[11px] font-semibold leading-4">
            12 Awaiting Action
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-[#f1f3ff] rounded text-[#424751]" title="Bulk Approve" type="button">
            <CheckCircle size={20} />
          </button>
          <button className="p-1 hover:bg-[#f1f3ff] rounded text-[#424751]" title="Refresh Table" type="button">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f1f3ff] text-[#424751] text-[12px] font-semibold uppercase tracking-wider leading-4">
              <th className="py-2 px-4 w-10">
                <input className="rounded accent-[#235eac] cursor-pointer" type="checkbox" />
              </th>
              <th className="py-2 px-4">Entity & Category</th>
              <th className="py-2 px-4">App Date</th>
              <th className="py-2 px-4">Drug Form / Tax</th>
              <th className="py-2 px-4">Requested Credit</th>
              <th className="py-2 px-4 text-center">Risk Score</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4 text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaedfa] text-[14px] text-[#171c24] leading-6">
            {verificationData.map((item) => {
              const Icon = item.icon;
              const StatusIcon = item.statusIcon;
              const isSelected = selectedRow === item.id;
              
              return (
                <tr
                  key={item.id}
                  className={`hover:bg-[#f1f3ff]/60 transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#f1f3ff] ring-1 ring-[#235eac]/20' : 'bg-[#ffffff]'
                  } ${item.flagged ? 'bg-[#ffdad6]/10' : ''}`}
                  onClick={() => onRowSelect(item.id)}
                >
                  <td className="py-2 px-4">
                    <input
                      checked={item.selected}
                      className="rounded accent-[#235eac] cursor-pointer"
                      type="checkbox"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center shrink-0`}>
                        <Icon size={18} className={item.iconColor} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`font-semibold truncate ${item.flagged ? 'text-[#ba1a1a]' : 'text-[#235eac]'}`}>
                          {item.name}
                        </span>
                        <span className="text-[11px] text-[#424751] leading-4">{item.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <span className="text-[#171c24]">{item.date}</span>
                    <span className="block text-[11px] text-[#424751] leading-4">{item.time}</span>
                  </td>
                  <td className="py-2 px-4">
                    <span className={`font-semibold text-[13px] ${item.flagged ? 'text-[#ba1a1a]' : 'text-[#171c24]'}`}>
                      {item.form}
                    </span>
                    <span className="block text-[11px] text-[#424751] leading-4 tracking-mono">{item.gstin}</span>
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <span className="font-semibold text-[#171c24]">{item.credit}</span>
                    <span className="block text-[11px] text-[#424751] leading-4">{item.creditTerms}</span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[12px] font-bold leading-4 ${item.riskBg}`}>
                      {item.riskScore} ({item.riskLabel})
                    </span>
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[12px] font-semibold leading-4 ${item.statusBg}`}>
                      <StatusIcon size={14} />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button className="p-1 rounded bg-[#006d40]/10 hover:bg-[#006d40]/20 text-[#006d40] transition-colors" title="Quick Approve" type="button">
                        <Check size={18} />
                      </button>
                      <button className="p-1 rounded bg-[#ba1a1a]/10 hover:bg-[#ba1a1a]/20 text-[#ba1a1a] transition-colors" title="Quick Reject" type="button">
                        <X size={18} />
                      </button>
                      <button className="p-1 rounded bg-[#f1f3ff] hover:bg-[#e5e8f4] text-[#235eac] transition-colors" title="View Inspection Card" type="button">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-2 bg-[#f1f3ff]/40 flex items-center justify-between text-[12px] font-medium text-[#424751] leading-4">
        <span>Showing 1 to 4 of 12 Pending Verifications</span>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 rounded bg-[#ffffff] text-[#171c24] hover:bg-[#f1f3ff] shadow-sm font-semibold" type="button">1</button>
          <button className="px-2 py-1 rounded hover:bg-[#f1f3ff] text-[#424751]" type="button">2</button>
          <button className="px-2 py-1 rounded hover:bg-[#f1f3ff] text-[#424751]" type="button">3</button>
          <button className="p-1 rounded hover:bg-[#f1f3ff] text-[#424751]" type="button">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationTable;