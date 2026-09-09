// src/components/login/RightPanel.jsx
import FloatingCard from "./FloatingCard";
import TrustBadges from "./TrustBadges";

export default function RightPanel() {
  return (
    <section className="hidden lg:flex w-[60%] relative overflow-hidden">
      {/* Background */}
      <img
        src="/images/login-bg.jpg"
        alt="Healthcare background"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop";
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#131B2E] via-[#131B2E]/40 to-transparent" />

      {/* Floating Cards */}
      <FloatingCard />

      {/* Bottom Content */}
      <div className="relative z-10 mt-auto p-20 text-white max-w-3xl">
        <h1 className="text-6xl font-bold leading-tight">
          Secure Intelligence
          <br />
          for
          <span className="text-[#4fdbc8]"> Modern Healthcare</span>
        </h1>

        <p className="mt-8 text-xl text-slate-300 leading-relaxed">
          The next generation ERP platform designed for
          pharmaceutical precision, regulatory compliance,
          and data-driven clinical excellence.
        </p>

        <div className="mt-14">
          <TrustBadges />
        </div>
      </div>
    </section>
  );
}