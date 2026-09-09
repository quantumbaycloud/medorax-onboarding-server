const features = [
  { icon: "cloud_done", title: "100% Cloud Based", desc: "Access your pharmacy data from anywhere, on any device." },
  { icon: "smart_button", title: "Automated Billing", desc: "Speed up checkouts with smart SKU search and barcoding." },
  { icon: "account_balance_wallet", title: "Smart Procurement", desc: "One-click ordering with automated reconciliation." },
  { icon: "verified_user", title: "Secure & Compliant", desc: "Enterprise-grade security with full regulatory compliance." },
];

export default function WhyMedorax() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">Why MEDORAX?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="p-6 sm:p-8 border border-slate-200 rounded-xl hover:border-teal-500 transition-colors hover:shadow-xl group"
            >
              <span className="material-symbols-outlined text-teal-600 mb-3 sm:mb-4 group-hover:rotate-12 transition-transform text-3xl sm:text-4xl">
                {item.icon}
              </span>
              <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}