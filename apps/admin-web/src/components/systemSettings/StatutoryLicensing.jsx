const StatutoryLicensing = ({
  licensing,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#235eac]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Statutory & Pharmaceutical Licensing
            </h2>

            <p className="text-[13px] text-slate-500">
              Mandatory drug distribution licenses and fiscal verification IDs.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-xs text-[#006d40] font-semibold bg-[#9cf6bc]/60 px-2 py-1 rounded">
          <span>✓</span>
          {licensing.complianceStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* GST */}
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-sm text-slate-900 font-medium flex items-center justify-between">
            <span>GSTIN / National Tax ID</span>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0f7345] bg-[#9cf6bc] px-1.5 py-0.5 rounded">
              ✓ {licensing.gstStatus}
            </span>
          </label>

          <div className="relative flex items-center">
            <input
              type="text"
              value={licensing.gstin}
              onChange={(e) =>
                onChange("gstin", e.target.value)
              }
              className="w-full px-4 py-2 pr-28 font-mono tracking-wider bg-white text-slate-900 text-sm rounded-lg shadow-sm focus:outline-none"
            />

            <button
              type="button"
              className="absolute right-2 px-2 py-1 bg-[#eaedfa] hover:bg-[#e5e8f4] rounded text-xs text-[#235eac] font-semibold"
            >
              Verify Portal
            </button>
          </div>
        </div>

        {/* Drug License 20B */}
        <LicenseField
          license={licensing.drugLicense20B}
          onChange={(value) =>
            onChange("drugLicense20B", {
              ...licensing.drugLicense20B,
              value,
            })
          }
        />

        {/* Drug License 21B */}
        <LicenseField
          license={licensing.drugLicense21B}
          onChange={(value) =>
            onChange("drugLicense21B", {
              ...licensing.drugLicense21B,
              value,
            })
          }
        />

        {/* Jurisdiction */}
        <div className="sm:col-span-2 flex flex-col gap-1">
          <label className="text-sm text-slate-900 font-medium">
            Primary Regulatory Authority Jurisdiction
          </label>

          <select
            value={licensing.selectedJurisdiction}
            onChange={(e) =>
              onChange(
                "selectedJurisdiction",
                e.target.value
              )
            }
            className="w-full px-4 py-2 bg-white text-slate-900 text-sm rounded-lg shadow-sm focus:outline-none cursor-pointer"
          >
            {licensing.jurisdictions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const LicenseField = ({
  license,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-900 font-medium">
        {license.label}
      </label>

      <div className="flex items-center gap-1">
        <input
          type="text"
          value={license.value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full px-4 py-2 font-mono bg-white text-slate-900 text-sm rounded-lg shadow-sm focus:outline-none"
        />

        <button
          type="button"
          title="View Document"
          className="w-9 h-9 rounded-lg bg-[#eaedfa] flex items-center justify-center text-[#235eac] shrink-0 hover:bg-[#e5e8f4]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="16" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StatutoryLicensing;