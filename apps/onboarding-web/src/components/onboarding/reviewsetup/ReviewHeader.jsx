export default function ReviewHeader() {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight sm:leading-none font-bold tracking-[-0.02em] sm:tracking-[-0.03em] text-[#131B2E]">
        Final Review
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-6 sm:leading-7 lg:leading-8 text-slate-600 max-w-3xl">
        Please confirm all details are accurate before submitting for verification.
      </p>
    </div>
  );
}