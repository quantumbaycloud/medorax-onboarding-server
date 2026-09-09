export default function DistributorFields({
  businessData,
  setBusinessData,
}) {
  const updateField = (field, value) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-5">
      {/* Company Name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Company Name
        </label>
        <input
          type="text"
          value={businessData.companyName || ""}
          onChange={(e) => updateField("companyName", e.target.value)}
          placeholder="Enter Company Name"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      {/* GST + PAN */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            GST Number
          </label>
          <input
            type="text"
            value={businessData.gstNumber || ""}
            onChange={(e) => updateField("gstNumber", e.target.value)}
            placeholder="GST Number"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            PAN Number
          </label>
          <input
            type="text"
            value={businessData.panNumber || ""}
            onChange={(e) => updateField("panNumber", e.target.value)}
            placeholder="PAN Number"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
      </div>

      {/* Drug License + Registration */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Drug License Number
          </label>
          <input
            type="text"
            value={businessData.drugLicenseNumber || ""}
            onChange={(e) => updateField("drugLicenseNumber", e.target.value)}
            placeholder="Drug License"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Drug License Expiry
          </label>
          <input
            type="date"
            value={businessData.drugLicenseExpiryDate?.split('T')[0] || ""}
            onChange={(e) => updateField("drugLicenseExpiryDate", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Distributor Registration Number
        </label>
        <input
          type="text"
          value={businessData.distributorRegistrationNumber || ""}
          onChange={(e) => updateField("distributorRegistrationNumber", e.target.value)}
          placeholder="Registration Number"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>
    </div>
  );
}