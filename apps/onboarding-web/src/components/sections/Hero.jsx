import { useState, useEffect } from "react";
import hero from "../../assets/hero.webp";
import { Link } from "react-router-dom";

export default function Hero() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const amount = 20;
      const x = (e.clientX / window.innerWidth - 0.5) * amount;
      const y = (e.clientY / window.innerHeight - 0.5) * amount;
      setRotation({ x: -y, y: x });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-gradient-to-b from-cyan-50 to-white overflow-hidden hero-gradient"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-6 items-center">
        
        <div className="stagger-in visible text-center lg:text-left" id="hero-text">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs sm:text-sm mb-4 sm:mb-6">
            Built for Bharat
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            India's Next-Generation 
            <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Pharmacy Operating System
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-10 max-w-lg mx-auto lg:mx-0">
            The world's first AI-powered ERP and procurement ecosystem designed to digitize India's 1.2M+ pharmacies and distribution network.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link
              to="/onboarding"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-xl shadow-teal-500/30 hover:scale-105 transition-transform flex items-center gap-2 text-sm sm:text-base"
            >
              Get Started
              <span className="material-symbols-outlined text-lg sm:text-xl">arrow_forward</span>
            </Link>

            <button className="bg-white/70 backdrop-blur-xl border border-slate-200 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white transition-all flex items-center gap-2 text-sm sm:text-base">
              Book Demo 
              <span className="material-symbols-outlined text-lg sm:text-xl">play_circle</span>
            </button>
          </div>
        </div>
        
        <div className="relative animate-float mt-8 sm:mt-10 lg:mt-0">
          <div className="absolute -inset-6 sm:-inset-10 bg-teal-500/20 blur-[60px] sm:blur-[100px] rounded-full"></div>
          <img 
            src={hero} 
            alt="Hero Dashboard Interface" 
            className="relative rounded-xl shadow-2xl border border-white/40 transition-transform duration-100 ease-out w-full"
            style={{ 
              transform: `perspective(1000px) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`
            }}
          />
        </div>
        
      </div>
    </section>
  );
}