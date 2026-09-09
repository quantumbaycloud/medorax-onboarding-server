import { Helmet } from "react-helmet-async";
import ai from "../assets/ai.webp";
import ai1 from "../assets/ai1.webp";

export default function AIPlatformPage() {
  return (
    <>
      <Helmet>
        <title>AI Platform | Medorax</title>
        <meta name="description" content="Explore the Medorax AI platform and its clinical-grade intelligence for healthcare logistics." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      <section className="bg-[#F8FAFC] font-body-md text-[#131b2e] pt-20 sm:pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-32 px-4 sm:px-6" style={{
          backgroundImage: 'radial-gradient(at 0% 0%, rgba(14, 165, 164, 0.1) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(37, 99, 235, 0.1) 0, transparent 50%)'
        }}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="max-w-3xl text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/20 mb-4 sm:mb-6">
                <span className="material-symbols-outlined text-[#006b5f] text-[14px] sm:text-[16px] md:text-[18px]">neurology</span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#006b5f]">Deep Dive Series</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Clinical-Grade <span className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] bg-clip-text text-transparent">Intelligence</span>
              </h1>
              <p className="text-base sm:text-lg text-[#3c4947] mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto sm:mx-0">
                The Medorax AI platform is a multi-layered neural framework engineered for high-stakes healthcare logistics. From predictive demand sensing to autonomous route correction, we translate clinical data into operational certainty.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
                <button className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-bold shadow-lg hover:-translate-y-0.5 transition-all text-sm sm:text-base">
                  Download Technical Spec
                </button>
                <button className="bg-white border border-[#E2E8F0] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:border-[#006b5f] transition-all text-sm sm:text-base">
                  Explore Documentation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Flowchart Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-white px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-8 sm:mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Unified AI Architecture</h2>
              <p className="text-sm sm:text-base text-[#3c4947] max-w-2xl mx-auto">The Medorax Intelligence Layer acts as the central nervous system, bridging manufacturers, pharmacies, and patients in real-time.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-3 sm:p-4 overflow-hidden border-2 border-[#006b5f]/10 rounded-[1.5rem] shadow-2xl animate-float">
              <img 
                alt="Technical Supply Chain Flowchart" 
                className="w-full h-auto rounded-xl object-cover" 
                src={ai}
              />
            </div>
          </div>
        </section>

        {/* Deep Dive Bento Grid */}
        <section className="py-12 sm:py-16 md:py-24 bg-[#F8FAFC] px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
              
              {/* 1. Predictive Demand Forecasting */}
              <div className="md:col-span-7 bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-6 sm:p-8 md:p-10 rounded-[1.5rem] flex flex-col justify-between group hover:shadow-2xl transition-all duration-500">
                <div>
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#14b8a6]/20 flex items-center justify-center mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[#006b5f] text-2xl sm:text-[28px] md:text-[32px]">query_stats</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Predictive Demand Forecasting</h3>
                  <p className="text-sm sm:text-base text-[#3c4947] mb-4 sm:mb-6 leading-relaxed">
                    Leveraging Transformer-based architectures to analyze temporal patient data, seasonal epidemiology trends, and local inventory levels. Our model reduces stock-outs by 42% through hyper-local demand sensing.
                  </p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#006b5f]"></span>
                    <span className="text-[11px] sm:text-xs font-medium text-[#131b2e]">Time-series anomaly detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#006b5f]"></span>
                    <span className="text-[11px] sm:text-xs font-medium text-[#131b2e]">Dynamic replenishment triggers</span>
                  </div>
                </div>
              </div>

              {/* 2. AI Prescription OCR Engine */}
              <div className="md:col-span-5 bg-[#283044] text-white border border-[#E2E8F0] p-6 sm:p-8 md:p-10 rounded-[1.5rem] group overflow-hidden relative">
                <div className="relative z-10">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#71f8e4]/20 flex items-center justify-center mb-4 sm:mb-6 md:mb-8 group-hover:rotate-12 transition-transform">
                    <span className="material-symbols-outlined text-[#71f8e4] text-2xl sm:text-[28px] md:text-[32px]">document_scanner</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">AI Prescription OCR</h3>
                  <p className="text-sm sm:text-base text-[#bbcac6] mb-6 sm:mb-8 opacity-80 leading-relaxed">
                    High-fidelity extraction of handwritten and digital prescriptions using Computer Vision with 99.9% clinical accuracy validation.
                  </p>
                  <div className="p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 font-mono text-[11px] sm:text-[13px] text-[#71f8e4] overflow-x-auto">
                    data_extract {`{`}<br/>
                      entity: "Amoxicillin",<br/>
                      dosage: "500mg",<br/>
                      confidence: 0.9982<br/>
                    {`}`}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 opacity-10">
                  <span className="material-symbols-outlined text-[80px] sm:text-[100px] md:text-[128px]">clinical_notes</span>
                </div>
              </div>

              {/* 3. Automated Route Optimization */}
              <div className="md:col-span-5 bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-6 sm:p-8 md:p-10 rounded-[1.5rem] flex flex-col justify-between group">
                <div className="bg-cover bg-center w-full h-32 sm:h-40 md:h-48 rounded-xl mb-4 sm:mb-6 md:mb-8 grayscale hover:grayscale-0 transition-all duration-700" 
                  style={{ 
                    backgroundImage: `url(${ai1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Route Optimization</h3>
                  <p className="text-sm sm:text-base text-[#3c4947] leading-relaxed">
                    Real-time heuristics for cold-chain compliance. Algorithms factor in temperature sensitivity, traffic density, and courier efficiency.
                  </p>
                </div>
              </div>

              {/* 4. Fraud & Compliance Monitoring */}
              <div className="md:col-span-7 bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-6 sm:p-8 md:p-10 rounded-[1.5rem] flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 md:gap-10 group bg-gradient-to-br from-white to-[#f2f3ff]">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Fraud & Compliance</h3>
                  <p className="text-sm sm:text-base text-[#3c4947] mb-4 sm:mb-6 leading-relaxed">
                    Multi-vector analysis to detect controlled substance diversion and billing irregularities. Our AI flags anomalies in provider behavior and patient patterns before they escalate into compliance breaches.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-[10px] sm:text-xs font-medium flex items-center gap-1.5 sm:gap-2">
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      SOC2 Type II
                    </div>
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#006b5f]/10 text-[#006b5f] text-[10px] sm:text-xs font-medium flex items-center gap-1.5 sm:gap-2">
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                      HIPAA Compliant
                    </div>
                  </div>
                </div>
                <div className="hidden md:block w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] rounded-full opacity-10 animate-pulse"></div>
                  <div className="absolute inset-4 border-2 border-dashed border-[#006b5f]/30 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#006b5f] text-3xl sm:text-4xl md:text-[48px]">policy</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="bg-[#283044] text-white border border-[#E2E8F0] p-6 sm:p-10 md:p-16 rounded-[1.5rem] relative overflow-hidden text-center">
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Ready to upgrade your clinical workflow?</h2>
                <p className="text-sm sm:text-base text-[#bbcac6] mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto opacity-90">Schedule a technical walkthrough with our engineering team and see how Medorax AI can transform your pharmacy operations.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 flex-wrap">
                  <button className="bg-[#006b5f] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-all text-sm sm:text-base">
                    Request Technical Demo
                  </button>
                  <button className="bg-white/10 text-white border border-white/20 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold hover:bg-white/20 transition-all text-sm sm:text-base">
                    View API Docs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>
    </>
  );
}