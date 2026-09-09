const getAvatarClass = (type) => {
  const classes = {
    primary: "bg-[#235eac] text-white",
    tertiary: "bg-[#242e3c] text-white",
    system: "bg-[#3a4453] text-white",
  };

  return classes[type] || classes.primary;
};

const getActionClass = (type) => {
  const classes = {
    primary: "bg-[#d6e3ff] text-[#001b3e]",
    "danger-light": "bg-[#ffdad6] text-[#93000a]",
    "success-light": "bg-[#9cf6bc] text-[#00522f]",
    danger: "bg-[#ba1a1a] text-white",
    neutral: "bg-[#dfe2ef] text-slate-600",
  };

  return classes[type] || classes.neutral;
};

const getDiffClass = (type) => {
  const classes = {
    success: "text-[#006d40]",
    danger: "text-[#ba1a1a]",
    normal: "text-slate-500",
  };

  return classes[type] || classes.normal;
};

const AuditLogRow = ({ log, index }) => {
  return (
    <tr className="hover:bg-[#f1f3ff]/70 transition-colors">
      {/* Timestamp */}
      <td className="py-2 px-4 align-top">
        <div className="font-mono text-xs text-slate-900 font-medium leading-tight">
          {log.timestamp}
        </div>

        <div className="text-[11px] text-slate-500 leading-tight">
          {log.relativeTime}
        </div>
      </td>

      {/* User */}
      <td className="py-2 px-4 align-top">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${getAvatarClass(
              log.avatarType
            )}`}
          >
            {log.initials}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 truncate leading-tight">
              {log.user}
            </span>

            <span className="text-[11px] text-slate-500 truncate leading-tight">
              {log.email}
            </span>
          </div>
        </div>

        <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-[#eaedfa] text-slate-600 uppercase font-bold">
          {log.role}
        </span>
      </td>

      {/* Module */}
      <td className="py-2 px-4 align-top">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-[#eaedfa] text-slate-700 font-medium whitespace-nowrap">
          <span className="material-symbols-outlined text-[14px] text-slate-400">
            {log.moduleIcon}
          </span>

          {log.module}
        </span>
      </td>

      {/* Action */}
      <td className="py-2 px-4 align-top">
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs font-semibold tracking-wide whitespace-nowrap ${getActionClass(
            log.actionType
          )}`}
        >
          {log.action}
        </span>
      </td>

      {/* IP */}
      <td className="py-2 px-4 align-top">
        <div className="font-mono text-xs text-slate-900">
          {log.ip}
        </div>

        <div
          className={`text-[11px] truncate ${
            log.originDanger
              ? "text-[#ba1a1a] font-medium"
              : "text-slate-500"
          }`}
        >
          {log.origin}
        </div>
      </td>

      {/* Payload */}
      <td className="py-2 px-4 align-top">
        <div className="text-sm text-slate-900">
          {log.payload}
        </div>

        <div
          className={`font-mono text-xs mt-1 ${getDiffClass(
            log.diffType
          )}`}
        >
          {log.diff}
        </div>
      </td>

      {/* Receipt */}
      <td className="py-2 px-2 align-top text-center">
        <button
          type="button"
          title="Inspect JSON payload"
          className="w-6 h-6 flex items-center justify-center rounded text-slate-500 hover:bg-[#eaedfa] hover:text-[#235eac]"
        >
          <span className="material-symbols-outlined text-[16px]">
            code
          </span>
        </button>
      </td>
    </tr>
  );
};

export default AuditLogRow;