export default function TestimonialCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">

      <p className="text-sm leading-7 italic text-slate-600">
        "Medorax transformed our workflow.
        Inventory automation and AI prescription
        scanning save us several hours every week."
      </p>

      <div className="mt-5 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] font-bold text-white">

          DR

        </div>

        <div>

          <h4 className="font-semibold text-slate-900">
            Dr. Rajesh Verma
          </h4>

          <p className="text-xs text-slate-500">
            Apollo Healthcare Partner
          </p>

        </div>

      </div>

    </div>
  );
}   