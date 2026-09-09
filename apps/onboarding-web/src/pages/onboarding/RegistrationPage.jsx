import TopNavbar from "../../components/onboarding/TopNavbar";
import Sidebar from "../../components/onboarding/Sidebar";
import HeroSection from "../../components/onboarding/HeroSection";
import RegistrationForm from "../../components/onboarding/RegistrationForm";
import Footer from "../../components/onboarding/Footer";

export default function RegistrationPage() {
  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">

      {/* Navbar */}
      <TopNavbar />

      {/* Main */}
      <div className="flex flex-1 pt-16 overflow-hidden ">

        {/* Sidebar - Hidden on mobile/tablet, shown on large screens */}
        <div className="hidden lg:block w-[250px] shrink-0 h-full overflow-hidden">
          <Sidebar />
        </div>

        {/* Content - Stack on mobile, side by side on large */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden bg-[#F8FAFC] ">

          <HeroSection />

          <RegistrationForm />

        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}