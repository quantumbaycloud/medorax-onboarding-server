// src/components/onboarding/verification/VerificationLayout.jsx

import TopNavbar from "../TopNavbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import VerificationBackground from "./VerificationBackground";

export default function VerificationLayout({
  children,
  active = "Verification",
}) {
  return (
    <div className="h-screen min-h-0 flex flex-col overflow-hidden bg-[#F8FAFC]">
      {/* NAVBAR */}
      <header className="h-14 sm:h-16 shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur-md z-50">
        <TopNavbar />
      </header>

      {/* BODY */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="hidden md:flex w-[220px] lg:w-[240px] shrink-0 flex-col border-r border-slate-200 bg-white/80 backdrop-blur-md overflow-hidden">
          <Sidebar active={active} />
        </aside>

        {/* RIGHT SIDE */}
        <section className="flex flex-1 min-w-0 min-h-0 flex-col overflow-hidden">

          {/* MAIN */}
          <main className="relative flex-1 min-h-0 overflow-hidden">
            <VerificationBackground />

            <div
              className="
                relative
                z-10
                flex
                h-full
                min-h-0
                flex-col
                px-3
                sm:px-4
                md:px-6
                pt-3
                sm:pt-4
                pb-2
                sm:pb-3
                overflow-hidden
              "
            >
              {children}
            </div>
          </main>

          {/* FOOTER */}
          <div className="shrink-0 border-t border-slate-200 bg-white/80 backdrop-blur-md">
            <Footer />
          </div>

        </section>
      </div>
    </div>
  );
}