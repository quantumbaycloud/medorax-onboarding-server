import { Helmet } from "react-helmet-async";

export default function Solutions() {
  const solutionsData = [
    {
      title: "For Pharmacy Owners",
      desc: "Eliminate administrative friction with a clinical-first ERP that automates the mundane, letting you focus on patient care.",
      icon: "storefront",
      bgIcon: "local_pharmacy",
      features: [
        { label: "Modern ERP", desc: "Cloud-native prescription and labor management." },
        { label: "Inventory AI", desc: "Predictive restocking and waste reduction." },
        { label: "Smart Billing", desc: "Automated claim reconciliation and audit trails." }
      ]
    },
    {
      title: "For Distributors",
      desc: "Master the logistics of life-saving medicine with real-time intelligence.",
      icon: "local_shipping",
      features: [
        "Procurement Network Optimization",
        "Real-time Sales Tracking",
        "Warehouse AI Efficiency"
      ]
    },
    {
      title: "For Healthcare Networks",
      desc: "Aggregate data across thousands of nodes. Maintain complete oversight of multi-location dispensing and global supply chain integrity.",
      icon: "hub",
      stats: [
        { value: "99.9%", label: "Visibility Accuracy" },
        { value: "40%", label: "Procurement Savings" }
      ],
      features: [
        { icon: "hub", title: "Multi-location Hub", desc: "Centralized control for regional networks." },
        { icon: "visibility", title: "Global Visibility", desc: "End-to-end audit for every single dosage." }
      ]
    }
  ];

  const comparisonData = [
    { capability: "Data Refresh Rate", traditional: "Daily / Batch", medorax: "Real-time Streaming" },
    { capability: "Inventory Management", traditional: "Manual Thresholds", medorax: "AI Predictive Analytics" },
    { capability: "Network Visibility", traditional: "Siloed Data", medorax: "Unified Ecosystem" },
    { capability: "Compliance Readiness", traditional: "Manual Audit Prep", medorax: "Automated HIPAA Logs" },
    { capability: "User Experience", traditional: "Complex Desktop Clients", medorax: "Cloud-Native Responsive" }
  ];

  return (
    <>
      <Helmet>
        <title>Solutions | MEDORAX - Healthcare Solutions</title>
        <meta name="description" content="Discover how MEDORAX solutions transform the healthcare industry with unified intelligence and real-time supply chain transparency." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      <section id="solutions" className="bg-[#F8FAFC] pt-20 sm:pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden px-4 sm:px-6" style={{
          backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8FAFC]/50"></div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center relative z-10 py-12 sm:py-16 md:py-20">
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#006b5f]/10 border border-[#006b5f]/20 text-[#006b5f] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mx-auto lg:mx-0">
                <span className="mr-1.5 sm:mr-2">●</span> NEXT-GEN OPERATING SYSTEM
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] bg-clip-text text-transparent">
                Unified Intelligence for the Pharmacy Ecosystem
              </h1>
              <p className="text-base sm:text-lg text-[#3c4947] max-w-xl mx-auto lg:mx-0">
                A clinical-grade AI platform orchestrating complex interactions between manufacturers, distributors, and providers with real-time supply chain transparency.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all text-sm sm:text-base">
                  Explore Platform <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
                </button>
                <button className="bg-white border border-[#E2E8F0] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-[#f2f3ff] transition-all text-sm sm:text-base">
                  View Case Studies
                </button>
              </div>
            </div>
            <div className="relative group mt-6 sm:mt-8 lg:mt-0">
              <div className="absolute -inset-3 sm:-inset-4 bg-[#006b5f]/20 rounded-[1.5rem] sm:rounded-[2rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-xl border border-[#E2E8F0] rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-4 overflow-hidden border-[#006b5f]/20">
                <img 
                  alt="Medorax Global Supply Chain Dashboard" 
                  className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrqQdOwGYq51JbBt43vt67cAn_a3MTi94quvCOgub6sm49rux1FVKypspDGRPqf-hDcbfy0n8fi5dYRHqaKFPExkA7vLxc8BYS0iH3PMFqQmaBQ6oCIUalFoS-bnNDQ2Q8DblvE6NLpuk5lVucYst5_N6H6jch9PqrDdEcw9oTZd7_-UCFjILAAm9upfxLniCX9-Da4KoYpJ4hBOv8L6SRV6l5AiADyZDw5TQ6lbmhhZTg-KOs6sYWWIU-6w6kOoNtu8VeiNCC2IEF"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#006b5f]/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Segment Bento Grid */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#faf8ff] px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-8 sm:mb-10 md:mb-16 space-y-2 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#131b2e]">Targeted Segment Solutions</h2>
              <p className="text-sm sm:text-base text-[#3c4947] max-w-2xl mx-auto">Precise intelligence tailored for every stakeholder in the global medication lifecycle.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
              {/* Pharmacy Owners */}
              <div className="md:col-span-8 group bg-white border border-[#E2E8F0] rounded-[1.5rem] p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 sm:p-6 md:p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[80px] sm:text-[100px] md:text-[120px] text-[#006b5f]" style={{ fontVariationSettings: "'FILL' 1" }}>local_pharmacy</span>
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-[#006b5f]/10 flex items-center justify-center mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-[#006b5f] text-xl sm:text-2xl">storefront</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">For Pharmacy Owners</h3>
                  <p className="text-sm sm:text-base text-[#3c4947] mb-4 sm:mb-6 md:mb-8 max-w-md">Eliminate administrative friction with a clinical-first ERP that automates the mundane, letting you focus on patient care.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-auto">
                    <div className="p-3 sm:p-4 rounded-xl bg-[#f2f3ff] border border-[#E2E8F0]">
                      <p className="font-bold text-[#006b5f] mb-0.5 sm:mb-1 text-sm sm:text-base">Modern ERP</p>
                      <p className="text-[10px] sm:text-xs text-[#3c4947]">Cloud-native prescription and labor management.</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-xl bg-[#f2f3ff] border border-[#E2E8F0]">
                      <p className="font-bold text-[#006b5f] mb-0.5 sm:mb-1 text-sm sm:text-base">Inventory AI</p>
                      <p className="text-[10px] sm:text-xs text-[#3c4947]">Predictive restocking and waste reduction.</p>
                    </div>
                    <div className="p-3 sm:p-4 rounded-xl bg-[#f2f3ff] border border-[#E2E8F0]">
                      <p className="font-bold text-[#006b5f] mb-0.5 sm:mb-1 text-sm sm:text-base">Smart Billing</p>
                      <p className="text-[10px] sm:text-xs text-[#3c4947]">Automated claim reconciliation and audit trails.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distributor */}
              <div className="md:col-span-4 bg-white border border-[#E2E8F0] rounded-[1.5rem] p-6 sm:p-8 hover:shadow-xl transition-all group border-t-2 border-t-[#006b5f]">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-[#0058be]/10 flex items-center justify-center mb-4 sm:mb-6">
                  <span className="material-symbols-outlined text-[#0058be] text-xl sm:text-2xl">local_shipping</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">For Distributors</h3>
                <p className="text-sm sm:text-base text-[#3c4947] mb-4 sm:mb-6">Master the logistics of life-saving medicine with real-time intelligence.</p>
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="material-symbols-outlined text-[#22C55E] text-sm sm:text-base mt-0.5">check_circle</span>
                    <span className="text-xs sm:text-sm font-medium">Procurement Network Optimization</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="material-symbols-outlined text-[#22C55E] text-sm sm:text-base mt-0.5">check_circle</span>
                    <span className="text-xs sm:text-sm font-medium">Real-time Sales Tracking</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3">
                    <span className="material-symbols-outlined text-[#22C55E] text-sm sm:text-base mt-0.5">check_circle</span>
                    <span className="text-xs sm:text-sm font-medium">Warehouse AI Efficiency</span>
                  </li>
                </ul>
                <button className="mt-6 sm:mt-8 text-[#0058be] font-bold flex items-center gap-2 hover:underline text-sm sm:text-base">
                  View Logistics Suite <span className="material-symbols-outlined text-sm sm:text-base">arrow_outward</span>
                </button>
              </div>

              {/* Healthcare Networks */}
              <div className="md:col-span-12 bg-white/70 backdrop-blur-xl border border-[#E2E8F0] rounded-[1.5rem] p-6 sm:p-8 border-l-4 border-l-[#0058be] relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 md:gap-12">
                  <div className="lg:w-1/2 space-y-4 sm:space-y-6">
                    <div className="inline-block px-2.5 sm:px-3 py-1 rounded bg-[#0058be]/10 text-[#0058be] text-[10px] sm:text-xs font-bold uppercase tracking-widest">Enterprise Solution</div>
                    <h3 className="text-xl sm:text-2xl font-bold">For Healthcare Networks</h3>
                    <p className="text-sm sm:text-base text-[#3c4947]">Aggregate data across thousands of nodes. Maintain complete oversight of multi-location dispensing and global supply chain integrity.</p>
                    <div className="flex gap-6 sm:gap-8">
                      <div>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0058be]">99.9%</div>
                        <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#3c4947]">Visibility Accuracy</div>
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0058be]">40%</div>
                        <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#3c4947]">Procurement Savings</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
                      <span className="material-symbols-outlined text-[#006b5f] text-xl sm:text-2xl mb-1 sm:mb-2">hub</span>
                      <h4 className="font-bold text-sm sm:text-base mb-0.5 sm:mb-1">Multi-location Hub</h4>
                      <p className="text-[10px] sm:text-xs text-[#3c4947]">Centralized control for regional networks.</p>
                    </div>
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm">
                      <span className="material-symbols-outlined text-[#006b5f] text-xl sm:text-2xl mb-1 sm:mb-2">visibility</span>
                      <h4 className="font-bold text-sm sm:text-base mb-0.5 sm:mb-1">Global Visibility</h4>
                      <p className="text-[10px] sm:text-xs text-[#3c4947]">End-to-end audit for every single dosage.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 sm:py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Why Medorax?</h2>
            <p className="text-sm sm:text-base text-[#3c4947]">Comparing clinical-grade intelligence vs. legacy infrastructure.</p>
          </div>
          <div className="overflow-x-auto rounded-[1.5rem] border border-[#E2E8F0] bg-white shadow-xl">
            <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-[600px]">
              <thead>
                <tr className="bg-[#f2f3ff] border-b border-[#E2E8F0]">
                  <th className="p-4 sm:p-6 md:p-8 font-bold text-[#131b2e] text-sm sm:text-base">Capabilities</th>
                  <th className="p-4 sm:p-6 md:p-8 font-bold text-[#131b2e] text-sm sm:text-base">Traditional Software</th>
                  <th className="p-4 sm:p-6 md:p-8 font-bold text-white bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-sm sm:text-base">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <span className="material-symbols-outlined text-white text-base sm:text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                      Medorax AI
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {comparisonData.map((item, index) => (
                  <tr key={index} className={index % 2 === 1 ? 'bg-[#faf8ff]' : ''}>
                    <td className="p-4 sm:p-6 md:p-8 font-medium text-sm sm:text-base">{item.capability}</td>
                    <td className="p-4 sm:p-6 md:p-8 text-[#3c4947] text-sm sm:text-base">{item.traditional}</td>
                    <td className="p-4 sm:p-6 md:p-8 font-bold text-[#006b5f] text-sm sm:text-base">{item.medorax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-10">
          <div className="max-w-[1280px] mx-auto bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 md:p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}></div>
            <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8 max-w-3xl mx-auto">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Ready to Modernize Your Pharmacy Operations?</h2>
              <p className="text-white/80 text-base sm:text-lg">Join 2,500+ pharmacies and distributors leveraging Medorax to streamline their business and improve patient outcomes.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
                <button className="bg-white text-[#006b5f] px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:scale-105 transition-transform shadow-2xl">
                  Schedule a Demo
                </button>
                <button className="bg-white/20 text-white border border-white/30 backdrop-blur px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:bg-white/30 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}