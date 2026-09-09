const NotificationsBottomBar = ({
  config,
  onTest,
  onSave,
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <span className="w-5 h-5 text-[#006d40]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>

        <span>
          {config.syncStatus} with{" "}
          <strong className="text-slate-900">
            {config.node}
          </strong>
          . Last revised {config.lastRevised}.
        </span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={onTest}
          className="px-4 py-2 rounded-xl text-sm font-medium text-[#235eac] hover:bg-[#f1f3ff] active:bg-[#e5e8f4] transition-colors"
        >
          {config.testLabel}
        </button>

        <button
          type="button"
          onClick={onSave}
          className="px-5 py-2 rounded-xl bg-[#235eac] text-white text-sm font-semibold shadow-sm hover:bg-[#1d4f91] active:scale-95 transition-all"
        >
          {config.saveLabel}
        </button>
      </div>
    </div>
  );
};

export default NotificationsBottomBar;