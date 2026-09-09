import { Helmet } from "react-helmet-async";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Medorax</title>
        <meta name="description" content="Get in touch with Medorax for inquiries, partnerships, or support. Our team is ready to assist you." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <section className="bg-[#F8FAFC] text-[#131b2e] font-body-md pt-20 sm:pt-24 md:pt-28">
        <main className="pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            
            {/* Hero Section */}
            <div className="text-center mb-10 sm:mb-12 md:mb-20">
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#006b5f] mb-2 sm:mb-4 block">
                Connect with our team
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 max-w-3xl mx-auto leading-[1.1]">
                Let's Build the <span className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] bg-clip-text text-transparent">Future of Pharmacy</span> Together.
              </h1>
              <p className="text-base sm:text-lg text-[#3c4947] max-w-2xl mx-auto">
                Transforming clinical operations with HIPAA-compliant intelligence. Reach out to discuss partnerships, platform demos, or custom solutions.
              </p>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* Left: Contact Info & Map */}
              <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                
                {/* Cards Info */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-6 sm:p-8 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#006b5f]/10 p-2.5 sm:p-3 rounded-xl text-[#006b5f]">
                        <span className="material-symbols-outlined text-xl sm:text-2xl">alternate_email</span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-[20px] font-bold mb-0.5 sm:mb-1">Email Us</h3>
                        <p className="text-sm sm:text-base text-[#3c4947] mb-2 sm:mb-3">Response within 24 business hours.</p>
                        <a className="text-[#006b5f] font-bold hover:underline text-sm sm:text-base" href="mailto:hello@medorax.in">hello@medorax.in</a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-6 sm:p-8 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow border-t-2 border-t-[#006b5f]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#006b5f]/10 p-2.5 sm:p-3 rounded-xl text-[#006b5f]">
                        <span className="material-symbols-outlined text-xl sm:text-2xl">location_on</span>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-[20px] font-bold mb-0.5 sm:mb-1">Corporate HQ</h3>
                        <p className="text-sm sm:text-base text-[#3c4947] mb-3 sm:mb-4 leading-relaxed">
                          Level 4, Tech Innovation Park,<br />
                          HSR Layout, Bengaluru,<br />
                          Karnataka 560102, India
                        </p>
                        <a className="text-[#0058be] font-medium inline-flex items-center gap-1 hover:gap-2 transition-all text-sm sm:text-base" href="#">
                          View on Maps <span className="material-symbols-outlined text-[16px] sm:text-[18px]">arrow_forward</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="relative overflow-hidden rounded-[1.5rem] h-[200px] sm:h-[250px] md:h-[300px] border border-[#E2E8F0] shadow-sm">
                  <div className="w-full h-full bg-[#eaedff] relative">
                    <div className="absolute inset-0 grayscale opacity-40">
                      <div className="absolute inset-0" style={{ 
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #006b5f 1px, transparent 1px)',
                        backgroundSize: '24px 24px' 
                      }}></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#006b5f] rounded-full flex items-center justify-center text-white shadow-xl animate-pulse">
                          <span className="material-symbols-outlined text-lg sm:text-xl">push_pin</span>
                        </div>
                        <div className="mt-1.5 sm:mt-2 bg-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md border border-[#E2E8F0]">
                          Medorax HQ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-6 sm:p-8 md:p-10 rounded-[1.5rem] shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-gradient-to-br from-[#006b5f]/10 to-[#0058be]/10 blur-[80px] sm:blur-[100px] pointer-events-none"></div>
                  
                  <form className="relative z-10 space-y-4 sm:space-y-6" id="contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-[10px] sm:text-xs font-medium text-[#3c4947] ml-1">Full Name</label>
                        <input 
                          className="w-full h-11 sm:h-14 px-4 sm:px-6 rounded-xl bg-[#F1F5F9] border-none focus:bg-white focus:border-[#006b5f] focus:shadow-[0_0_0_4px_rgba(0,107,95,0.1)] transition-all text-sm sm:text-base" 
                          placeholder="Dr. Sarah Johnson" 
                          required 
                          type="text"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <label className="text-[10px] sm:text-xs font-medium text-[#3c4947] ml-1">Email Address</label>
                        <input 
                          className="w-full h-11 sm:h-14 px-4 sm:px-6 rounded-xl bg-[#F1F5F9] border-none focus:bg-white focus:border-[#006b5f] focus:shadow-[0_0_0_4px_rgba(0,107,95,0.1)] transition-all text-sm sm:text-base" 
                          placeholder="sarah@pharmacy.com" 
                          required 
                          type="email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-[10px] sm:text-xs font-medium text-[#3c4947] ml-1">Business Type</label>
                      <select className="w-full h-11 sm:h-14 px-4 sm:px-6 rounded-xl bg-[#F1F5F9] border-none focus:bg-white focus:border-[#006b5f] focus:shadow-[0_0_0_4px_rgba(0,107,95,0.1)] transition-all text-sm sm:text-base appearance-none">
                        <option>Select sector...</option>
                        <option>Independent Pharmacy</option>
                        <option>Hospital Network</option>
                        <option>Pharma Manufacturing</option>
                        <option>Clinical Research</option>
                        <option>Enterprise IT Partner</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="text-[10px] sm:text-xs font-medium text-[#3c4947] ml-1">Message</label>
                      <textarea 
                        className="w-full p-4 sm:p-6 rounded-xl bg-[#F1F5F9] border-none focus:bg-white focus:border-[#006b5f] focus:shadow-[0_0_0_4px_rgba(0,107,95,0.1)] transition-all text-sm sm:text-base" 
                        placeholder="How can our AI platform assist your operations?" 
                        required 
                        rows="4"
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                      <input 
                        className="rounded border-[#E2E8F0] text-[#006b5f] focus:ring-[#006b5f] w-4 sm:w-5 h-4 sm:h-5" 
                        id="consent" 
                        type="checkbox"
                      />
                      <label className="text-xs sm:text-sm text-[#3c4947]" htmlFor="consent">
                        I agree to the <a className="underline text-[#006b5f]" href="#">Privacy Policy</a> regarding my data.
                      </label>
                    </div>
                    
                    <button 
                      className="w-full h-11 sm:h-14 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:shadow-[0_10px_15px_-3px_rgba(14,165,164,0.3)] hover:-translate-y-0.5 transition-all" 
                      type="submit"
                    >
                      Send Message
                      <span className="material-symbols-outlined text-lg sm:text-xl">send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <section className="mt-12 sm:mt-16 md:mt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 md:mb-12 gap-4 sm:gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1.5 sm:mb-2">Frequently Asked Questions</h2>
                  <p className="text-sm sm:text-base text-[#3c4947]">Get instant answers to common inquiries.</p>
                </div>
                <a className="text-[#006b5f] font-semibold flex items-center gap-2 hover:gap-3 transition-all group text-sm sm:text-base" href="#">
                  Visit Help Center 
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-lg sm:text-xl">arrow_right_alt</span>
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#006b5f] transition-colors cursor-pointer group">
                  <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-[#006b5f] transition-colors">Implementation Timeline</h4>
                  <p className="text-xs sm:text-sm text-[#3c4947] leading-relaxed">Most enterprise deployments for our AI OS are completed within 4-6 weeks including staff training.</p>
                </div>
                <div className="p-5 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#006b5f] transition-colors cursor-pointer group">
                  <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-[#006b5f] transition-colors">Compliance & Security</h4>
                  <p className="text-xs sm:text-sm text-[#3c4947] leading-relaxed">We are fully SOC2 Type II and HIPAA compliant, utilizing 256-bit AES encryption for all patient data.</p>
                </div>
                <div className="p-5 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#006b5f] transition-colors cursor-pointer group sm:col-span-2 lg:col-span-1">
                  <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-[#006b5f] transition-colors">Pricing Structure</h4>
                  <p className="text-xs sm:text-sm text-[#3c4947] leading-relaxed">Our modular pricing scales with your transaction volume, ensuring cost-efficiency for any size.</p>
                </div>
              </div>
            </section>
            
          </div>
        </main>

        {/* CSS Animation - Moved to a regular style tag without jsx attribute */}
        <style>{`
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </section>
    </>
  );
}