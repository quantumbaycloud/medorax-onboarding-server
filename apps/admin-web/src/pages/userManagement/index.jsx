import React, { useState } from 'react';
import { ChevronRight, History, UserPlus, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import UserMetrics from '../../components/userManagement/UserMetrics';
import UserFilters from '../../components/userManagement/UserFilters';
import UserTable from '../../components/userManagement/UserTable';
import AddUserModal from '../../components/userManagement/AddUserModal';

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-[12px] font-medium text-[#424751] leading-4 mb-1">
            <span className="hover:text-[#235eac] transition-colors cursor-pointer">Admin Console</span>
            <ChevronRight size={14} className="text-[#737782]" />
            <span className="font-semibold text-[#235eac]">User Management</span>
          </div>
          <h1 className="text-[24px] font-bold tracking-tight text-[#235eac] leading-8">User Management</h1>
          <p className="text-[14px] text-[#424751] mt-1 leading-5">Manage corporate credentials, compliance clearance, and branch access roles across all regional distribution units.</p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button className="px-4 py-2 rounded bg-[#ffffff] text-[#235eac] hover:bg-[#f1f3ff] transition-colors shadow-sm flex items-center gap-1.5 text-[14px] font-semibold leading-5" type="button">
            <History size={18} />
            <span>Access Audit</span>
          </button>
          <button className="px-4 py-2 rounded bg-[#004287] hover:bg-[#235eac] text-[#ffffff] font-semibold transition-all shadow-sm flex items-center gap-1.5 text-[14px] leading-5" onClick={() => setIsModalOpen(true)} type="button">
            <UserPlus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <UserMetrics />
      
      <div className="bg-[#ffffff] rounded shadow-sm flex flex-col overflow-hidden">
        <UserFilters />
        <UserTable />
        <div className="p-4 bg-[#f1f3ff]/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] font-medium text-[#424751] leading-4">
          <div className="flex items-center gap-1">
            <span>Showing <strong className="text-[#171c24]">1-7</strong> of <strong className="text-[#171c24]">1,248</strong> users</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded bg-[#ffffff] text-[#424751] hover:bg-[#e5e8f4] transition-colors shadow-sm disabled:opacity-40" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="px-2 py-1 rounded bg-[#235eac] text-[#ffffff] font-semibold">1</button>
            <button className="px-2 py-1 rounded bg-[#ffffff] hover:bg-[#e5e8f4] text-[#171c24] font-semibold shadow-sm transition-colors">2</button>
            <button className="px-2 py-1 rounded bg-[#ffffff] hover:bg-[#e5e8f4] text-[#171c24] font-semibold shadow-sm transition-colors">3</button>
            <span className="px-1">...</span>
            <button className="px-2 py-1 rounded bg-[#ffffff] hover:bg-[#e5e8f4] text-[#171c24] font-semibold shadow-sm transition-colors">179</button>
            <button className="px-2 py-1 rounded bg-[#ffffff] text-[#171c24] hover:bg-[#e5e8f4] transition-colors shadow-sm">
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UserManagement;