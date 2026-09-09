export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-6">
        
        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl sm:text-2xl">MEDORAX</span>
          </div>
          <p className="text-sm text-slate-600">
            Digitizing the backbone of India's healthcare retail system with cutting-edge AI and cloud technology.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-600 hover:text-teal-600 transition-colors">
              <span className="material-symbols-outlined text-xl sm:text-2xl">public</span>
            </a>
            <a href="#" className="text-slate-600 hover:text-teal-600 transition-colors">
              <span className="material-symbols-outlined text-xl sm:text-2xl">alternate_email</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-bold mb-4 sm:mb-6">Products</h3>
          <ul className="space-y-3 sm:space-y-4">
            <li><a href="#" className="text-sm text-slate-600 hover:text-teal-600">Pharmacy ERP</a></li>
            <li><a href="#" className="text-sm text-slate-600 hover:text-teal-600">Marketplace</a></li>
            <li><a href="#" className="text-sm text-slate-600 hover:text-teal-600">Distributor App</a></li>
            <li><a href="#" className="text-sm text-slate-600 hover:text-teal-600">Supply Chain AI</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-bold mb-4 sm:mb-6">Company</h3>
          <ul className="space-y-3 sm:space-y-4">
            <li><a href="/about" className="text-sm text-slate-600 hover:text-teal-600">About Us</a></li>
            <li><a href="#" className="text-sm text-slate-600 hover:text-teal-600">Careers</a></li>
            <li><a href="#" className="text-sm text-slate-600 hover:text-teal-600">Success Stories</a></li>
            <li><a href="#" className="text-sm text-slate-600 hover:text-teal-600">API Docs</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-bold mb-4 sm:mb-6">Compliance</h3>
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center" title="GST Compliant">
              <span className="material-symbols-outlined text-slate-600 text-xl sm:text-2xl">verified</span>
            </div>
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center" title="HIPAA Compliant">
              <span className="material-symbols-outlined text-slate-600 text-xl sm:text-2xl">security</span>
            </div>
          </div>
          <p className="text-sm text-slate-600">Licensed and verified for Indian pharmaceutical distribution standards.</p>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">© 2026  Medorax Healthcare india private limited.  All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <a href="/privacy-policy" className="text-xs sm:text-sm text-slate-600 hover:text-teal-600">Privacy Policy</a>
          <a href="/terms-of-service" className="text-xs sm:text-sm text-slate-600 hover:text-teal-600">Terms of Service</a>
          <a href="/support " className="text-xs sm:text-sm text-slate-600 hover:text-teal-600">Support</a>
        </div>
      </div>
    </footer>
  );
}