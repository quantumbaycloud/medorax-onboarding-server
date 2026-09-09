import {
  ShieldCheck,
  Zap,
  History,
  Lock,
} from "lucide-react";

export default function BankBenefitsCard() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        bg-gradient-to-br
        from-[#0F172A]
        via-[#1E293B]
        to-[#111827]
        p-4 sm:p-5 md:p-6
        text-white
        shadow-xl
        flex
        flex-col
        w-full
      "
    >
      {/* Background Glow */}
      <div className="absolute -right-16 -top-16 h-32 sm:h-40 w-32 sm:w-40 rounded-full bg-[#0EA5A4]/10 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-28 sm:h-32 w-28 sm:w-32 rounded-full bg-[#2563EB]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header - Compact */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/10">
            <ShieldCheck size={16} className="text-[#4ADE80]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold">Why Bank Details?</h3>
            <p className="text-[10px] sm:text-xs text-slate-300">
              Secure & verified payout system
            </p>
          </div>
        </div>

        {/* Benefits as bullet points - Compact */}
        <ul className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2 flex-1">
          <li className="flex items-start gap-2 sm:gap-2.5">
            <div className="rounded-lg bg-[#0EA5A4]/20 p-1 mt-0.5 flex-shrink-0">
              <Zap size={11} className="text-[#4ADE80]" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-semibold">Instant Settlements</span>
              <p className="text-[10px] sm:text-xs leading-3 sm:leading-4 text-slate-300">
                Receive payments directly into your registered bank account.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-2 sm:gap-2.5">
            <div className="rounded-lg bg-[#0EA5A4]/20 p-1 mt-0.5 flex-shrink-0">
              <Lock size={11} className="text-[#4ADE80]" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-semibold">Bank Grade Security</span>
              <p className="text-[10px] sm:text-xs leading-3 sm:leading-4 text-slate-300">
                Your banking information remains encrypted and protected.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-2 sm:gap-2.5">
            <div className="rounded-lg bg-[#0EA5A4]/20 p-1 mt-0.5 flex-shrink-0">
              <History size={11} className="text-[#4ADE80]" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-semibold">Complete History</span>
              <p className="text-[10px] sm:text-xs leading-3 sm:leading-4 text-slate-300">
                Track settlements and payment records anytime.
              </p>
            </div>
          </li>
        </ul>

        {/* Bottom Banner - Compact */}
        <div className="mt-2.5 sm:mt-3 rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3 flex-shrink-0">
          <div className="flex items-start gap-1.5 sm:gap-2">
            <ShieldCheck size={12} className="text-[#4ADE80] mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold">RBI Compliant Verification</p>
              <p className="text-[10px] sm:text-xs text-slate-300">
                We only use your bank details for secure settlements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}