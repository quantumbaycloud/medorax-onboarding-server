import React from "react";

import BackupMetrics from "./BackupMetrics";
import SnapshotTimeline from "./SnapshotTimeline";
import SnapshotArchives from "./SnapshotArchives";

const BackupRecovery = ({
  data = {},
  onBackupNow,
  onDownload,
  onRestore,
  onViewAll,
}) => {
  const backup = data?.backup || {};

  return (
    <section className="flex min-w-0 w-full flex-col overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
      <div className="flex min-w-0 flex-col gap-3 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#235EAC] text-sm text-white">
            ☁
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-slate-800">
              {backup?.title ||
                "Automated Backup & Disaster Recovery"}
            </h2>

            <div className="mt-0.5 flex min-w-0 items-center gap-1">
              <span className="shrink-0 text-green-600">
                ✓
              </span>

              <span className="truncate text-[9px] font-semibold text-green-700">
                {backup?.health?.text || ""}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackupNow}
          className="shrink-0 self-start rounded bg-[#235EAC] px-3 py-1.5 text-[10px] font-bold text-white transition hover:bg-[#1D4F91] sm:self-auto"
        >
          ▶{" "}
          {backup?.backupButton?.label || "Backup Now"}
        </button>
      </div>

      <BackupMetrics metrics={backup?.metrics} />

      <SnapshotTimeline timeline={backup?.timeline} />

      <SnapshotArchives
        archives={backup?.archives}
        onDownload={onDownload}
        onRestore={onRestore}
        onViewAll={onViewAll}
      />
    </section>
  );
};

export default BackupRecovery;