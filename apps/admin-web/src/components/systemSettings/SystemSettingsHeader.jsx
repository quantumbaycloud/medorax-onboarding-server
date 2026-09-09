const SystemSettingsHeader = ({
  environment,
  onSave,
  onVersionHistory,
}) => {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-6">
      <div className="flex flex-col gap-1">
        <nav className="flex items-center gap-1 text-sm text-slate-500">
          <span>Admin Console</span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>

          <span className="font-semibold text-[#235eac]">
            System Settings
          </span>
        </nav>

        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-[24px] leading-8 text-[#002c5e] tracking-tight font-bold">
            System Settings
          </h1>

          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#9cf6bc] text-[#00522f] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]" />

            <span>
              {environment.status} ({environment.version})
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start md:self-auto">
        <button
          type="button"
          onClick={onVersionHistory}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#235eac] text-sm hover:bg-[#f1f3ff] transition-colors shadow-sm"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <polyline points="3 4 3 10 9 10" />
            <path d="M12 7v5l3 2" />
          </svg>

          <span>Version History</span>
        </button>

        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#235eac] text-white text-sm hover:bg-[#004287] transition-all shadow-md active:scale-95"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>

          <span>Save Configuration</span>
        </button>
      </div>
    </section>
  );
};

export default SystemSettingsHeader;