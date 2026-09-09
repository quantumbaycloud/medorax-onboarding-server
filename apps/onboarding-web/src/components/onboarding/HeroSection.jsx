export default function HeroSection() {
  return (
    <section 
      className="relative w-full lg:w-1/2 flex items-center justify-center bg-white overflow-hidden px-4 sm:px-6 py-6 lg:py-0 flex-shrink-0"
    >

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(#006B5F 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft Gradient */}
      <div className="absolute -top-32 -left-24 w-72 h-72 rounded-full bg-teal-100 blur-[90px] opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-100 blur-[100px] opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[470px] px-2 sm:px-4 py-2 sm:py-4 w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#E8F8F4] rounded-full px-3 py-1.5 sm:px-5 sm:py-2 mb-2 sm:mb-3">
          <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006B5F] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-[#006B5F]"></span>
          </span>
          <span className="text-[#006B5F] font-medium text-[10px] sm:text-sm whitespace-nowrap">
            Next-Gen Pharmacy Intelligence
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[28px] sm:text-[38px] lg:text-[48px] xl:text-[52px] leading-[34px] sm:leading-[44px] lg:leading-[54px] xl:leading-[58px] font-bold tracking-tight text-[#111827]">
          Powering the
          <br />
          future of
          <br />
          <span className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] bg-clip-text text-transparent">
            Healthcare
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] bg-clip-text text-transparent">
            ERP.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-2 sm:mt-4 text-[13px] sm:text-[15px] lg:text-[17px] leading-6 sm:leading-7 lg:leading-8 text-gray-600">
          Join
          <span className="font-semibold text-gray-900">
            {" "}1,000+
          </span>
          {" "}pharmacies scaling with intelligence.
          Experience seamless operations,
          real-time analytics,
          and clinical precision
          in one unified platform.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-6 mt-3 sm:mt-4 lg:mt-6">
          <div className="rounded-xl sm:rounded-2xl bg-[#F5F7FF] border border-slate-200 p-3 sm:p-4 lg:p-6 hover:shadow-xl transition">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#006B5F]">
              99.9%
            </h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-gray-600">
              Uptime SLA
            </p>
          </div>
          <div className="rounded-xl sm:rounded-2xl bg-[#F5F7FF] border border-slate-200 p-3 sm:p-4 lg:p-6 hover:shadow-xl transition">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#006B5F]">
              24/7
            </h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base text-gray-600">
              Clinical Support
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}