// AutoFetchedFields.jsx - Responsive
import { Building2, MapPin, CheckCircle2, Edit2 } from "lucide-react";

export default function AutoFetchedFields({
  bankName,
  branch,
  city,
  state,
  onManualEntry,
}) {
  return (
    <div className="rounded-xl border border-[#CDEEE8] bg-[#F4FCFA] p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium text-green-700">
              Bank details verified
            </span>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="mb-0.5 block text-[10px] sm:text-xs font-medium text-slate-700">
                Bank Name
              </label>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Building2 size={12} className="text-[#0EA5A4] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                  {bankName}
                </span>
              </div>
            </div>
            <div>
              <label className="mb-0.5 block text-[10px] sm:text-xs font-medium text-slate-700">
                Branch
              </label>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin size={12} className="text-[#0EA5A4] flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-900 truncate">
                  {branch}
                  {city && `, ${city}`}
                  {state && `, ${state}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onManualEntry}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] sm:text-xs text-[#0EA5A4] hover:bg-[#0EA5A4]/10 transition-colors self-start sm:self-center"
        >
          <Edit2 size={11} />
          Edit
        </button>
      </div>
    </div>
  );
}