import { Helmet } from "react-helmet-async";

export default function ProductsPage() {
  const products = [
    {
      icon: "shopping_cart",
      title: "Medorax App",
      desc: "A seamless consumer experience for drug discovery, telehealth consultations, and precision ordering.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "hover:border-teal-500/30",
      iconBg: "bg-teal-100",
      features: [
        "Real-time Inventory",
        "Smart Recommendations",
        "Prescription Wallet"
      ]
    },
    {
      icon: "dashboard",
      title: "Enterprise ERP",
      desc: "The nervous system of your healthcare business. Comprehensive tools for inventory, finance, and staffing.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "hover:border-blue-500/30",
      iconBg: "bg-blue-100",
      features: [
        "Supply Chain Analytics",
        "Multi-Store Sync",
        "Automated Billing"
      ]
    },
    {
      icon: "delivery_dining",
      title: "Rider App",
      desc: "Empowering last-mile delivery experts with optimized routing, digital verification, and cold-chain monitoring.",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "hover:border-cyan-500/30",
      iconBg: "bg-cyan-100",
      features: [
        "Route Optimization",
        "Temp Monitoring",
        "Proof of Delivery"
      ]
    },
    {
      icon: "badge",
      title: "Onboarding Portal",
      desc: "Automated credentialing and compliance for providers and pharmacies to join the Medorax network.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "hover:border-emerald-500/30",
      iconBg: "bg-emerald-100",
      features: [
        "KYC & Compliance",
        "Guided Training",
        "Automated Setup"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Products | MEDORAX - Healthcare Solutions</title>
        <meta name="description" content="Explore MEDORAX products - Medorax App, Enterprise ERP, Rider App, and Onboarding Portal for healthcare solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      <section className="bg-[#F8FAFC] text-[#131b2e] relative overflow-hidden pt-20 sm:pt-24 md:pt-28">
        {/* Background Blur Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-56 sm:w-64 md:w-80 h-56 sm:h-64 md:h-80 bg-teal-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-20 w-48 sm:w-56 md:w-72 h-48 sm:h-56 md:h-72 bg-cyan-400/15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -left-20 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-emerald-400/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-gradient-to-r from-blue-400/5 to-teal-400/5 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[700px] md:w-[800px] h-[300px] sm:h-[350px] md:h-[400px] bg-gradient-to-b from-blue-400/10 via-teal-400/5 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-100/50 border border-teal-500/20 text-teal-700 mb-4 sm:mb-6 md:mb-8 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[14px] sm:text-[16px] md:text-[18px]">verified</span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">Next Generation Healthcare</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8 tracking-tight">
              One Platform, <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Infinite Healthcare Solutions</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
              Modernizing the healthcare value chain with an integrated suite of intelligence-driven applications for discovery, operations, and fulfillment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-white bg-gradient-to-r from-teal-500 to-blue-600 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 relative overflow-hidden group text-sm sm:text-base">
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <span className="material-symbols-outlined text-lg sm:text-xl">rocket_launch</span>
                Explore Platform
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold border border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                <span className="material-symbols-outlined text-lg sm:text-xl">play_circle</span>
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-12 sm:py-16 md:py-24 bg-white/50 backdrop-blur-sm relative px-4 sm:px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-teal-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.title}
                  className={`group p-6 sm:p-8 rounded-[1.5rem] border border-slate-200 ${product.borderColor} hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 bg-white/80 backdrop-blur-sm flex flex-col h-full relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${product.bgColor}`}></div>
                  <div className="relative z-10">
                    <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-2xl ${product.iconBg} flex items-center justify-center ${product.color} mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-2xl sm:text-3xl">{product.icon}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{product.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 flex-grow">{product.desc}</p>
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-slate-700">
                          <span className={`material-symbols-outlined ${product.color} text-sm sm:text-base`}>check_circle</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a href="#" className={`flex items-center gap-2 ${product.color} font-semibold group/link text-sm sm:text-base`}>
                      Learn More <span className="material-symbols-outlined text-sm sm:text-base group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Integrated Ecosystem Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-slate-50/80 backdrop-blur-sm overflow-hidden relative px-4 sm:px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[450px] md:w-[500px] h-[400px] sm:h-[450px] md:h-[500px] bg-gradient-to-r from-blue-400/5 to-teal-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-16">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[12px] sm:text-[14px]">hub</span>
                  CONNECTED ECOSYSTEM
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-4 sm:mb-6">
                  The Integrated <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">Ecosystem</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 md:mb-10">
                  Medorax isn't just a collection of apps; it's a unified data ecosystem. Information flows seamlessly across every touchpoint, ensuring that providers, patients, and fulfillment teams are always in sync.
                </p>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-shadow hover:border-teal-500/20">
                    <div className="shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">sync_alt</span>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-[18px] font-bold mb-1 sm:mb-2">Real-time Data Synchronization</h4>
                      <p className="text-xs sm:text-sm text-slate-600">Inventory changes in the ERP reflect instantly on the consumer app and routing engines.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-shadow hover:border-blue-500/20">
                    <div className="shrink-0 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">insights</span>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-[18px] font-bold mb-1 sm:mb-2">Predictive Logic Engines</h4>
                      <p className="text-xs sm:text-sm text-slate-600">AI-driven demand forecasting helps providers stock the right medicine before it's even ordered.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative mt-6 sm:mt-8 lg:mt-0">
                <div className="aspect-square w-full max-w-[350px] sm:max-w-[400px] md:max-w-md mx-auto relative flex items-center justify-center">
                  {/* Animated rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-500/20 animate-spin-slow"></div>
                  <div className="absolute inset-8 rounded-full border-2 border-dashed border-blue-500/20 animate-spin-slower"></div>
                  <div className="absolute inset-16 rounded-full border-2 border-dashed border-cyan-500/10 animate-spin-slow" style={{ animationDuration: '25s' }}></div>

                  {/* Center hub */}
                  <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-slate-200 p-6 sm:p-8 md:p-12 rounded-full shadow-2xl animate-float">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white relative">
                      <span className="material-symbols-outlined text-4xl sm:text-5xl md:text-6xl">hub</span>
                    </div>
                  </div>

                  {/* Floating App Icons */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-white shadow-lg border border-slate-200 rounded-2xl flex items-center justify-center text-teal-600 animate-float-delay-1 hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">shopping_cart</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-white shadow-lg border border-slate-200 rounded-2xl flex items-center justify-center text-blue-600 animate-float-delay-2 hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">dashboard</span>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-white shadow-lg border border-slate-200 rounded-2xl flex items-center justify-center text-cyan-600 animate-float-delay-3 hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">delivery_dining</span>
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-white shadow-lg border border-slate-200 rounded-2xl flex items-center justify-center text-emerald-600 animate-float-delay-4 hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl sm:text-2xl">badge</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 sm:py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden px-4 sm:px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-teal-500/20 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px]"></div>
            <div className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-500/20 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[500px] md:h-[600px] bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-white text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">rocket_launch</span>
              GET STARTED TODAY
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 sm:mb-6 md:mb-8">Ready to transform your healthcare infrastructure?</h2>
            <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12">
              Join over 500+ clinics and pharmacies already scaling their operations with the Medorax Ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6">
              <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-sm sm:text-base">
                <span className="material-symbols-outlined text-lg sm:text-xl">calendar_month</span>
                Schedule a Demo
              </button>
              <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold border border-white/30 hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm text-sm sm:text-base">
                <span className="material-symbols-outlined text-lg sm:text-xl">contact_support</span>
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        <style jsx>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-slower {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-slower {
            animation: spin-slower 15s linear infinite;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delay-1 {
            animation: float 6s ease-in-out 0s infinite;
          }
          .animate-float-delay-2 {
            animation: float 6s ease-in-out 1.5s infinite;
          }
          .animate-float-delay-3 {
            animation: float 6s ease-in-out 3s infinite;
          }
          .animate-float-delay-4 {
            animation: float 6s ease-in-out 4.5s infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>
    </>
  );
}