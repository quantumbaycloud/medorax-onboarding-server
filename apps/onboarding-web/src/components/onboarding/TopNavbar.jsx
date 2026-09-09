import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function TopNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm flex-shrink-0">
      <div className="max-w-[1700px] mx-auto h-full flex items-center justify-between px-4 sm:px-6 md:px-8">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={logo}
            alt="MEDORAX"
            className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 rounded-xl object-contain"
          />

          <h1 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold tracking-wide text-[#006B5F]">
            MEDORAX
          </h1>
        </div>

        {/* Center Navigation - Hidden on mobile/tablet */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10">

          <Link
            to="/"
            className="text-gray-700 hover:text-[#006B5F] transition font-medium text-sm xl:text-base"
          >
            Home
          </Link>

          <button className="relative text-[#006B5F] font-semibold text-[15px] xl:text-[17px]">
            Onboarding Progress

            <span className="absolute left-0 -bottom-3 w-full h-[3px] rounded-full bg-[#006B5F]"></span>
          </button>

          <button className="text-gray-700 hover:text-[#006B5F] transition text-sm xl:text-base">
            Help Center
          </button>

          <button className="text-gray-700 hover:text-[#006B5F] transition text-sm xl:text-base">
            Support
          </button>

        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">

          <button className="font-medium text-xs sm:text-sm text-gray-700 hover:text-[#006B5F] transition hidden sm:block">
            Save & Exit
          </button>

          <button className="hover:text-[#006B5F] transition">
            <span className="material-symbols-outlined text-lg sm:text-xl md:text-2xl">
              notifications
            </span>
          </button>

          <button className="hover:text-[#006B5F] transition">
            <span className="material-symbols-outlined text-lg sm:text-xl md:text-2xl">
              account_circle
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}