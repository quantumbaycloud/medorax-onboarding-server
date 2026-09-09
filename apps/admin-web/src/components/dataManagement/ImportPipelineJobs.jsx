import React from "react";

const ImportPipelineJobs = ({
  jobs = {},
  onArtifactClick,
}) => {
  const rows = Array.isArray(jobs?.rows)
    ? jobs.rows
    : [];

  return (
    <div className="min-w-0 border-t border-slate-100">
      <div className="flex items-center justify-between gap-3 bg-slate-50 px-4 py-2.5">
        <span className="truncate text-xs font-bold text-slate-800">
          {jobs?.title || "Recent Ingestion Pipeline Jobs"}
        </span>

        <span className="shrink-0 text-[10px] font-semibold text-green-700">
          {jobs?.statusLabel || "Live Queue"}
        </span>
      </div>

      <div className="w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-0 table-fixed border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left text-[8px] font-bold uppercase tracking-wide text-slate-500">
              <th className="w-[15%] px-2 py-2">
                Job ID
              </th>

              <th className="w-[31%] px-2 py-2">
                Module & Volume
              </th>

              <th className="w-[23%] px-2 py-2">
                Status
              </th>

              <th className="w-[17%] px-2 py-2">
                Initiator
              </th>

              <th className="w-[14%] px-2 py-2">
                Artifacts
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((job) => (
              <tr
                key={job?.id}
                className="border-t border-slate-100 text-[9px] text-slate-700"
              >
                <td className="px-2 py-2 align-top font-mono font-bold text-blue-700">
                  {job?.prefix || "—"}
                </td>

                <td className="px-2 py-2 align-top">
                  <div className="truncate font-semibold">
                    {job?.module || "—"}
                  </div>

                  <div className="truncate text-[8px] text-slate-500">
                    {job?.volume || "—"}
                  </div>
                </td>

                <td className="px-2 py-2 align-top">
                  <span
                    className={`inline-block max-w-full truncate rounded px-1.5 py-0.5 text-[8px] font-semibold ${
                      job?.statusTone === "warning"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {job?.status || "—"}
                  </span>
                </td>

                <td className="px-2 py-2 align-top text-slate-500">
                  <span className="block truncate">
                    {job?.initiator || "—"}
                  </span>
                </td>

                <td className="px-2 py-2 align-top">
                  <button
                    type="button"
                    onClick={() =>
                      onArtifactClick?.(job)
                    }
                    className={`block max-w-full truncate text-[8px] font-semibold hover:underline ${
                      job?.artifactTone === "error"
                        ? "text-red-600"
                        : "text-blue-700"
                    }`}
                  >
                    {job?.artifact || "Open"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportPipelineJobs;