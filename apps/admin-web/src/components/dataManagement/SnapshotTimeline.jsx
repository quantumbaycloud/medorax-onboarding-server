import React from "react";

const SnapshotTimeline = ({ timeline = {} }) => {
  const items = Array.isArray(timeline?.items)
    ? timeline.items
    : [];

  return (
    <div className="min-w-0 px-4 py-3">
      <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
        <span className="truncate text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {timeline?.title || "Snapshot Frequency Timeline"}
        </span>

        <span className="shrink-0 text-[10px] font-semibold text-blue-700">
          {timeline?.nextScheduled || ""}
        </span>
      </div>

      <div className="flex min-w-0 overflow-hidden rounded bg-blue-50">
        {items.map((item) => {
          const active = item?.type === "active";

          return (
            <div
              key={item?.id}
              className={`min-w-0 flex-1 px-1.5 py-1.5 text-center ${
                active
                  ? "bg-green-100 text-green-800"
                  : item?.type === "pending" ||
                      item?.type === "scheduled"
                    ? "text-slate-400"
                    : "text-blue-700"
              }`}
            >
              <div className="truncate text-[9px] font-bold">
                {item?.time || "—"}
              </div>

              <div className="truncate text-[8px]">
                {item?.status || "—"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SnapshotTimeline;