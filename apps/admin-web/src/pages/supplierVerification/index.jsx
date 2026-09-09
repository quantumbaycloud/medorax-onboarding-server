import React, { useState } from 'react';
import { ChevronRight, History, Download } from 'lucide-react';
import VerificationMetrics from '../../components/supplierVerification/VerificationMetrics';
import VerificationFilters from '../../components/supplierVerification/VerificationFilters';
import VerificationTable from '../../components/supplierVerification/VerificationTable';
import VerificationDrawer from '../../components/supplierVerification/VerificationDrawer';

const SupplierVerification = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRow, setSelectedRow] = useState(1);

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1 text-[12px] font-medium text-[#424751] leading-4">
            <span className="hover:text-[#171c24] transition-colors cursor-pointer">Admin Console</span>
            <ChevronRight size={14} className="text-[#737782]" />
            <span className="font-semibold text-[#235eac]">Supplier/Customer Verification</span>
          </nav>
          <h1 className="text-[24px] font-bold tracking-tight text-[#171c24] leading-8">Supplier & Customer Verification</h1>
          <p className="text-[14px] text-[#424751] leading-5">Review and authorize pending legal entities, statutory drug licenses, and credit applications.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ffffff] text-[#235eac] rounded-lg shadow-sm hover:bg-[#f1f3ff] transition-colors text-[14px] font-medium leading-5" type="button">
            <History size={18} />
            <span>Audit Trail</span>
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#235eac] text-[#ffffff] rounded-lg shadow-sm hover:bg-[#004287] transition-colors text-[14px] font-medium leading-5" type="button">
            <Download size={18} />
            <span>Export KYC Ledger</span>
          </button>
        </div>
      </div>

      <VerificationMetrics />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8 flex flex-col gap-4">
          <VerificationFilters activeTab={activeTab} setActiveTab={setActiveTab} />
          <VerificationTable onRowSelect={setSelectedRow} selectedRow={selectedRow} />
        </div>
        <VerificationDrawer />
      </div>
    </div>
  );
};

export default SupplierVerification;