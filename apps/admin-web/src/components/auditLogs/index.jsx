import { useMemo, useState } from "react";

import AuditLogsHeader from "../../components/auditLogs/AuditLogsHeader";
import AuditLogsStats from "../../components/auditLogs/AuditLogsStats";
import AuditLogsFilters from "../../components/auditLogs/AuditLogsFilters";
import AuditLogsTable from "../../components/auditLogs/AuditLogsTable";
import AuditLogsPagination from "../../components/auditLogs/AuditLogsPagination";
import AuditLogsTelemetry from "../../components/auditLogs/AuditLogsTelemetry";

import { AUDIT_LOGS } from "../../constants/auditLogs";

const AuditLogs = () => {
  const rowsPerPage = 12;

  // =========================
  // Filter States
  // =========================
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("All Dates");
  const [module, setModule] = useState("All Modules");
  const [action, setAction] = useState("All Actions");
  const [actor, setActor] = useState("All Actors");

  // =========================
  // Pagination State
  // =========================
  const [page, setPage] = useState(1);

  // =========================
  // Helper: Get Date
  // =========================
  const getLogDate = (timestamp) => {
    if (!timestamp) return "";

    const value = String(timestamp);

    return value.length >= 10
      ? value.substring(0, 10)
      : value;
  };

  // =========================
  // Available Actors
  // =========================
  const actors = useMemo(() => {
    return [
      ...new Set(
        AUDIT_LOGS
          .map(
            (log) =>
              log.user ||
              log.actor ||
              log.userName ||
              ""
          )
          .filter(Boolean)
      ),
    ];
  }, []);

  // =========================
  // Available Dates
  // =========================
  const dates = useMemo(() => {
    return [
      ...new Set(
        AUDIT_LOGS
          .map((log) => getLogDate(log.timestamp))
          .filter(Boolean)
      ),
    ].sort((a, b) => b.localeCompare(a));
  }, []);

  // =========================
  // Filter Logs
  // =========================
  const filteredLogs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return AUDIT_LOGS.filter((log) => {
      // Search
      const matchesSearch =
        !searchValue ||
        Object.values(log).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(searchValue)
        );

      // Date
      const logDate = getLogDate(log.timestamp);

      const matchesDate =
        date === "All Dates" ||
        logDate === date;

      // Module
      const logModule = String(log.module || "");

      const matchesModule =
        module === "All Modules" ||
        logModule.toLowerCase() === module.toLowerCase();

      // Action
      const logAction = String(log.action || "");

      const matchesAction =
        action === "All Actions" ||
        logAction.toLowerCase() === action.toLowerCase();

      // Actor
      const logActor = String(
        log.user ||
        log.actor ||
        log.userName ||
        ""
      );

      const matchesActor =
        actor === "All Actors" ||
        logActor.toLowerCase() === actor.toLowerCase();

      return (
        matchesSearch &&
        matchesDate &&
        matchesModule &&
        matchesAction &&
        matchesActor
      );
    });
  }, [
    search,
    date,
    module,
    action,
    actor,
  ]);

  // =========================
  // Total Pages
  // =========================
  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / rowsPerPage)
  );

  // =========================
  // Safe Current Page
  // =========================
  const currentPage = Math.min(
    Math.max(Number(page) || 1, 1),
    totalPages
  );

  // =========================
  // Current Page Logs
  // =========================
  const paginatedLogs = useMemo(() => {
    const start =
      (currentPage - 1) * rowsPerPage;

    return filteredLogs.slice(
      start,
      start + rowsPerPage
    );
  }, [
    filteredLogs,
    currentPage,
  ]);

  // =========================
  // Filter Handlers
  // =========================
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleDateChange = (value) => {
    setDate(value);
    setPage(1);
  };

  const handleModuleChange = (value) => {
    setModule(value);
    setPage(1);
  };

  const handleActionChange = (value) => {
    setAction(value);
    setPage(1);
  };

  const handleActorChange = (value) => {
    setActor(value);
    setPage(1);
  };

  // =========================
  // Reset Filters
  // =========================
  const handleReset = () => {
    setSearch("");
    setDate("All Dates");
    setModule("All Modules");
    setAction("All Actions");
    setActor("All Actors");
    setPage(1);
  };

  // =========================
  // Pagination Handler
  // =========================
  const handlePageChange = (newPage) => {
    const safePage = Number(newPage);

    if (
      Number.isFinite(safePage) &&
      safePage >= 1 &&
      safePage <= totalPages
    ) {
      setPage(safePage);
    }
  };

  return (
    <main className="w-full min-w-0 overflow-hidden bg-[#f9f9ff] p-4 md:p-6">
      <div className="w-full min-w-0 flex flex-col gap-4">

        {/* Header */}
        <AuditLogsHeader />

        {/* Stats */}
        <AuditLogsStats />

        {/* Filters */}
        <AuditLogsFilters
          search={search}
          setSearch={handleSearchChange}
          date={date}
          setDate={handleDateChange}
          module={module}
          setModule={handleModuleChange}
          action={action}
          setAction={handleActionChange}
          actor={actor}
          setActor={handleActorChange}
          onReset={handleReset}
          actors={actors}
          dates={dates}
          totalRecords={filteredLogs.length}
        />

        {/* Table */}
        <div className="w-full min-w-0 overflow-hidden rounded-xl bg-white">
          <AuditLogsTable
            logs={paginatedLogs}
          />

          <AuditLogsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={filteredLogs.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Telemetry */}
        <AuditLogsTelemetry />

      </div>
    </main>
  );
};

export default AuditLogs;