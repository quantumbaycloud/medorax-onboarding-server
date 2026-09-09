import React from "react";

const DataManagementHeader = ({
  data = {},
  onAuditTrail,
  onManualBackup,
  isBackingUp = false,
}) => {
  const page = data?.page || {};
  const actions = data?.headerActions || {};

  const breadcrumb = Array.isArray(page?.breadcrumb)
    ? page.breadcrumb
    : [];

  return (
    <header className="flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-1 text-xs text-slate-500">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              {index > 0 && (
                <span className="text-slate-400">›</span>
              )}

              <span
                className={
                  index === breadcrumb.length - 1
                    ? "font-semibold text-blue-700"
                    : ""
                }
              >
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {page?.title || "Data Management"}
        </h1>

        <p className="mt-1 max-w-3xl text-sm text-slate-500">
          {page?.description || ""}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onAuditTrail}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <span className="text-blue-700">↺</span>
          {actions?.auditTrail?.label || "Audit Trail"}
        </button>

        <button
          type="button"
          disabled={isBackingUp}
          onClick={onManualBackup}
          className="inline-flex items-center gap-1.5 rounded-md bg-[#235EAC] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:hover:bg-[#1D4F91] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>☁</span>

          {isBackingUp
            ? "Backup In Progress..."
            : actions?.manualBackup?.label ||
              "Trigger Manual Backup"}
        </button>
      </div>
    </header>
  );
};

export default DataManagementHeader;