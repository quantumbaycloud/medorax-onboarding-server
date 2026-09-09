// src/components/onboarding/businessLocation/PharmacyFields.jsx

export default function PharmacyFields({
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
      {/* Pharmacy Name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Pharmacy Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="businessName"
          value={businessData.businessName || ""}
          onChange={(e) => updateField("businessName", e.target.value)}
          placeholder="Enter Pharmacy Name"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      {/* GST + Registration */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            GST Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="gstNumber"
            value={businessData.gstNumber || ""}
            onChange={(e) => updateField("gstNumber", e.target.value)}
            placeholder="22AAAAA0000A1Z5"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 uppercase"
          />
          <p className="mt-1 text-xs text-slate-500">Format: 22AAAAA0000A1Z5 (15 characters)</p>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            PAN Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="panNumber"
            value={businessData.panNumber || ""}
            onChange={(e) => updateField("panNumber", e.target.value)}
            placeholder="AAAAA1234X"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 uppercase"
          />
          <p className="mt-1 text-xs text-slate-500">Format: AAAAA1234X (10 characters)</p>
        </div>
      </div>

      {/* Drug License + Registration */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Drug License Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="drugLicenseNumber"
            value={businessData.drugLicenseNumber || ""}
            onChange={(e) => updateField("drugLicenseNumber", e.target.value)}
            placeholder="Enter Drug License Number"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Drug License Expiry <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="drugLicenseExpiryDate"
            value={businessData.drugLicenseExpiryDate?.split('T')[0] || ""}
            onChange={(e) => updateField("drugLicenseExpiryDate", e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />
        </div>
      </div>

      {/* Pharmacy Registration Number - FIXED field name */}
      <div>
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Pharmacy Registration Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="pharmacyRegistrationNumber"
          value={businessData.pharmacyRegistrationNumber || ""}
          onChange={(e) => updateField("pharmacyRegistrationNumber", e.target.value)}
          placeholder="Enter Registration Number"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>
    </div>
  );
}