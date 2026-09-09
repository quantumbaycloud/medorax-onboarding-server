import { useState } from "react";

const AuditLogsHeader = ({
  title = "Audit Logs",
  breadcrumb = "Audit Logs",
  integrityText = "Audit Integrity: Verified (SHA-256)",
  description = "Immutable, tamper-evident telemetry logs across all enterprise scopes and user operations. Cryptographically anchored to Node: Production EU-1.",
  exportLabel = "Export Audit Trail (CSV)",
  anchorLabel = "Anchor State Proof",
}) => {
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleExport = () => {
    showToast(
      "Audit trail export request submitted successfully."
    );
  };

  const handleAnchor = () => {
    showToast(
      "Audit state proof anchored successfully."
    );
  };

  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">

      {/* =========================
          Left Content
      ========================= */}
      <div className="flex flex-col gap-1">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-sm text-slate-500">
          <span>Admin Console</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 18 6-6-6-6"
            />
          </svg>

          <span className="font-semibold text-[#235eac]">
            {breadcrumb}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 flex-wrap">

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>

          {/* Integrity Badge */}
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-[#9cf6bc] text-[#00522f] text-xs font-semibold">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 12 2 2 4-4"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l2.09 1.26 2.42-.07.93 2.24 2.09 1.25-.68 2.33.68 2.33-2.09 1.25-.93 2.24-2.42-.07L12 21l-2.09-1.26-2.42.07-.93-2.24-2.09-1.25.68-2.33-.68-2.33 2.09-1.25.93-2.24 2.42.07L12 3Z"
              />
            </svg>

            <span className="uppercase tracking-wide">
              {integrityText}
            </span>

          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 max-w-3xl">
          {description}
        </p>
      </div>

      {/* =========================
          Actions
      ========================= */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Export */}
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#f1f3ff] text-[#235eac] text-sm font-medium hover:bg-[#e5e8f4] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-[18px] h-[18px]"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v12"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m7 10 5 5 5-5"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 21h14"
            />
          </svg>

          {exportLabel}
        </button>

        {/* Anchor State Proof */}
        <button
          type="button"
          onClick={handleAnchor}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#235eac] text-white text-sm font-medium hover:bg-[#004287] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-[18px] h-[18px]"
            aria-hidden="true"
          >
            <rect
              x="5"
              y="10"
              width="14"
              height="10"
              rx="2"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10V7a4 4 0 0 1 8 0v3"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 13v2"
            />
          </svg>

          {anchorLabel}
        </button>

      </div>

      {/* =========================
          Toast
      ========================= */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999]">
          <div className="flex items-center gap-3 min-w-[320px] max-w-md rounded-lg border border-green-200 bg-white px-4 py-3 shadow-xl">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
              ✓
            </div>

            <p className="flex-1 text-sm font-medium text-slate-700">
              {toast}
            </p>

            <button
              type="button"
              onClick={() => setToast("")}
              className="text-lg text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close notification"
            >
              ×
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default AuditLogsHeader;