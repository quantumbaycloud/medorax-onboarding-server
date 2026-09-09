export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Building India's Digital Pharmacy Infrastructure</h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div className="p-6 sm:p-8 md:p-10 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl border-t-4 border-teal-500">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4 sm:mb-6">
              <span className="material-symbols-outlined text-xl sm:text-2xl">visibility</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Vision</h3>
            <p className="text-sm sm:text-base text-slate-600">To create a transparent, efficient, and technology-driven pharmaceutical supply chain where every patient has instant access to life-saving medicines through a connected pharmacy network.</p>
          </div>
          
          <div className="p-6 sm:p-8 md:p-10 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-xl border-t-4 border-blue-500">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 sm:mb-6">
              <span className="material-symbols-outlined text-xl sm:text-2xl">rocket_launch</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h3>
            <p className="text-sm sm:text-base text-slate-600">To empower local pharmacy owners with cloud-native ERP tools and a direct procurement marketplace, reducing inventory waste and increasing operational profitability across India.</p>
          </div>
        </div>
      </div>
    </section>
  );
}