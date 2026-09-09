import React from "react";

const AdvancedDiagnostics = ({
  data = {},
  onInspect,
  onFailover,
}) => {
  const diagnostics = data?.diagnostics || {};

  return (
    <section className="flex min-w-0 flex-col gap-3 rounded-lg border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-slate-100 font-mono text-sm text-slate-700">
          &gt;_
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-slate-800">
            {diagnostics?.title || ""}
          </h3>

          <p className="truncate text-[10px] text-slate-500">
            {diagnostics?.descriptionPrefix || ""}{" "}
            <span className="font-mono font-semibold text-blue-700">
              {diagnostics?.cluster || "—"}
            </span>{" "}
            {diagnostics?.descriptionSuffix || ""}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onInspect}
          className="rounded bg-blue-50 px-3 py-2 text-[10px] font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          {diagnostics?.actions?.inspect?.label ||
            "Inspect Replication Lag"}
        </button>

        <button
          type="button"
          onClick={onFailover}
          className="inline-flex items-center gap-1 rounded bg-red-50 px-3 py-2 text-[10px] font-semibold text-red-600 transition hover:bg-red-100"
        >
          ⚠{" "}
          {diagnostics?.actions?.failover?.label ||
            "Emergency Failover"}
        </button>
      </div>
    </section>
  );
};

export default AdvancedDiagnostics;