const AuditLogsStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-white">
      {/* Total Records */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Total Records Logged
        </span>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-slate-900">
            1,842,910
          </span>

          <span className="text-xs font-semibold text-[#006d40]">
            +1,420/hr
          </span>
        </div>
      </div>

      {/* Merkle */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Merkle Tree Root Hash
        </span>

        <span className="font-mono text-xs text-[#235eac] truncate bg-[#f1f3ff] px-1 py-0.5 rounded">
          0x8f2d9a6c4...b912a
        </span>
      </div>

      {/* Retention */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Retention Guarantee
        </span>

        <span className="text-sm font-semibold text-slate-900">
          7 Years (Strict HIPAA / ISO 27001)
        </span>
      </div>

      {/* Stream */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Active Stream Monitor
        </span>

        <div className="flex items-center gap-1 text-sm font-semibold text-[#006d40]">
          <span className="w-2 h-2 rounded-full bg-[#006d40] animate-pulse" />

          <span>0 dropped frames (Real-time)</span>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsStats;