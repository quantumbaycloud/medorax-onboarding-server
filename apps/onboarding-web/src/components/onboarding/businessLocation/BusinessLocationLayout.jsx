import BusinessLocationMap from "./BusinessLocationMap";
import BusinessLocationSidebar from "./BusinessLocationSidebar";
import { useState } from "react";
import { Map, Menu, X } from "lucide-react";

export default function BusinessLocationLayout({
  businessType,
  businessData,
  setBusinessData,
}) {
  const [showMap, setShowMap] = useState(false);
  const [showForm, setShowForm] = useState(true);

  // Mobile toggle between map and form
  const toggleView = () => {
    setShowMap(!showMap);
    setShowForm(!showForm);
  };

  return (
    <div className="h-full w-full overflow-hidden">
      {/* ===== MOBILE VIEW ===== */}
      <div className="block lg:hidden h-full w-full relative">
        {/* Toggle Button - Floating */}
        <button
          onClick={toggleView}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white shadow-2xl rounded-full px-5 py-3 flex items-center gap-2 border border-slate-200 hover:border-[#006B5F] transition-all duration-300"
        >
          {showMap ? (
            <>
              <Menu size={18} className="text-[#006B5F]" />
              <span className="text-sm font-semibold text-slate-700">Show Form</span>
            </>
          ) : (
            <>
              <Map size={18} className="text-[#006B5F]" />
              <span className="text-sm font-semibold text-slate-700">Show Map</span>
            </>
          )}
        </button>

        {/* Map View */}
        {showMap && (
          <div className="h-full w-full">
            <BusinessLocationMap
              businessType={businessType}
              businessData={businessData}
              setBusinessData={setBusinessData}
              isMobile={true}
              onBack={() => {
                setShowMap(false);
                setShowForm(true);
              }}
            />
          </div>
        )}

        {/* Form View */}
        {showForm && (
          <div className="h-full w-full">
            <BusinessLocationSidebar
              businessType={businessType}
              businessData={businessData}
              setBusinessData={setBusinessData}
              isMobile={true}
              onShowMap={() => {
                setShowMap(true);
                setShowForm(false);
              }}
            />
          </div>
        )}
      </div>

      {/* ===== DESKTOP VIEW ===== */}
      <div className="hidden lg:flex h-full w-full rounded-3xl bg-white shadow-xl overflow-hidden">
        {/* Left Map */}
        <div className="flex-1 h-full relative overflow-hidden">
          <BusinessLocationMap
            businessType={businessType}
            businessData={businessData}
            setBusinessData={setBusinessData}
            isMobile={false}
          />
        </div>

        {/* Right Panel */}
        <div className="w-[470px] min-w-[470px] max-w-[470px] h-full border-l border-slate-200 bg-white overflow-hidden flex flex-col">
          <BusinessLocationSidebar
            businessType={businessType}
            businessData={businessData}
            setBusinessData={setBusinessData}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
}