import React from "react";

const SnapshotArchives = ({
  archives = {},
  onDownload,
  onRestore,
  onViewAll,
}) => {
  const rows = Array.isArray(archives?.rows)
    ? archives.rows
    : [];

  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-2.5">
        <span className="truncate text-xs font-bold text-slate-800">
          {archives?.title || "Recent Snapshot Archives"}
        </span>

        <span className="shrink-0 text-[10px] text-slate-500">
          {archives?.showingText || ""}
        </span>
      </div>

      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-0 table-fixed border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left text-[9px] font-bold uppercase tracking-wide text-slate-500">
              <th className="w-[27%] px-3 py-2">
                Timestamp
              </th>

              <th className="w-[22%] px-2 py-2">
                Type
              </th>

              <th className="w-[15%] px-2 py-2">
                Status
              </th>

              <th className="w-[18%] px-2 py-2">
                Integrity Hash
              </th>

              <th className="w-[18%] px-2 py-2 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row?.id}
                className="border-t border-slate-100 text-[10px] text-slate-700"
              >
                <td className="px-3 py-2">
                  <div className="truncate font-semibold">
                    {row?.timestamp || "—"}
                  </div>

                  <div className="text-[9px] text-slate-500">
                    {row?.size || "—"}
                  </div>
                </td>

                <td className="px-2 py-2">
                  <div className="truncate font-semibold">
                    {row?.manual ? "◆ " : "↻ "}
                    {row?.type || "—"}
                  </div>
                </td>

                <td className="px-2 py-2">
                  <span className="inline-flex max-w-full truncate rounded bg-green-100 px-1.5 py-0.5 text-[9px] font-semibold text-green-700">
                    {row?.status || "—"}
                  </span>
                </td>

                <td className="px-2 py-2">
                  <span className="block truncate font-mono text-[9px] text-slate-500">
                    {row?.hash || "—"}
                  </span>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onDownload?.(row)}
                      className="text-[9px] font-semibold text-blue-700 hover:underline"
                    >
                      ↓ Download
                    </button>

                    <span className="text-slate-300">
                      |
                    </span>

                    <button
                      type="button"
                      onClick={() => onRestore?.(row)}
                      className="text-[9px] font-semibold text-red-600 hover:underline"
                    >
                      Restore
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex min-w-0 items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-3 py-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 text-green-600">
            ☁
          </span>

          <span className="truncate text-[10px] text-slate-600">
            {archives?.footer?.text || ""}
          </span>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="shrink-0 text-[10px] font-semibold text-blue-700 hover:underline"
        >
          {archives?.footer?.action || "View All Snapshots"}
        </button>
      </div>
    </div>
  );
};

export default SnapshotArchives;