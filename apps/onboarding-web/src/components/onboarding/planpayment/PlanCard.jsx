// PlanCard.jsx - Fully Responsive
import { CheckCircle2 } from "lucide-react";

export default function PlanCard({ plan }) {
  // Default features if plan is undefined
  const defaultFeatures = [
    "Unlimited Billing",
    "GST Invoices",
    "Inventory Management",
    "Purchase & Sales",
    "CRM",
    "Reports",
    "AI Prescription OCR",
    "Real-time Logistics Tracking",
    "24/7 Priority Support",
  ];

  // Safe access with fallbacks
  const badge = plan?.badge || "POPULAR";
  const name = plan?.name || "Professional Plan";
  const yearlyPrice = plan?.yearlyPrice || 10000;
  const features = plan?.features || defaultFeatures;

  // If features is an array of objects, extract titles
  const featureList = Array.isArray(features) && features.length > 0 && typeof features[0] === 'object'
    ? features.map(f => f.title || f.name || f)
    : features;

  // Use default features if featureList is empty
  const displayFeatures = featureList.length > 0 ? featureList : defaultFeatures;

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Header - Responsive */}
      <div className="bg-gradient-to-r from-[#006B5F] to-[#0EA5A4] px-4 sm:px-5 md:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          {/* Left - Badge & Name */}
          <div>
            <span className="inline-block rounded-full bg-white/20 px-2.5 sm:px-3 py-0.5 text-[8px] sm:text-[10px] font-bold text-white tracking-wider">
              {badge}
            </span>
            <h2 className="mt-1.5 text-xl sm:text-2xl font-bold text-white">{name}</h2>
          </div>
          
          {/* Right - Price */}
          <div className="text-left sm:text-right">
            <div className="text-2xl sm:text-3xl font-bold text-white">
              ₹{yearlyPrice.toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-white/80">per year</p>
          </div>
        </div>
      </div>

      {/* Features List - Responsive */}
      <div className="p-4 sm:p-5 md:p-6 flex-1">
        <p className="text-xs sm:text-sm font-medium text-slate-600 mb-3 sm:mb-4">
          Everything you need to run your pharmacy:
        </p>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-2.5">
          {displayFeatures.map((feature, index) => {
            const featureText = typeof feature === 'string' ? feature : feature.title || feature.name || `Feature ${index + 1}`;
            return (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-2.5 rounded-lg border border-slate-100 bg-slate-50/50 px-2.5 sm:px-3 py-2 sm:py-2.5 transition-all hover:border-[#0EA5A4]/30 hover:bg-[#0EA5A4]/5"
              >
                <CheckCircle2 size={14} className="text-[#0EA5A4] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">{featureText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}