import { useEffect, useState } from "react";

const CompanyProfile = ({ company, onChange }) => {
  const [logoPreview, setLogoPreview] = useState(company?.logoUrl || "");

  useEffect(() => {
    setLogoPreview(company?.logoUrl || "");
  }, [company?.logoUrl]);

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
    ];

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a PNG, JPG, JPEG, or SVG image.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      alert("Logo size must be under 2MB.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setLogoPreview(previewUrl);

    onChange("logoName", file.name);
    onChange("logoFile", file);
    onChange("logoUrl", previewUrl);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#235eac]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Organization Branding & Legal Identity
            </h2>

            <p className="text-[13px] text-slate-500">
              Master legal entity attributes displayed on tax invoices and drug
              manifests.
            </p>
          </div>
        </div>

        <span className="text-xs px-2 py-1 rounded bg-[#eaedfa] text-slate-600 uppercase tracking-wider">
          Entity Master
        </span>
      </div>

      {/* Logo + Company Inputs */}
      <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
        {/* Logo */}
        <div className="w-full md:w-56 shrink-0 flex flex-col gap-1">
          <label className="text-sm text-slate-900 font-medium">
            Official Company Logo
          </label>

          <div className="relative flex flex-col items-center justify-center p-4 rounded-lg bg-[#f1f3ff]/70 text-center">
            {/* Logo Preview */}
            <div className="w-20 h-20 rounded-lg bg-white p-2 shadow-sm flex items-center justify-center mb-1 overflow-hidden">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="w-full h-full object-contain rounded"
                />
              ) : (
                <div className="w-full h-full rounded bg-[#235eac] flex flex-col items-center justify-center text-white">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="5"
                      y="3"
                      width="14"
                      height="18"
                      rx="2"
                    />
                    <path d="M9 7h6" />
                    <path d="M12 10v6" />
                    <path d="M9 13h6" />
                  </svg>

                  <span className="text-[9px] uppercase tracking-widest font-bold mt-0.5">
                    MEDORAX
                  </span>
                </div>
              )}
            </div>

            {/* File Name */}
            <p className="text-xs font-semibold text-[#235eac] truncate max-w-full">
              {company?.logoName || "No logo selected"}
            </p>

            {/* Description */}
            <p className="text-[11px] text-slate-500">
              {company?.logoDescription || "PNG, JPG or SVG under 2MB"}
            </p>

            {/* Hidden File Input */}
            <input
              id="company-logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              className="hidden"
              onChange={handleLogoChange}
            />

            {/* Upload Button */}
            <label
              htmlFor="company-logo-upload"
              className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-[#235eac] text-xs font-medium shadow-sm border border-slate-200 cursor-pointer hover:bg-[#f1f3ff] transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 16V4" />
                <path d="m7 9 5-5 5 5" />
                <path d="M5 20h14" />
              </svg>

              Change Logo
            </label>
          </div>
        </div>

        {/* Company Inputs */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Field
            label="Company Legal Name"
            value={company?.legalName || ""}
            onChange={(value) => onChange("legalName", value)}
            full
          />

          <Field
            label="Operating Trade Name"
            value={company?.tradeName || ""}
            onChange={(value) => onChange("tradeName", value)}
            full
          />

          <Field
            label="Corporate Identification (CIN)"
            value={company?.cin || ""}
            onChange={(value) => onChange("cin", value)}
            mono
          />

          <Field
            label="Date of Incorporation"
            type="date"
            value={company?.incorporationDate || ""}
            onChange={(value) => onChange("incorporationDate", value)}
          />
        </div>
      </div>

      {/* Other Company Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Head Office Registered Address"
          value={company?.registeredAddress || ""}
          onChange={(value) => onChange("registeredAddress", value)}
          textarea
          full
        />

        <Field
          label="Primary Enterprise Email"
          value={company?.enterpriseEmail || ""}
          onChange={(value) => onChange("enterpriseEmail", value)}
          type="email"
        />

        <Field
          label="Primary Contact Desk Phone"
          value={company?.contactPhone || ""}
          onChange={(value) => onChange("contactPhone", value)}
        />
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  full = false,
  mono = false,
}) => {
  const className = `
    w-full
    px-4
    py-2
    bg-white
    text-slate-900
    text-sm
    rounded-lg
    shadow-sm
    focus:outline-none
    focus:bg-[#f1f3ff]/50
    ${mono ? "font-mono" : ""}
  `;

  return (
    <div
      className={`${
        full ? "sm:col-span-2" : ""
      } flex flex-col gap-1`}
    >
      <label className="text-sm text-slate-900 font-medium">
        {label}
      </label>

      {textarea ? (
        <textarea
          rows="2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
    </div>
  );
};

export default CompanyProfile;