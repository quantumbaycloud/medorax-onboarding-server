const products = [
  {
    icon: "medical_information",
    title: "Pharmacy App",
    desc: "A unified clinical-first interface for daily prescription management and patient care.",
    color: "text-teal-600"
  },
  {
    icon: "hub",
    title: "Enterprise ERP",
    desc: "Advanced AI-powered resource planning for large pharmacy chains and distributors.",
    color: "text-blue-600"
  },
  {
    icon: "local_shipping",
    title: "Logistics & Ride App",
    desc: "Real-time fleet management and optimized delivery routing for life-saving medicine.",
    color: "text-orange-600"
  },
  {
    icon: "assignment_ind",
    title: "Onboarding Portal",
    desc: "A streamlined, compliant portal for rapid partner integration and verification.",
    color: "text-teal-600"
  },
];

export default function Products() {
  return (
    <section id="products" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">Ecosystem Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((item) => (
            <div
              key={item.title}
              className="group relative p-6 sm:p-8 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className={`material-symbols-outlined text-3xl sm:text-4xl ${item.color} mb-4 sm:mb-6`}>{item.icon}</span>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">{item.title}</h3>
              <p className="text-sm text-slate-600 mb-6 sm:mb-8">{item.desc}</p>
              <button className={`${item.color} font-bold flex items-center gap-1 group-hover:gap-2 transition-all text-sm sm:text-base`}>
                Explore <span className="material-symbols-outlined text-base sm:text-lg">arrow_right_alt</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}