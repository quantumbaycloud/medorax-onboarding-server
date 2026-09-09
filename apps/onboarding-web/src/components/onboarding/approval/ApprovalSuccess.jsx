import { Copy, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function ApprovalSuccess({ onDashboard, credentials = {} }) {
  const [copied, setCopied] = useState("");
  const copy = async (key, value) => {
    if (!value) return;
    await navigator.clipboard.writeText(String(value));
    setCopied(key); setTimeout(() => setCopied(""), 1500);
  };
  const rows = [
    ["Pharmacy ID", credentials.pharmacyId, "pharmacyId"],
    ["License Number", credentials.licenseNumber, "licenseNumber"],
    ["ERP Username", credentials.erpUsername, "erpUsername"],
    ["Temporary Password", credentials.temporaryPassword, "temporaryPassword"],
  ];
  return <div className="min-h-[560px] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#f0fdf9] via-white to-[#eef7ff]">
    <div className="w-full max-w-3xl rounded-3xl border border-emerald-100 bg-white shadow-xl p-6 sm:p-10">
      <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><ShieldCheck size={34}/></div>
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-slate-900">Your ERP Account is Ready</h1>
      <p className="text-center mt-3 text-slate-600">Your onboarding application has been approved by the Medorax administration team.</p>
      <div className="mt-8 rounded-2xl border border-slate-200 overflow-hidden">
        {rows.map(([label,value,key]) => <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-4 border-b last:border-b-0 bg-white">
          <span className="text-sm font-semibold text-slate-600">{label}</span>
          <div className="flex items-center gap-2"><code className="rounded-lg bg-slate-50 border px-3 py-2 text-sm font-semibold text-slate-900 break-all">{value || "—"}</code><button onClick={()=>copy(key,value)} className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-700" title="Copy"><Copy size={16}/></button>{copied===key && <span className="text-xs text-emerald-600">Copied</span>}</div>
        </div>)}
      </div>
      <div className="mt-5 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">Save the temporary password securely. Change it after your first ERP login.</div>
      <button onClick={onDashboard} className="mt-7 mx-auto flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] px-6 py-3 font-bold text-white shadow-lg">Go to Dashboard <ArrowRight size={18}/></button>
    </div>
  </div>;
}
