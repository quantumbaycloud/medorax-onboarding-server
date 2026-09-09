import { Helmet } from "react-helmet-async";
import about from "../assets/about.webp";
export default function AboutPage() {
  const leaders = [
    {
      name: "Mr. Samar Khurana",
      role: "Chairperson",
      din: "DIN: 11852002",
      desc: "Former Director of Health Services, Government of India. Leading Medorax's healthcare policy and regulatory strategy with 30+ years of experience.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLXZ5zB1CKzSlaqoFToCGwV-QhQOc-1UX26H43rq7OtOMLdg9-FXbLed4BbGWb3Uf7jBt0AVCSHIXROHH9mhgN9uwO6wtAnivXHzzwohMMm2fPeyMv7aRR6hkBe7ssgXAHRJlU8IdV7pSqPJGBSWrDnt6Xugh1B94m3QqEGMtJgnWLskVehp0O2n3IN-ubrEwm8P3LkLEEJV8mZSneve-CZqvMmp6qQ7eNnJhCdFGK7QMjWsxI5BPAQyBUi5B59RVza0wwrID5nnhv"
    },
    {
      name: "Mr. Ankush Jangra",
      role: "Founder & CEO",
      din: "DIN: 11852001",
      desc: "Ex-IIT, specialized in supply chain systems for massive scale.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLXZ5zB1CKzSlaqoFToCGwV-QhQOc-1UX26H43rq7OtOMLdg9-FXbLed4BbGWb3Uf7jBt0AVCSHIXROHH9mhgN9uwO6wtAnivXHzzwohMMm2fPeyMv7aRR6hkBe7ssgXAHRJlU8IdV7pSqPJGBSWrDnt6Xugh1B94m3QqEGMtJgnWLskVehp0O2n3IN-ubrEwm8P3LkLEEJV8mZSneve-CZqvMmp6qQ7eNnJhCdFGK7QMjWsxI5BPAQyBUi5B59RVza0wwrID5nnhv"
    },
    {
      name: "Mr. Pulkit Kumar Talan",
      role: "CTO",

      desc: "Pioneer in AI-driven healthcare diagnostics and predictive modeling.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbEJscGBi_FqeJt0NpZbO3-fzbo6xjZrwm04CgEdUbVw09fZMXM5o-bHG7h4TRAWj_vpq5wJb9UklwLK0C1WA-Xom1o32Us8vNY5DvYEYPiYMbItvAibIl78pyoYIHd00HQW1ySoxQ3Re_OyPG7kkhI6QaJXK09Olh6EjoRm60E4djWIaiWN97GOxWnZRYAVsJYZKQQCYu8SEEVe619l4ny9pXcgUUIprDXiKXDD7UfT5huCJoRk902ECIKWYFLwxJ4Ea4ipfEHVgA"
    },
    {
      name: "Vikram Mehta",
      role: "Head of Operations", 
      desc: "Managed logistics for India's largest retail pharmacy chains.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXLrtBMZ1YnXbE_6b90C4zSLyDYtxXH38Jl-lquhdVbtTnZpSc9Sz1ldmrvYcHJY1yX0rdNKzqfFMVj_Rdg8FdMLw6MdK1f3sficl0OJkITdHMRRVu1j33moLCa7xU7jnnJtvPR5063f0ZJ1qlfR_RBMCUPkpCuiNB9j2l68MjYU2CaukEPsImE0KbOV3Bvi1maR1T-LCLiZTlh3yYnf6_DbMHlM5mfS4Bx58ezBFiE4vduPB8Z-AfcrLv39AiJ17r4lj5IPRc6p8f"
    }
  ];

  const values = [
    {
      icon: "verified_user",
      title: "Trust",
      desc: "HIPAA-compliant systems ensuring data integrity and security for every transaction."
    },
    {
      icon: "psychology",
      title: "Innovation",
      desc: "Pioneering AI models that predict demand and optimize inventory for small businesses."
    },
    {
      icon: "bolt",
      title: "Efficiency",
      desc: "Reducing operational waste to make healthcare more affordable for the end consumer."
    },
    {
      icon: "travel_explore",
      title: "Accessibility",
      desc: "Reaching every corner of India, from tier-1 cities to the most remote villages."
    }
  ];

return (
    <>
      <Helmet>
        <title>About | MEDORAX - Digital Pharmacy Infrastructure</title>
        <meta name="description" content="Learn about MEDORAX and our mission to build India's digital pharmacy infrastructure." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      <section className="bg-[#F8FAFC]">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center py-16 sm:py-20 md:py-24 overflow-hidden px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center relative z-10">
            <div className="space-y-4 sm:space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006b5f]/10 text-[#006b5f] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mx-auto md:mx-0">
                <span className="material-symbols-outlined text-[12px] sm:text-[14px]">public</span>
                DIGITAL PHARMACY INFRASTRUCTURE
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#131b2e] leading-tight">
                Building India's <span className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] bg-clip-text text-transparent">Digital Pharmacy</span> Infrastructure
              </h1>
              <p className="text-base sm:text-lg text-[#3c4947] max-w-xl mx-auto md:mx-0">
                At Medorax, we are creating the operating system for the next generation of healthcare. We empower independent pharmacies with cloud-native intelligence to serve millions better.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center md:justify-start">
                <button className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold shadow-xl active:scale-95 transition-all text-sm sm:text-base">
                  Learn Our Story
                </button>
                <button className="bg-white/70 backdrop-blur-xl border border-[#E2E8F0] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold hover:border-[#006b5f] transition-all active:scale-95 text-sm sm:text-base">
                  Our Impact
                </button>
              </div>
            </div>
            <div className="relative mt-6 sm:mt-8 md:mt-0">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-[#006b5f]/20 to-[#0058be]/20 blur-3xl opacity-50 -z-10 rounded-full"></div>
              <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  alt="The Medorax Team working in a modern office" 
                  className="w-full aspect-[4/3] object-cover" 
                  src={about}
                />
              </div>
              {/* Stats Floating Card */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-4 sm:p-6 rounded-2xl shadow-xl border-white/50 max-w-[160px] sm:max-w-[200px]">
                <div className="text-[#006b5f] font-bold text-2xl sm:text-3xl">1.2M+</div>
                <div className="text-[#3c4947] text-[10px] sm:text-xs leading-tight">Pharmacies in our target network across India</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section - Bento Grid */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#faf8ff] relative px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
              {/* Mission Card */}
              <div className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-6 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between border-t-2 border-t-[#006b5f]">
                <div className="space-y-3 sm:space-y-4">
                  <span className="material-symbols-outlined text-[#006b5f] text-3xl sm:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                  <h2 className="text-2xl sm:text-3xl font-bold">Our Mission</h2>
                  <p className="text-base sm:text-lg text-[#3c4947] leading-relaxed">
                    To digitize 1.2M+ independent pharmacies by providing them with enterprise-grade technology, streamlined supply chains, and AI-driven inventory management. We are leveling the playing field for local pharmacies in a digital-first world.
                  </p>
                </div>
                <div className="mt-6 sm:mt-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#E2E8F0]"></div>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#3c4947]">THE DIGITAL BACKBONE</span>
                </div>
              </div>
              {/* Vision Card */}
              <div className="bg-white/70 backdrop-blur-xl border border-[#E2E8F0] p-6 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-white to-[#0058be]/5 border-t-2 border-t-[#0058be]">
                <div className="space-y-3 sm:space-y-4">
                  <span className="material-symbols-outlined text-[#0058be] text-3xl sm:text-4xl">visibility</span>
                  <h2 className="text-2xl sm:text-3xl font-bold">Our Vision</h2>
                  <p className="text-sm sm:text-base text-[#3c4947] leading-relaxed">
                    A connected, transparent, and efficient healthcare supply chain where every citizen has access to genuine medicine through a technology-enabled local pharmacy network.
                  </p>
                  <div className="pt-6 sm:pt-8 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-[#E2E8F0] text-center">
                      <div className="text-[#0058be] font-bold text-sm sm:text-base">100%</div>
                      <div className="text-[8px] sm:text-[10px] text-[#3c4947]">Transparency</div>
                    </div>
                    <div className="p-2 sm:p-3 bg-white rounded-xl shadow-sm border border-[#E2E8F0] text-center">
                      <div className="text-[#0058be] font-bold text-sm sm:text-base">Zero</div>
                      <div className="text-[8px] sm:text-[10px] text-[#3c4947]">Stockouts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Values that Guide Us</h2>
            <p className="text-sm sm:text-base text-[#3c4947] max-w-2xl mx-auto">
              Our culture is built on a foundation of clinical rigor and technological excellence.
            </p>
          </div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value) => (
              <div key={value.title} className="group p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#006b5f] hover:shadow-xl transition-all duration-300">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#006b5f]/10 flex items-center justify-center text-[#006b5f] mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{value.title}</h3>
                <p className="text-xs sm:text-sm text-[#3c4947]">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#eaedff] overflow-hidden px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-12 md:mb-16 gap-4 sm:gap-6 text-center md:text-left">
              <div>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#006b5f]">Expertise</span>
                <h2 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">Visionary Leadership</h2>
              </div>
              <div className="max-w-md text-sm sm:text-base text-[#3c4947] mx-auto md:mx-0 md:text-right">
                Our team brings together veterans from health-tech, logistics, and retail to solve India's toughest pharmaceutical challenges.
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {leaders.map((leader) => (
                <div key={leader.name} className="bg-white/70 backdrop-blur-xl border border-[#E2E8F0] rounded-[1.5rem] overflow-hidden border-white group">
                  <div className="aspect-square bg-[#dae2fd] relative flex items-center justify-center overflow-hidden">
                    <span className="material-symbols-outlined text-4xl sm:text-6xl text-[#006b5f] opacity-20">person</span>
                    <img 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={leader.image} 
                      alt={leader.name}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h4 className="text-base sm:text-[18px] font-bold mb-0.5 sm:mb-1">{leader.name}</h4>
                    <p className="text-[10px] sm:text-xs text-[#006b5f] mb-1 uppercase tracking-wider">{leader.role}</p>
                    <p className="text-[8px] sm:text-[10px] text-[#3c4947] mb-2 sm:mb-3 font-mono tracking-wider">{leader.din}</p>
                    <p className="text-xs sm:text-sm text-[#3c4947] line-clamp-3">{leader.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 md:py-24 relative px-4 sm:px-6">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8 max-w-3xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Join the Pharmacy Revolution</h2>
                <p className="text-white/80 text-base sm:text-lg">
                  Whether you are a pharmacist looking to digitize or a partner wanting to reach more patients, Medorax is your gateway to the future.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
                  <button className="bg-white text-[#006b5f] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95 text-sm sm:text-base">
                    Partner with Us
                  </button>
                  <button className="bg-transparent text-white border-2 border-white/30 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95 text-sm sm:text-base">
                    View Open Positions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}