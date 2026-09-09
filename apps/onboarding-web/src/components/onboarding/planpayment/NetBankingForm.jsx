// NetBankingForm.jsx - New Design
import { Building2 } from "lucide-react";

export default function NetBankingForm({
  formData,
  updateField,
}) {
  const banks = [
    { id: "sbi", name: "State Bank of India", icon: "🏦" },
    { id: "hdfc", name: "HDFC Bank", icon: "🏛️" },
    { id: "icici", name: "ICICI Bank", icon: "🏢" },
    { id: "axis", name: "Axis Bank", icon: "🏗️" },
    { id: "pnb", name: "Punjab National Bank", icon: "🏬" },
    { id: "kotak", name: "Kotak Mahindra Bank", icon: "🏪" },
    { id: "yes", name: "Yes Bank", icon: "🏫" },
    { id: "idfc", name: "IDFC First Bank", icon: "🏭" },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        Select Bank
        <span className="text-red-500 ml-0.5">*</span>
      </label>
      <div className="relative">
        <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <select
          value={formData.bank || ""}
          onChange={(e) => updateField("bank", e.target.value)}
          className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20 bg-white appearance-none"
        >
          <option value="">Choose your bank</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.icon} {bank.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <div className="w-1 h-1 rounded-full bg-[#0EA5A4]" />
        You will be redirected to your bank's payment page
      </div>
    </div>
  );
}