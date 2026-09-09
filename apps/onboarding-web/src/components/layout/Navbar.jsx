import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isProductsPage = location.pathname === "/products";
  const isAIPlatformPage = location.pathname === "/ai-platform";
  const isSolutionsPage = location.pathname === "/solutions";
  const isPricingPage = location.pathname === "/pricing";
  const isContactPage = location.pathname === "/contact";
  const isOnboardingPage = location.pathname === "/onboarding";
  const isLoginPage = location.pathname === "/login";

  const navLinks = [
    { to: "/", label: "Home", active: isHomePage },
    { to: "/about", label: "About", active: isAboutPage },
    { to: "/products", label: "Products", active: isProductsPage },
    { to: "/ai-platform", label: "AI Platform", active: isAIPlatformPage },
    { to: "/solutions", label: "Solutions", active: isSolutionsPage },
    { to: "/pricing", label: "Pricing", active: isPricingPage },
    { to: "/contact", label: "Contact", active: isContactPage },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm shadow-teal-500/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src={logo}
              className="h-10 sm:h-13 w-auto"
              alt="MEDORAX Logo"
            />
          </Link>

          <Link
            to="/"
            className="font-bold text-lg sm:text-xl bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent"
          >
            MEDORAX
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm ${
                link.active
                  ? "font-bold text-teal-600 border-b-2 border-teal-600"
                  : "text-slate-600 hover:text-teal-600 transition-colors relative group"
              } pb-1 transition-all`}
            >
              {link.label}

              {!link.active && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Login */}
          <Link
            to="/login"
            className={`text-xs sm:text-sm ${
              isLoginPage
                ? "font-bold text-teal-600 border-b-2 border-teal-600"
                : "text-teal-600 hover:opacity-80"
            } transition-all hidden sm:block`}
          >
            Login
          </Link>

          {/* Get Started */}
          <Link
            to="/onboarding"
            className={`text-xs sm:text-sm ${
              isOnboardingPage
                ? "font-bold text-teal-600 border-b-2 border-teal-600"
                : "text-slate-600 hover:text-teal-600 transition-colors relative group"
            } pb-1 transition-all hidden sm:block`}
          >
            Get Started

            {!isOnboardingPage && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl text-slate-700">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200/50 px-4 py-4 space-y-1">

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm ${
                link.active
                  ? "bg-teal-50 text-teal-600 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              } transition-colors`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-slate-200/50 my-2 pt-2 flex flex-col gap-2">

            {/* Get Started */}
            <Link
              to="/onboarding"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-center"
            >
              Get Started
            </Link>

            {/* Login */}
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm text-center ${
                isLoginPage
                  ? "bg-teal-50 text-teal-600 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              } transition-colors`}
            >
              Login
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}