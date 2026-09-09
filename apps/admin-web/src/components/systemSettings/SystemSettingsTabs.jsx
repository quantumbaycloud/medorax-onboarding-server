const SystemSettingsTabs = ({
  tabs,
  activeTab,
  onTabChange,
  branchCount,
}) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm mb-6">
      <div
        className="flex items-center overflow-x-auto px-4 gap-2"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-4 py-4 text-sm flex items-center gap-1.5 shrink-0 transition-colors ${
                isActive
                  ? "text-[#235eac] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#235eac]"
                  : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              {tab.icon === "domain" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M8 20V8h8v12" />
                  <path d="M6 8h12" />
                </svg>
              )}

              {tab.icon === "store" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 10h16" />
                  <path d="M5 10v10h14V10" />
                  <path d="M3 10l2-6h14l2 6" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              )}

              {tab.icon === "percent" && (
                <span className="text-[18px] font-bold">%</span>
              )}

              {tab.icon === "currency" && (
                <span className="text-[17px] font-semibold">¤</span>
              )}

              {tab.icon === "integration" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                  <path d="M4 7h4" />
                  <path d="M16 17h4" />
                  <path d="M7 4v4" />
                  <path d="M17 16v4" />
                </svg>
              )}

              <span>{tab.label}</span>

              {tab.id === "branches" && (
                <span className="ml-1 px-1.5 py-0.5 rounded bg-[#e5e8f4] text-[11px] font-bold text-slate-600">
                  {branchCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SystemSettingsTabs;