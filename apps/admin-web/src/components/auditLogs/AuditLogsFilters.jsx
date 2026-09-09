import {
  AUDIT_MODULES,
  AUDIT_ACTIONS,
} from "../../constants/auditLogs";

const AuditLogsFilters = ({
  search,
  setSearch,
  date,
  setDate,
  module,
  setModule,
  action,
  setAction,
  actor,
  setActor,
  onReset,
  actors,
  dates,
  totalRecords,
}) => {
  const hasSearchFilter = search.trim() !== "";
  const hasDateFilter = date !== "All Dates";
  const hasModuleFilter = module !== "All Modules";
  const hasActionFilter = action !== "All Actions";
  const hasActorFilter = actor !== "All Actors";

  const hasAnyFilter =
    hasSearchFilter ||
    hasDateFilter ||
    hasModuleFilter ||
    hasActionFilter ||
    hasActorFilter;

  return (
    <div className="bg-white rounded-xl p-4 flex flex-col gap-2">

      {/* Main Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 items-center">

        {/* Search */}
        <div className="lg:col-span-2 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by keyword, Actor ID, or IP..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#f1f3ff] text-slate-900 text-sm rounded outline-none focus:bg-white transition-colors"
          />
        </div>

        {/* Date */}
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-1.5 bg-[#f1f3ff] rounded text-sm text-slate-900 outline-none"
        >
          <option value="All Dates">All Dates</option>

          {dates.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Module */}
        <select
          value={module}
          onChange={(e) => setModule(e.target.value)}
          className="w-full px-3 py-1.5 bg-[#f1f3ff] rounded text-sm text-slate-900 outline-none"
        >
          {AUDIT_MODULES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Action */}
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="w-full px-3 py-1.5 bg-[#f1f3ff] rounded text-sm text-slate-900 outline-none"
        >
          {AUDIT_ACTIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Actor + Reset */}
        <div className="flex items-center gap-2">
          <select
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            className="flex-1 min-w-0 px-3 py-1.5 bg-[#f1f3ff] rounded text-sm text-slate-900 outline-none"
          >
            <option value="All Actors">All Actors</option>

            {actors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onReset}
            className="text-[#235eac] hover:text-[#004287] text-xs font-semibold"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Active Scopes */}
      <div className="flex items-center gap-1 flex-wrap text-xs text-slate-500 pt-1">

        <span className="text-slate-400 uppercase font-semibold text-[11px]">
          Active Scopes:
        </span>

        {/* Search */}
        {hasSearchFilter && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#eaedfa] text-slate-700">
            Search: {search}

            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-slate-500 hover:text-slate-800"
            >
              ×
            </button>
          </span>
        )}

        {/* Date */}
        {hasDateFilter && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#eaedfa] text-slate-700">
            Date: {date}

            <button
              type="button"
              onClick={() => setDate("All Dates")}
              className="text-slate-500 hover:text-slate-800"
            >
              ×
            </button>
          </span>
        )}

        {/* Module */}
        {hasModuleFilter && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#eaedfa] text-slate-700">
            Module: {module}

            <button
              type="button"
              onClick={() => setModule("All Modules")}
              className="text-slate-500 hover:text-slate-800"
            >
              ×
            </button>
          </span>
        )}

        {/* Action */}
        {hasActionFilter && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#eaedfa] text-slate-700">
            Action: {action}

            <button
              type="button"
              onClick={() => setAction("All Actions")}
              className="text-slate-500 hover:text-slate-800"
            >
              ×
            </button>
          </span>
        )}

        {/* Actor */}
        {hasActorFilter && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#eaedfa] text-slate-700">
            Actor: {actor}

            <button
              type="button"
              onClick={() => setActor("All Actors")}
              className="text-slate-500 hover:text-slate-800"
            >
              ×
            </button>
          </span>
        )}

        {/* When nothing selected */}
        {!hasAnyFilter && (
          <span className="text-slate-400">
            No filters applied
          </span>
        )}

        {/* Count */}
        <span className="text-slate-400 text-xs ml-auto">
          Displaying {totalRecords} records / refresh rate: 5s
        </span>
      </div>
    </div>
  );
};

export default AuditLogsFilters;