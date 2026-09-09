import { Hourglass } from "lucide-react";

export default function PendingHero() {
  return (
    <section className="flex flex-col items-center text-center">

      <div className="relative">

        <div className="w-28 h-28 rounded-full bg-[#E7F7F3] flex items-center justify-center">

          <Hourglass
            size={52}
            className="text-[#006B5F] animate-pulse"
          />

        </div>

        <div
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-dashed
            border-[#0EA5A4]/30
            animate-spin
          "
          style={{
            animationDuration: "12s",
          }}
        />

      </div>

      <h1 className="mt-8 text-[54px] font-bold text-[#131B2E]">
        Verification Pending
      </h1>

      <p className="mt-4 max-w-[720px] text-[20px] leading-9 text-slate-600">
        Thank you for submitting your application.
        Our compliance team is currently reviewing your
        onboarding information.
      </p>

    </section>
  );
}