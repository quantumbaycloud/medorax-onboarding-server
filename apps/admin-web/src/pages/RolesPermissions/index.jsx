import React, { useState } from 'react';
import { ChevronRight, History, Plus } from 'lucide-react';
import RoleMetrics from '../../components/rolesPermissions/RoleMetrics';
import RoleList from '../../components/rolesPermissions/RoleList';
import PermissionMatrix from '../../components/rolesPermissions/PermissionMatrix';

const RolesPermissions = () => {
  const [selectedRole, setSelectedRole] = useState('pharmacy-manager');

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1 text-[12px] font-medium text-[#424751] leading-4 mb-1">
              <span>Admin Console</span>
              <ChevronRight size={14} className="text-[#737782]" />
              <span className="font-semibold text-[#235eac]">Roles & Permissions</span>
            </div>
            <h1 className="text-[24px] font-bold tracking-tight text-[#235eac] leading-8">Roles & Permissions</h1>
            <p className="text-[14px] text-[#424751] mt-1 leading-5">Define granular Role-Based Access Control (RBAC) and module capabilities across operational tiers.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#eaedfa] text-[#171c24] text-[14px] font-medium rounded-lg hover:bg-[#e5e8f4] transition-colors leading-5" type="button">
              <History size={18} />
              <span>Audit Changelog</span>
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#235eac] text-[#ffffff] text-[14px] font-medium rounded-lg shadow-sm hover:opacity-95 transition-opacity leading-5" id="btn-add-role" type="button">
              <Plus size={18} />
              <span>Add Custom Role</span>
            </button>
          </div>
        </div>
        <RoleMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <RoleList 
          onRoleSelect={setSelectedRole} 
          selectedRole={selectedRole} 
        />
        <PermissionMatrix />
      </div>
    </div>
  );
};

export default RolesPermissions;