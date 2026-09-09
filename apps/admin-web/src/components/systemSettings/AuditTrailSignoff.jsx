const AuditTrailSignoff = ({ audit }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#235eac]">
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
            <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Audit Trail & Sign-off
          </h3>

          <p className="text-xs text-slate-500">
            Last saved by {audit.savedBy} ({audit.savedByRole})
          </p>
        </div>
      </div>

      <p className="text-[13px] text-slate-500 mb-4 leading-relaxed">
        Statutory modifications require multi-factor administrative credential sign-off upon execution. All changes are logged directly to the immutable audit database.
      </p>

      <div className="flex items-center justify-between text-slate-500 text-xs pt-2">
        <span>
          Timestamp: {audit.timestamp}
        </span>

        <span className="font-mono text-[#235eac] font-bold">
          {audit.revision}
        </span>
      </div>
    </div>
  );
};

export default AuditTrailSignoff;