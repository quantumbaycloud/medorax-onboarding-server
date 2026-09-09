import dashboard from "../../assets/aianalysis.webp";

export default function AISection() {
  return (
    <section id="ai-platform" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        <div className="lg:w-1/2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm mb-6">
            The MEDORAX Intelligence Engine
          </span>
          
          <h2 className="text-4xl font-bold mb-8">Advanced Pharmacy Forecasting</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-teal-600">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <div>
                <h4 className="font-bold mb-2">Demand Forecasting</h4>
                <p className="text-sm text-slate-600">AI predicts medication demand based on seasonal trends and local health outbreaks.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-teal-600">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                <h4 className="font-bold mb-2">Smart Low-Stock Alerts</h4>
                <p className="text-sm text-slate-600">Automated alerts ensure you never run out of critical life-saving medications.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-teal-600">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <div>
                <h4 className="font-bold mb-2">Expiry Management</h4>
                <p className="text-sm text-slate-600">Prevent revenue leakage with proactive tracking of medication expiry dates.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="absolute -inset-20 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 blur-[80px] rounded-full"></div>
          <img 
            src={dashboard} 
            alt="AI Analytics Panel" 
            className="relative z-10 rounded-xl shadow-2xl border border-white"
          />
        </div>
        
      </div>
    </section>
  );
}