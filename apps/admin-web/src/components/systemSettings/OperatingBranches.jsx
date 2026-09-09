const OperatingBranches = ({
  branches,
  onEdit,
  onAdd,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Operating Branches Directory
          </h2>

          <p className="text-[13px] text-slate-500">
            Real-time regulatory synchronization across regional supply hubs.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f1f3ff] text-[#235eac] text-sm hover:bg-[#e5e8f4] font-semibold transition-colors self-start sm:self-auto"
        >
          <span className="text-lg leading-none">+</span>
          Add Branch
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#f1f3ff] text-[#235eac] text-xs uppercase tracking-wider">
              <th className="py-2 px-4 rounded-l-lg">
                Branch Facility
              </th>

              <th className="py-2 px-4">
                Location Code
              </th>

              <th className="py-2 px-4">
                License Validity
              </th>

              <th className="py-2 px-4">
                Store Manager
              </th>

              <th className="py-2 px-4 text-right rounded-r-lg">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-slate-900">
            {branches.map((branch) => (
              <tr
                key={branch.id}
                className="hover:bg-[#f1f3ff]/40 transition-colors"
              >
                <td className="py-3 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        branch.status === "review"
                          ? "bg-slate-400"
                          : "bg-[#006d40]"
                      }`}
                    />

                    <span>{branch.facility}</span>
                  </div>
                </td>

                <td className="py-3 px-4 font-mono text-slate-500">
                  {branch.locationCode}
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      branch.status === "review"
                        ? "bg-[#e5e8f4] text-slate-600"
                        : "bg-[#9cf6bc] text-[#00522f]"
                    }`}
                  >
                    {branch.licenseValidity}
                  </span>
                </td>

                <td className="py-3 px-4 text-slate-500">
                  {branch.manager}
                </td>

                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onEdit(branch)}
                    className="text-[#235eac] hover:text-[#004287] text-sm font-medium"
                  >
                    Edit
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

export default OperatingBranches;