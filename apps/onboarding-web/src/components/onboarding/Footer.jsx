import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-white flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] sm:shadow-none">
      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0EA5A4] via-[#006B5F] to-[#2563EB]" />

      <div className="max-w-[1300px] mx-auto px-4 py-3 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-2">

        {/* Copyright */}
        <p className="order-2 sm:order-1 text-center sm:text-left text-[10px] sm:text-xs md:text-sm text-slate-600 leading-5">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#006B5F]">
            Medorax Healthcare india private limited
          </span>
          <span className="hidden sm:inline">. All rights reserved.</span>
        </p>

        {/* Links */}
        <div className="order-1 sm:order-2 flex flex-wrap justify-center items-center gap-2 text-[10px] sm:text-xs md:text-sm">
          <Link
            to="/privacy-policy"
            className="text-slate-600 hover:text-[#006B5F] transition"
          >
            Privacy Policy
          </Link>

          <span className="text-slate-300">|</span>

          <Link
            to="/terms"
            className="text-slate-600 hover:text-[#006B5F] transition"
          >
            Terms of Service
          </Link>

          <span className="text-slate-300">|</span>

          <Link
            to="/compliance"
            className="text-slate-600 hover:text-[#006B5F] transition"
          >
            Compliance
          </Link>
        </div>

      </div>
    </footer>
  );
}