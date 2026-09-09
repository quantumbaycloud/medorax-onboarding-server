import pharmacyImg from "../../assets/solution3.webp";
import distributorImg from "../../assets/solution2.webp";
import networkImg from "../../assets/solution1.webp";
import dashboardImg from "../../assets/supplychainai.jpg";

const solutions = [
  {
    title: "Pharmacy Owners",
    desc: "Boost your margins and reduce dead stock with AI-powered inventory management.",
    icon: "storefront",
    bgImage: pharmacyImg,
  },
  {
    title: "Distributors",
    desc: "Reach thousands of pharmacies instantly through our direct B2B marketplace.",
    icon: "local_shipping",
    bgImage: distributorImg,
  },
  {
    title: "Pharmacy Networks",
    desc: "Centrally manage 10 to 10,000 outlets with unified reporting and procurement.",
    icon: "hub",
    bgImage: networkImg,
  }
];

export default function Solutions() {
  return (
    <section id="solutions" className="bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden px-4 sm:px-6" style={{
        backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8FAFC]/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10 py-12 sm:py-16 md:py-20">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-100 border border-teal-500/20 text-teal-600 text-xs font-semibold tracking-widest uppercase mx-auto lg:mx-0">
              <span className="mr-2">●</span> NEXT-GEN OPERATING SYSTEM
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Unified Intelligence for the Pharmacy Ecosystem
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              A clinical-grade AI platform orchestrating complex interactions between manufacturers, distributors, and providers with real-time supply chain transparency.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all text-sm sm:text-base">
                Explore Platform <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
              </button>
              <button className="bg-white border border-slate-200 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm sm:text-base">
                View Case Studies
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-3 sm:-inset-4 bg-teal-500/20 rounded-[1.5rem] sm:rounded-[2rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200 rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-4 overflow-hidden border-teal-500/20">
              <img 
                alt="Medorax Global Supply Chain Dashboard" 
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl" 
                src={dashboardImg}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions for Everyone Section */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Solutions for Everyone</h2>
            <p className="text-sm sm:text-base text-slate-600">Precise intelligence tailored for every stakeholder in the global medication lifecycle.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {solutions.map((item) => (
              <div key={item.title} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-200">
                <div 
                  className="h-40 sm:h-48 bg-cover bg-center" 
                  style={{ backgroundImage: `url('${item.bgImage}')` }}
                ></div>
                <div className="p-6 sm:p-8">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-3 sm:mb-4">
                    <span className="material-symbols-outlined text-teal-600 text-xl sm:text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">{item.desc}</p>
                  <button className="w-full py-2.5 sm:py-3 rounded-lg border border-teal-500 text-teal-600 font-bold hover:bg-teal-500 hover:text-white transition-all text-sm sm:text-base">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="py-16 sm:py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why Medorax?</h2>
          <p className="text-sm sm:text-base text-slate-600">Comparing clinical-grade intelligence vs. legacy infrastructure.</p>
        </div>
        <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 sm:p-6 md:p-8 font-bold text-sm sm:text-base">Capabilities</th>
                <th className="p-4 sm:p-6 md:p-8 font-bold text-sm sm:text-base">Traditional Software</th>
                <th className="p-4 sm:p-6 md:p-8 font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 text-sm sm:text-base">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    Medorax AI
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-4 sm:p-6 md:p-8 font-medium text-sm sm:text-base">Data Refresh Rate</td>
                <td className="p-4 sm:p-6 md:p-8 text-slate-600 text-sm sm:text-base">Daily / Batch</td>
                <td className="p-4 sm:p-6 md:p-8 font-bold text-teal-600 text-sm sm:text-base">Real-time Streaming</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-4 sm:p-6 md:p-8 font-medium text-sm sm:text-base">Inventory Management</td>
                <td className="p-4 sm:p-6 md:p-8 text-slate-600 text-sm sm:text-base">Manual Thresholds</td>
                <td className="p-4 sm:p-6 md:p-8 font-bold text-teal-600 text-sm sm:text-base">AI Predictive Analytics</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 md:p-8 font-medium text-sm sm:text-base">Network Visibility</td>
                <td className="p-4 sm:p-6 md:p-8 text-slate-600 text-sm sm:text-base">Siloed Data</td>
                <td className="p-4 sm:p-6 md:p-8 font-bold text-teal-600 text-sm sm:text-base">Unified Ecosystem</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-4 sm:p-6 md:p-8 font-medium text-sm sm:text-base">Compliance Readiness</td>
                <td className="p-4 sm:p-6 md:p-8 text-slate-600 text-sm sm:text-base">Manual Audit Prep</td>
                <td className="p-4 sm:p-6 md:p-8 font-bold text-teal-600 text-sm sm:text-base">Automated HIPAA Logs</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 md:p-8 font-medium text-sm sm:text-base">User Experience</td>
                <td className="p-4 sm:p-6 md:p-8 text-slate-600 text-sm sm:text-base">Complex Desktop Clients</td>
                <td className="p-4 sm:p-6 md:p-8 font-bold text-teal-600 text-sm sm:text-base">Cloud-Native Responsive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}></div>
          <div className="relative z-10 space-y-6 sm:space-y-8 max-w-3xl mx-auto">
            <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold">Ready to Modernize Your Pharmacy Operations?</h2>
            <p className="text-white/80 text-base sm:text-lg">Join 2,500+ pharmacies and distributors leveraging Medorax to streamline their business and improve patient outcomes.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
              <button className="bg-white text-teal-600 px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:scale-105 transition-transform shadow-2xl">
                Schedule a Demo
              </button>
              <button className="bg-white/20 text-white border border-white/30 backdrop-blur px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:bg-white/30 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}