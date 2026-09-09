// PaymentSecurityInfo.jsx
import { ShieldCheck } from "lucide-react";

export default function PaymentSecurityInfo({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-1 rounded-lg bg-[#F3FCFA] px-2.5 py-1">
        <ShieldCheck size={12} className="text-[#0EA5A4]" />
        <span className="text-[9px] font-medium text-slate-600">Secure</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#D8F3EC] bg-[#F3FCFA] p-4">
      <div className="flex gap-3">
        <ShieldCheck className="text-[#0EA5A4]" size={20} />
        <div>
          <h4 className="text-sm font-semibold">Secure Payment</h4>
          <p className="mt-1 text-xs text-slate-500">
            Payments are securely processed using Razorpay with bank-grade encryption.
          </p>
        </div>
      </div>
    </div>
  );
}