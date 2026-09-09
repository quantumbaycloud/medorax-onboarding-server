import BusinessLocationHeader from "./BusinessLocationHeader";
import BusinessLocationForm from "./BusinessLocationForm";
import { MapPin } from "lucide-react";

export default function BusinessLocationSidebar({
  businessType,
  businessData,
  setBusinessData,
  onShowMap,
  isMobile = false,
}) {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      {/* Fixed Header */}
      <div className="shrink-0">
        <BusinessLocationHeader businessType={businessType} isMobile={isMobile} />
      </div>

      {/* Only this area scrolls */}
      <div className="flex-1 overflow-y-auto">
        <BusinessLocationForm
          businessType={businessType}
          businessData={businessData}
          setBusinessData={setBusinessData}
          isMobile={isMobile}
          onShowMap={onShowMap}
        />
      </div>
    </div>
  );
}