import AuditLogRow from "./AuditLogRow";

const AuditLogsTable = ({ logs = [] }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px] border-collapse text-left">
        <thead>
          {/* same code */}
        </thead>

        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <AuditLogRow
                key={log.id || `${log.timestamp}-${index}`}
                log={log}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-4 py-10 text-center text-sm text-slate-400"
              >
                No audit logs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogsTable;