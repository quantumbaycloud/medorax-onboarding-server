import {
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function StatusBadge({
  status,
}) {
  if (status === "verified") {
    return (
      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
        <CheckCircle2 size={12} />
        VERIFIED
      </div>
    );
  }

  if (status === "required") {
    return (
      <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
        <AlertCircle size={12} />
        REQUIRED
      </div>
    );
  }

  return (
    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
      <Loader2 size={12} className="animate-spin" />
      PROCESSING
    </div>
  );
}