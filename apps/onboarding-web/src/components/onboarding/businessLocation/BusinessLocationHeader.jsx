import ProgressHeader from "../bussinesType/ProgressHeader";

export default function BusinessLocationHeader({
  businessType,
  isMobile = false,
}) {
  return (
    <div className="px-3 sm:px-4 pt-2 pb-2 border-b border-slate-200">
      <ProgressHeader
        step={4}
        totalSteps={6}
        progress={66}
        title={
          businessType === "Distributor"
            ? "Warehouse Location"
            : "Pharmacy Location"
        }
        subtitle={isMobile ? "" : "Pin your exact business address on the map to verify your operational location."}
      />
    </div>
  );
}