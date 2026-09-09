const NotificationsHeader = ({
  header,
  onSave,
}) => {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {header.breadcrumb.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-2"
            >
              {index > 0 && (
                <span className="text-slate-400">›</span>
              )}

              <span
                className={
                  index === header.breadcrumb.length - 1
                    ? "font-semibold text-[#235eac]"
                    : "hover:text-[#235eac]"
                }
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {header.title}
        </h1>

        <p className="text-sm text-slate-500 max-w-2xl">
          {header.description}
        </p>
      </div>

      <div className="flex items-center gap-2 self-start md:self-auto">
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#eaedfa] text-slate-600 text-xs font-semibold">
          <span
            className={`w-2 h-2 rounded-full ${
              header.telemetry.active
                ? "bg-[#006d40] animate-pulse"
                : "bg-slate-400"
            }`}
          />

          <span>
            {header.telemetry.label}:{" "}
            {header.telemetry.status}
          </span>
        </div>

        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#235eac] text-white text-sm font-semibold shadow-sm hover:bg-[#1d4f91] active:scale-95 transition-all"
        >
          <svg
            className="w-[18px] h-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 4h11l3 3v13H5z" />
            <path d="M8 4v6h8V4" />
            <path d="M8 20v-6h8v6" />
          </svg>

          {header.saveLabel}
        </button>
      </div>
    </section>
  );
};

export default NotificationsHeader;