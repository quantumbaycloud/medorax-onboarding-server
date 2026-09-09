const IntegrationDefaults = ({ settings, onChange }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="pb-4 mb-6 border-b border-slate-100">
        <h2 className="text-xl font-semibold text-slate-900">
          Integration Defaults
        </h2>

        <p className="text-[13px] text-slate-500 mt-1">
          Configure default enterprise integrations and synchronization
          behaviour.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {settings.integrations.map((integration) => (
          <div
            key={integration.id}
            onClick={() =>
              onChange(integration.id, !integration.enabled)
            }
            className={`group cursor-pointer rounded-xl border p-5 transition-all duration-200 ${
              integration.enabled
                ? "border-[#235eac]/30 bg-[#f5f8ff]"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Integration information */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      integration.enabled
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                    }`}
                  />

                  <p className="text-sm font-semibold text-slate-900">
                    {integration.name}
                  </p>
                </div>

                <p className="text-xs text-slate-500 mt-2 leading-5">
                  {integration.description}
                </p>
              </div>

              {/* ON / OFF button */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange(
                    integration.id,
                    !integration.enabled
                  );
                }}
                aria-pressed={integration.enabled}
                className={`shrink-0 min-w-[68px] px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-200 ${
                  integration.enabled
                    ? "bg-[#235eac] text-white border-[#235eac] shadow-sm"
                    : "bg-white text-slate-500 border-slate-300 hover:border-slate-400"
                }`}
              >
                {integration.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* Bottom status */}
            <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Integration status
              </span>

              <span
                className={`text-[11px] font-medium ${
                  integration.enabled
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
              >
                {integration.enabled
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationDefaults;