// ProcessingCard.jsx
import { Loader2 } from "lucide-react";

export default function ProcessingCard() {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-7
        flex
        flex-col
        items-center
        justify-center
        min-h-[420px]
        relative
        overflow-hidden
      "
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5A4]/5 to-[#2563EB]/5" />
      
      {/* Loading bar at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0EA5A4] to-[#2563EB]">
        <div className="h-full w-1/2 bg-white/30 animate-pulse" />
      </div>

      <div className="relative z-10 text-center">
        <Loader2
          size={48}
          className="animate-spin text-[#2563EB] mx-auto"
        />

        <h4 className="mt-4 font-bold text-slate-700">
          Processing Document
        </h4>

        <p className="mt-2 text-sm text-slate-500 max-w-[200px]">
          Your document is being verified. This may take a few moments.
        </p>

        <div className="mt-4 flex gap-1 justify-center">
          <span className="w-2 h-2 bg-[#0EA5A4] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-[#0EA5A4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-[#0EA5A4] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}