import React from 'react';
import { Edit, Key, Ban, CheckCircle } from 'lucide-react';
import { usersData } from '../../pages/userManagement/data';

const UserTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f1f3ff]/70 text-[#424751] text-[12px] font-semibold uppercase tracking-wider select-none leading-4">
            <th className="w-10 px-4 py-2 text-center">
              <input className="rounded w-4 h-4 text-[#235eac] focus:ring-0 cursor-pointer" type="checkbox" />
            </th>
            <th className="px-4 py-2 font-semibold">Name & Credentials</th>
            <th className="px-4 py-2 font-semibold">Email</th>
            <th className="px-4 py-2 font-semibold">Role</th>
            <th className="px-4 py-2 font-semibold">Assigned Branch</th>
            <th className="px-4 py-2 font-semibold">Compliance Status</th>
            <th className="px-4 py-2 font-semibold">Last Login</th>
            <th className="px-4 py-2 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eaedfa] text-[14px] leading-6">
          {usersData.map((user) => (
            <tr key={user.id} className="hover:bg-[#f1f3ff]/40 transition-colors group">
              <td className="px-4 py-2 text-center">
                <input className="rounded w-4 h-4 text-[#235eac] focus:ring-0 cursor-pointer" type="checkbox" />
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded ${user.avatarBg} flex items-center justify-center font-semibold text-[12px] flex-shrink-0 leading-4`}>
                    {user.initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-semibold text-[#171c24] leading-tight">{user.name}</span>
                    <span className="text-[11px] text-[#424751] leading-4">{user.empId} • {user.badge}</span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-[#424751]">{user.email}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase inline-block ${user.roleBg} leading-4`}>
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-2 text-[#171c24]">{user.branch}</td>
              <td className="px-4 py-2">
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[12px] font-semibold ${user.statusBg} leading-4`}>
                  <span className={`w-2 h-2 rounded-full ${user.statusDot}`}></span>
                  <span>{user.status}</span>
                </div>
              </td>
              <td className="px-4 py-2 text-[#424751]">{user.lastLogin}</td>
              <td className="px-4 py-2 text-right">
                <div className="flex items-center justify-end gap-1 text-[#424751]">
                  <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#e5e8f4] hover:text-[#235eac] transition-colors" title="Edit User">
                    <Edit size={18} />
                  </button>
                  <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#e5e8f4] hover:text-[#235eac] transition-colors" title="Reset Password">
                    <Key size={18} />
                  </button>
                  {user.status === 'Suspended' ? (
                    <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#9cf6bc]/50 hover:text-[#006d40] transition-colors" title="Re-activate">
                      <CheckCircle size={18} />
                    </button>
                  ) : user.status === 'Inactive' ? (
                    <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#9cf6bc]/50 hover:text-[#006d40] transition-colors" title="Activate">
                      <CheckCircle size={18} />
                    </button>
                  ) : (
                    <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#ffdad6]/50 hover:text-[#ba1a1a] transition-colors" title="Deactivate">
                      <Ban size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;