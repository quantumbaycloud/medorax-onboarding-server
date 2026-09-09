import React, { useState } from 'react';
import { Save, RefreshCw, CheckSquare, Square, X, Lock, Info, CheckCircle } from 'lucide-react';
import { permissionModules, permissionActions } from '../../pages/RolesPermissions/data';

const PermissionMatrix = () => {
  const [permissions, setPermissions] = useState(permissionModules);
  const [toast, setToast] = useState({ show: false, message: '' });

  const handlePermissionChange = (moduleId, action, value) => {
    setPermissions(prev =>
      prev.map(module =>
        module.id === moduleId
          ? {
              ...module,
              permissions: {
                ...module.permissions,
                [action]: value
              }
            }
          : module
      )
    );
  };

  const handleSave = () => {
    setToast({ show: true, message: 'Permissions matrix successfully committed to production.' });
    setTimeout(() => setToast({ show: false, message: '' }), 3200);
  };

  const handleReset = () => {
    setPermissions(permissionModules);
    setToast({ show: true, message: 'Permissions restored to standard system blueprint defaults.' });
    setTimeout(() => setToast({ show: false, message: '' }), 3200);
  };

  const handleSelectAll = () => {
    const allChecked = permissions.every(m => 
      Object.values(m.permissions).every(v => v === true)
    );
    setPermissions(prev =>
      prev.map(module => ({
        ...module,
        permissions: {
          view: !allChecked,
          create: !allChecked,
          edit: !allChecked,
          delete: !allChecked,
          approve: !allChecked,
          export: !allChecked
        }
      }))
    );
  };

  return (
    <div className="lg:col-span-8 bg-[#ffffff] rounded-xl shadow-sm flex flex-col">
      <div className="p-6 bg-[#ffffff]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock size={24} className="text-[#235eac]" />
            <div>
              <h2 className="text-[18px] font-bold text-[#171c24]">Permission Matrix</h2>
              <p className="text-[12px] text-[#424751] leading-4">Granular access control for selected role</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-select-all"
              className="px-3 py-1.5 rounded-lg bg-[#f1f3ff] text-[#171c24] hover:bg-[#e5e8f4] transition-colors text-[12px] font-medium flex items-center gap-1 leading-4"
              onClick={handleSelectAll}
              type="button"
            >
              <CheckSquare size={14} />
              Select All
            </button>
            <button
              id="btn-reset"
              className="px-3 py-1.5 rounded-lg bg-[#f1f3ff] text-[#424751] hover:bg-[#e5e8f4] transition-colors text-[12px] font-medium flex items-center gap-1 leading-4"
              onClick={handleReset}
              type="button"
            >
              <RefreshCw size={14} />
              Reset
            </button>
            <button
              id="btn-save"
              className="px-4 py-1.5 rounded-lg bg-[#235eac] text-[#ffffff] hover:opacity-95 transition-opacity text-[12px] font-medium flex items-center gap-1 shadow-sm leading-4"
              onClick={handleSave}
              type="button"
              style={{ backgroundColor: '#235eac' }}
            >
              <Save size={14} />
              Save Matrix
            </button>
          </div>
        </div>
        <div className="mt-4 p-2 bg-[#f1f3ff] rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info size={18} className="text-[#235eac]" />
            <span className="text-[12px] text-[#424751] leading-4">
              <strong className="text-[#171c24]">Super Admin</strong> — Full system access with all permissions
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#424751] bg-[#ffffff] px-2 py-0.5 rounded">3 users</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f1f3ff] text-[#235eac] text-[12px] font-semibold select-none leading-4">
              <th className="py-2 px-4 font-semibold">Module & Scope Hierarchy</th>
              {permissionActions.map((action) => (
                <th key={action} className="py-2 px-2 text-center font-semibold w-20">
                  {action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe2ef]/40 text-[14px] text-[#171c24] leading-6" id="matrix-tbody">
            {permissions.map((module) => {
              const Icon = module.icon;
              return (
                <tr key={module.id} className="hover:bg-[#f1f3ff]/50 transition-colors">
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <Icon size={20} className="text-[#235eac]" />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-[#171c24] leading-5">{module.name}</span>
                        <span className="text-[11px] text-[#424751] leading-4">{module.description}</span>
                      </div>
                    </div>
                  </td>
                  {permissionActions.map((action) => {
                    const actionKey = action.toLowerCase();
                    const isDisabled = module.id === 'audit' && ['create', 'edit', 'delete', 'approve'].includes(actionKey);
                    return (
                      <td key={action} className="py-2 px-2 text-center">
                        {isDisabled ? (
                          <X size={16} className="text-[#737782] opacity-30 mx-auto" />
                        ) : (
                          <input
                            className="w-4 h-4 accent-[#004287] rounded cursor-pointer"
                            type="checkbox"
                            checked={module.permissions[actionKey] || false}
                            onChange={(e) => handlePermissionChange(module.id, actionKey, e.target.checked)}
                            disabled={isDisabled}
                            style={{ accentColor: '#235eac' }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-[#ffffff] flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-1 text-[12px] font-medium text-[#424751] leading-4">
          <Info size={16} className="text-[#737782]" />
          <span>8 modules with granular permissions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] text-[#424751]">
            <span className="w-3 h-3 rounded bg-[#235eac]"></span>
            Enabled
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#424751]">
            <span className="w-3 h-3 rounded bg-[#e5e8f4]"></span>
            Disabled
          </span>
        </div>
      </div>

      {toast.show && (
        <div className="fixed bottom-6 right-6 px-4 py-2 rounded-xl bg-[#235eac] text-[#ffffff] shadow-xl text-[14px] font-medium flex items-center gap-2 z-50 transition-all" id="save-toast">
          <CheckCircle size={20} className="text-[#9cf6bc]" />
          <span id="toast-message">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default PermissionMatrix;