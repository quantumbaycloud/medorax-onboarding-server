const stats = [
  { value: "10,000+", label: "Active Pharmacies" },
  { value: "500+", label: "Trusted Distributors" },
  { value: "10,00,000+", label: "Monthly Transactions" },
];

export default function Stats() {
  return (
    <section className="py-10 sm:py-14 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((item) => (
          <div key={item.label} className="p-6 sm:p-8 text-center bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-600 mb-2">
              {item.value}
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}