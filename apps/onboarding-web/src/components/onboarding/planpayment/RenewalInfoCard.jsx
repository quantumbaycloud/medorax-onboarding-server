// RenewalInfoCard.jsx
import { Info } from "lucide-react";

export default function RenewalInfoCard({ compact = false }) {
  if (compact) {
    return (
      <div className="rounded-lg border border-[#CDEEE8] bg-[#F4FCFA] p-2">
        <div className="flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 text-[#0EA5A4]" />
          <div>
            <h4 className="text-[10px] font-semibold text-slate-800">
              Auto-renews yearly
            </h4>
            <p className="text-[8px] leading-4 text-slate-500">
              Cancel anytime from dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#CDEEE8] bg-[#F4FCFA] p-4">
      <div className="flex items-start gap-3">
        <Info size={18} className="mt-0.5 text-[#0EA5A4]" />
        <div>
          <h4 className="text-sm font-semibold text-slate-800">
            Subscription Renewal
          </h4>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Your subscription will automatically renew every year.
            You can cancel or change your plan anytime from the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}