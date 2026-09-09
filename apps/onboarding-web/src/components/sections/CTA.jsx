export default function CTA() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] md:w-[800px] h-[500px] sm:h-[600px] md:h-[800px] bg-teal-500/10 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"></div>
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Pharmacy Business?</h2>
        <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-10">Join thousands of pharmacy owners who are already growing with MEDORAX Pharmacy OS.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl shadow-xl shadow-teal-500/30 hover:scale-105 transition-transform text-sm sm:text-base">
            Start Your Free Trial
          </button>
          
          <button className="bg-white/70 backdrop-blur-xl border border-slate-200 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl hover:bg-white transition-all text-sm sm:text-base">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}