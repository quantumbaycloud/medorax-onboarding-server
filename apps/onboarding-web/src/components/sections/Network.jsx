export default function Network() {
  const items = [
    { icon: "factory", label: "Manufacturers", color: "bg-teal-500" },
    { icon: "inventory", label: "Distributors", color: "bg-blue-500" },
    { icon: "medical_services", label: "Pharmacies", color: "bg-white" },
    { icon: "person_pin", label: "Patients", color: "bg-green-500" },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Connected Supply Chain Network</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">Bridging the gap from production to patient with a unified digital backbone.</p>
        </div>

        <div className="relative max-w-4xl mx-auto py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-center relative z-10 gap-8 sm:gap-12 md:gap-0 px-4 sm:px-8">
            {items.map((item) => (
              <div key={item.label} className="flex flex-col items-center group relative z-20">
                <div
                  className={`w-16 sm:w-20 h-16 sm:h-20 ${item.color}
                    rounded-2xl flex items-center justify-center
                    ${item.label === "Pharmacies" ? "text-teal-600" : "text-white"}
                    shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined text-3xl sm:text-4xl">
                    {item.icon}
                  </span>
                </div>
                <span className="mt-3 sm:mt-4 text-xs sm:text-sm text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-[90px] sm:top-[100px] md:top-[120px] left-[10%] right-[10%] hidden sm:block z-0">
            <div className="relative h-[2px] bg-slate-700 rounded-full overflow-hidden">
              <div className="signal-trail"></div>
              <div className="signal-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}