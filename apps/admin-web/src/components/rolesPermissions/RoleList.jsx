import React, { useState } from 'react';
import { Search, ChevronRight, Plus, FileText, Shield } from 'lucide-react';
import { rolesData } from '../../pages/RolesPermissions/data';

const RoleList = ({ onRoleSelect, selectedRole }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoles = rolesData.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lg:col-span-4 bg-[#ffffff] rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 flex items-center justify-between bg-[#ffffff]">
        <div className="flex items-center gap-1">
          <Shield size={20} className="text-[#235eac]" />
          <h2 className="text-[16px] font-semibold text-[#171c24]">Role Directory</h2>
        </div>
        <span className="text-[12px] font-medium text-[#424751] leading-4">RBAC Schema v4.2</span>
      </div>
      
      <div className="px-4 pb-4 bg-[#ffffff]">
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3 text-[#737782]" />
          <input
            id="role-search"
            className="w-full pl-10 pr-4 py-2 bg-[#f1f3ff] rounded-lg text-[14px] text-[#171c24] placeholder:text-[#737782] focus:outline-none focus:ring-1 focus:ring-[#235eac] leading-5"
            placeholder="Filter roles by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-col divide-y divide-[#dfe2ef]/40" id="role-list">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className={`role-item p-4 hover:bg-[#f1f3ff] cursor-pointer transition-colors relative ${
              selectedRole === role.id ? 'bg-[#f1f3ff]' : ''
            }`}
            onClick={() => onRoleSelect(role.id)}
          >
            {selectedRole === role.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#004287]"></div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${role.bgColor} flex items-center justify-center`}>
                  <role.icon size={18} className="text-[#235eac]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#171c24] leading-5">{role.name}</span>
                  <span className="text-[11px] text-[#424751] leading-4">{role.description}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-[#424751] bg-[#f1f3ff] px-2 py-0.5 rounded-full leading-4">
                  {role.userCount} users
                </span>
                {role.active && (
                  <span className="w-2 h-2 rounded-full bg-[#006d40]"></span>
                )}
                <ChevronRight size={16} className="text-[#737782]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#f1f3ff]/60 flex items-center justify-between">
        <span className="text-[12px] font-medium text-[#424751] leading-4">Need a custom tier?</span>
        <button className="text-[12px] font-bold text-[#235eac] hover:underline flex items-center gap-1 leading-4" type="button">
          <FileText size={14} />
          Import Template
        </button>
      </div>
    </div>
  );
};

export default RoleList;