import React from "react";

const ICONS = {
  verified: "✓",
  database: "▣",
  security: "⬡",
  cloud_sync: "☁",
};

const DataManagementStats = ({ stats = [] }) => {
  const safeStats = Array.isArray(stats) ? stats : [];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {safeStats.map((stat) => (
        <div
          key={stat?.id}
          className="flex min-w-0 items-center gap-3 rounded-lg border border-slate-100 bg-white p-3 shadow-sm"
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              stat?.tone === "success"
                ? "bg-green-100 text-green-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {ICONS[stat?.icon] || "•"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {stat?.label || "—"}
            </p>

            <p className="truncate text-sm font-bold text-slate-800">
              {stat?.value || "—"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataManagementStats;