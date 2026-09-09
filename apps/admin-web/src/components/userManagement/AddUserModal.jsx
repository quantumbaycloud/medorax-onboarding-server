import React, { useRef, useEffect } from 'react';
import { X, UserPlus, ChevronDown, Plus, Award } from 'lucide-react';

const AddUserModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c303a]/40 p-4" ref={modalRef}>
      <div className="bg-[#ffffff] rounded max-w-xl w-full max-h-[942px] flex flex-col shadow-xl overflow-hidden">
        <div className="p-6 bg-[#f1f3ff] flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[#235eac] font-semibold text-[12px] uppercase tracking-wide leading-4">
              <UserPlus size={18} />
              <span>Identity & Access Management</span>
            </div>
            <h2 className="text-[20px] font-bold text-[#235eac] mt-1 leading-7">Add New User</h2>
            <p className="text-[14px] text-[#424751] mt-1 leading-5">Assign corporate credentials, compliance clearance, and branch access.</p>
          </div>
          <button className="w-8 h-8 rounded flex items-center justify-center text-[#737782] hover:bg-[#e5e8f4] hover:text-[#171c24] transition-colors" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <form className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-semibold text-[#171c24] leading-5">Full Name *</label>
            <input className="w-full px-4 py-2 bg-[#f1f3ff] rounded text-[#171c24] text-[14px] placeholder:text-[#737782] focus:bg-[#ffffff] focus:ring-1 focus:ring-[#235eac] focus:outline-none leading-5" placeholder="e.g. Dr. Jennifer Vance, PharmD" required type="text" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-semibold text-[#171c24] leading-5">Corporate Email *</label>
              <input className="w-full px-4 py-2 bg-[#f1f3ff] rounded text-[#171c24] text-[14px] placeholder:text-[#737782] focus:bg-[#ffffff] focus:ring-1 focus:ring-[#235eac] focus:outline-none leading-5" placeholder="username@medorax-pharma.org" required type="email" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-semibold text-[#171c24] leading-5">Direct Contact Phone</label>
              <input className="w-full px-4 py-2 bg-[#f1f3ff] rounded text-[#171c24] text-[14px] placeholder:text-[#737782] focus:bg-[#ffffff] focus:ring-1 focus:ring-[#235eac] focus:outline-none leading-5" placeholder="+1 (555) 019-2834" type="tel" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-semibold text-[#171c24] leading-5">Role Classification *</label>
            <div className="relative">
              <select className="w-full appearance-none bg-[#f1f3ff] rounded px-4 py-2 pr-8 text-[14px] text-[#171c24] focus:bg-[#ffffff] focus:ring-1 focus:ring-[#235eac] focus:outline-none cursor-pointer leading-5" required>
                <option value="">Select a security role...</option>
                <option value="super_admin">Super Admin (Global Policy & System Settings)</option>
                <option value="pharmacy_mgr">Pharmacy Manager (Dispensing & Staff Oversight)</option>
                <option value="lead_pharmacist">Lead Pharmacist (Rx Approvals & Narcotics Control)</option>
                <option value="dispensing_tech">Dispensing Tech (Fulfillment & Labeling)</option>
                <option value="cashier">Cashier (Point of Sale Operations)</option>
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#737782]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-semibold text-[#171c24] leading-5">Branch Assignment *</label>
            <div className="p-2 bg-[#f1f3ff] rounded flex flex-wrap gap-1 items-center min-h-[44px]">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#ffffff] text-[#235eac] text-[12px] font-semibold shadow-sm leading-4">
                Northside Clinic
                <button className="hover:text-[#ba1a1a] flex items-center leading-none" type="button">
                  <X size={14} />
                </button>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#ffffff] text-[#235eac] text-[12px] font-semibold shadow-sm leading-4">
                Downtown Branch
                <button className="hover:text-[#ba1a1a] flex items-center leading-none" type="button">
                  <X size={14} />
                </button>
              </span>
              <button className="px-2 py-1 rounded text-[#235eac] hover:bg-[#ffffff] text-[12px] font-semibold flex items-center gap-0.5 transition-colors leading-4" type="button">
                <Plus size={14} />
                Add Branch
              </button>
            </div>
            <span className="text-[11px] text-[#424751] leading-4">User permissions will strictly apply only within selected branches.</span>
          </div>

          <div className="p-4 rounded bg-[#f1f3ff] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#171c24] leading-5">Active Account Clearance</span>
              <span className="text-[12px] text-[#424751] leading-4">Enable immediate credential generation and multi-factor onboarding email.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input checked className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-[#dfe2ef] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#ffffff] after:border-[#c3c6d2] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006d40]"></div>
            </label>
          </div>
        </form>

        <div className="p-4 bg-[#f1f3ff] flex items-center justify-end gap-2">
          <button className="px-4 py-2 rounded bg-[#ffffff] text-[#171c24] hover:bg-[#e5e8f4] transition-colors text-[14px] font-semibold leading-5" onClick={onClose} type="button">
            Cancel
          </button>
          <button className="px-6 py-2 rounded bg-[#004287] hover:bg-[#235eac] text-[#ffffff] font-semibold transition-colors flex items-center gap-1.5 shadow-sm text-[14px] leading-5" onClick={onClose} type="button">
            <Award size={18} />
            <span>Create User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;