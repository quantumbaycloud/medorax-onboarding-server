// PendingPage.jsx - Responsive
import { Hourglass, Clock, Check, Loader2, Circle, Headphones } from "lucide-react";

// Timeline Step Component
function TimelineStep({ title, subtitle, status = "pending" }) {
  const isCompleted = status === "completed";
  const isActive = status === "active";

  return (
    <div className="relative z-10 flex flex-col items-center flex-1 min-w-0">
      <div
        className={`
          w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 
          rounded-full flex items-center justify-center 
          border-2 shadow-lg transition-all flex-shrink-0
          ${isCompleted ? "bg-green-500 border-green-500 text-white shadow-green-200" : ""}
          ${isActive ? "bg-[#E7F7F3] border-[#0EA5A4] text-[#006B5F] shadow-cyan-100" : ""}
          ${status === "pending" ? "bg-white border-slate-300 text-slate-400 shadow-slate-100" : ""}
        `}
      >
        {isCompleted && <Check size={16} />}
        {isActive && <Loader2 size={16} className="animate-spin" />}
        {status === "pending" && <Circle size={12} fill="currentColor" />}
      </div>
      <div className="mt-2 sm:mt-3 lg:mt-5 text-center min-w-0">
        <h3 className={`text-xs sm:text-sm lg:text-[18px] font-bold truncate ${isActive ? "text-[#006B5F]" : "text-[#131B2E]"}`}>
          {title}
        </h3>
        <p className="mt-0.5 sm:mt-1 lg:mt-2 text-[8px] sm:text-xs lg:text-sm text-slate-500 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// Support Card Component
function SupportCard() {
  return (
    <div className="rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-[#0EA5A4] to-[#2563EB] p-5 sm:p-6 lg:p-8 text-white shadow-[0_18px_50px_rgba(37,99,235,.25)] flex flex-col justify-between">
      <Headphones size={32} />
      <div>
        <h2 className="mt-4 sm:mt-5 lg:mt-6 text-xl sm:text-2xl lg:text-[28px] font-bold">Priority Support</h2>
        <p className="mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 opacity-90">
          Have questions about your onboarding? Our support specialists are available to assist you anytime.
        </p>
      </div>
      <button className="mt-5 sm:mt-6 lg:mt-8 rounded-xl bg-white py-2.5 sm:py-3 font-semibold text-[#006B5F] transition hover:scale-[1.02] text-sm sm:text-base">
        Chat Now
      </button>
    </div>
  );
}

export default function PendingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-[#E7F7F3] flex items-center justify-center">
            <Hourglass size={36} className="text-[#006B5F] animate-pulse" />
          </div>
          <div
            className="absolute inset-0 rounded-full border-3 sm:border-4 border-dashed border-[#0EA5A4]/30 animate-spin"
            style={{ animationDuration: "12s" }}
          />
        </div>

        <h1 className="mt-5 sm:mt-6 lg:mt-8 text-3xl sm:text-4xl lg:text-[54px] font-bold text-[#131B2E]">
          Verification Pending
        </h1>

        <p className="mt-2 sm:mt-3 lg:mt-4 max-w-[720px] text-sm sm:text-base lg:text-[20px] leading-6 sm:leading-7 lg:leading-9 text-slate-600">
          Thank you for submitting your application. Our compliance team is currently reviewing your onboarding information.
        </p>
      </section>

      {/* Timeline Section */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-10 shadow-[0_20px_60px_rgba(15,23,42,.08)] mt-6 sm:mt-8 lg:mt-12">
        {/* Badge */}
        <div className="flex justify-end">
          <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#E7F7F3] px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-[#006B5F] font-semibold text-[10px] sm:text-sm">
            <Clock size={14} />
            Est. Review: 24–48 Hours
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-6 sm:mt-8 lg:mt-12">
          {/* Line */}
          <div className="absolute left-6 right-6 sm:left-8 sm:right-8 lg:left-12 lg:right-12 top-4 sm:top-5 lg:top-7 h-[2px] sm:h-[3px] bg-slate-200">
            <div className="h-full w-[66%] bg-green-500 rounded-full" />
          </div>

          <div className="relative flex justify-between gap-1 sm:gap-2">
            <TimelineStep title="Registration" subtitle="Completed" status="completed" />
            <TimelineStep title="Documents" subtitle="Completed" status="completed" />
            <TimelineStep title="Under Review" subtitle="Processing" status="active" />
            <TimelineStep title="Activation" subtitle="Waiting" status="pending" />
          </div>
        </div>
      </section>

      {/* Support Section */}
      <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-7 mt-6 sm:mt-8 lg:mt-10">
        <SupportCard />
      </div>
    </div>
  );
}