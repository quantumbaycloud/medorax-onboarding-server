import { Loader2, ShieldCheck } from "lucide-react";

export default function ProcessingPreview() {
  return (
    <div
      className="
        h-full
        rounded-2xl
        border
        border-slate-200
        bg-gradient-to-br
        from-[#F8FFFE]
        to-white
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
        py-8
      "
    >
      {/* Loader */}

      <div className="relative">

        <div className="absolute inset-0 rounded-full bg-[#0EA5A4]/20 animate-ping" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#0EA5A4]/10">

          <Loader2
            size={28}
            className="animate-spin text-[#0EA5A4]"
          />

        </div>

      </div>

      {/* Title */}

      <h3 className="mt-5 text-lg font-bold text-slate-800">
        Processing Document
      </h3>

      <p className="mt-2 text-sm text-slate-500 max-w-[220px]">
        Please wait while we verify your uploaded document.
      </p>

      {/* Progress */}

      <div className="mt-6 w-full">

        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

          <div
            className="
              h-full
              w-2/3
              rounded-full
              bg-gradient-to-r
              from-[#0EA5A4]
              to-[#2563EB]
              animate-pulse
            "
          />

        </div>

      </div>

      {/* Status */}

      <div
        className="
          mt-6
          flex
          items-center
          gap-2
          rounded-full
          bg-[#0EA5A4]/10
          px-4
          py-2
        "
      >
        <ShieldCheck
          size={16}
          className="text-[#0EA5A4]"
        />

        <span className="text-sm font-medium text-[#006B5F]">
          Verification in progress...
        </span>

      </div>

    </div>
  );
}