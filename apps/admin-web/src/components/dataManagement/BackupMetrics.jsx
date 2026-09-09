import React from "react";

const ICONS = {
  schedule: "◷",
  hard_drive: "▣",
  event_repeat: "↻",
};

const BackupMetrics = ({ metrics = [] }) => {
  const safeMetrics = Array.isArray(metrics) ? metrics : [];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-px border-y border-slate-100 bg-slate-100 sm:grid-cols-3">
      {safeMetrics.map((metric) => (
        <div
          key={metric?.id}
          className="min-w-0 bg-white p-3"
        >
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
            <span>{ICONS[metric?.icon] || "•"}</span>
            <span className="truncate">
              {metric?.label || "—"}
            </span>
          </div>

          <div className="truncate text-sm font-bold text-slate-800">
            {metric?.value || "—"}
          </div>

          <div className="mt-0.5 truncate text-[10px] text-slate-500">
            {metric?.secondary || "—"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BackupMetrics;