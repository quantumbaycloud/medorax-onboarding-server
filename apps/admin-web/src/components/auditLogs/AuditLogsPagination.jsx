const AuditLogsPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  rowsPerPage = 12,
  onPageChange,
}) => {
  const safeCurrentPage = Number(currentPage) || 1;
  const safeTotalPages = Number(totalPages) || 1;
  const safeTotalRecords = Number(totalRecords) || 0;
  const safeRowsPerPage = Number(rowsPerPage) || 12;

  const startRecord =
    safeTotalRecords === 0
      ? 0
      : (safeCurrentPage - 1) * safeRowsPerPage + 1;

  const endRecord =
    safeTotalRecords === 0
      ? 0
      : Math.min(
          safeCurrentPage * safeRowsPerPage,
          safeTotalRecords
        );

  const getPageNumbers = () => {
    if (safeTotalPages <= 5) {
      return Array.from(
        { length: safeTotalPages },
        (_, index) => index + 1
      );
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, "...", safeTotalPages];
    }

    if (safeCurrentPage >= safeTotalPages - 2) {
      return [
        1,
        "...",
        safeTotalPages - 3,
        safeTotalPages - 2,
        safeTotalPages - 1,
        safeTotalPages,
      ];
    }

    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      safeTotalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">

      {/* Showing records */}
      <div>
        Showing{" "}
        <span className="font-semibold text-slate-700">
          {startRecord}
        </span>
        -
        <span className="font-semibold text-slate-700">
          {endRecord}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-700">
          {safeTotalRecords}
        </span>{" "}
        log entries
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-1">

        {/* First */}
        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() => onPageChange(1)}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            safeCurrentPage === 1
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-500 hover:bg-[#f1f3ff]"
          }`}
        >
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
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>
        </button>

        {/* Previous */}
        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() => onPageChange(safeCurrentPage - 1)}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            safeCurrentPage === 1
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-500 hover:bg-[#f1f3ff]"
          }`}
        >
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
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="w-8 h-8 flex items-center justify-center"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded font-medium ${
                safeCurrentPage === page
                  ? "bg-[#3765ad] text-white"
                  : "text-slate-700 hover:bg-[#f1f3ff]"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          disabled={safeCurrentPage === safeTotalPages}
          onClick={() => onPageChange(safeCurrentPage + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            safeCurrentPage === safeTotalPages
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-500 hover:bg-[#f1f3ff]"
          }`}
        >
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
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Last */}
        <button
          type="button"
          disabled={safeCurrentPage === safeTotalPages}
          onClick={() => onPageChange(safeTotalPages)}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            safeCurrentPage === safeTotalPages
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-500 hover:bg-[#f1f3ff]"
          }`}
        >
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
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default AuditLogsPagination;