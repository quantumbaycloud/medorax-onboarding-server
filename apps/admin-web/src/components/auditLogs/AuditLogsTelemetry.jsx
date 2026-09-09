const AuditLogsTelemetry = () => {
  return (
    <div className="p-4 rounded-xl bg-[#f1f3ff] flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left Section */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Terminal Icon */}
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#235eac] shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-slate-900">
            Immutable Real-Time Telemetry Socket
          </span>

          <span className="text-sm text-slate-500 break-words">
            WebSocket channel wss://telemetry.eu1.medorax.internal:8443 stream
            is healthy. Zero frame drift.
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
        {/* Open Live CLI Stream */}
        <button
          type="button"
          className="px-4 py-1.5 rounded bg-white hover:bg-[#e5e8f4] text-slate-900 text-sm transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>

          <span>Open Live CLI Stream</span>
        </button>

        {/* Download Cryptographic Manifest */}
        <button
          type="button"
          className="px-4 py-1.5 rounded bg-white hover:bg-[#e5e8f4] text-slate-900 text-sm transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>

          <span>Download Cryptographic Manifest</span>
        </button>
      </div>
    </div>
  );
};

export default AuditLogsTelemetry;
