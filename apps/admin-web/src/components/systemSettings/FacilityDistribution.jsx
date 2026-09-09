const FacilityDistribution = ({
  distribution,
  totalNodes,
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900 mb-1">
        Facility Distribution
      </h3>

      <p className="text-[13px] text-slate-500 mb-4">
        Operational load per regional distribution warehouse.
      </p>

      <div className="flex items-center justify-center py-2">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#e5e8f4"
              strokeWidth="12"
            />

            {distribution.map((item, index) => {
              const dashLength =
                (item.percentage / 100) * circumference;

              const dashOffset =
                -(accumulatedPercentage / 100) *
                circumference;

              accumulatedPercentage += item.percentage;

              const stroke =
                index === 0
                  ? "#235eac"
                  : index === 1
                  ? "#006d40"
                  : "#dfe2ef";

              return (
                <circle
                  key={item.id}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke={stroke}
                  strokeWidth="12"
                  strokeDasharray={`${dashLength} ${
                    circumference - dashLength
                  }`}
                  strokeDashoffset={dashOffset}
                />
              );
            })}
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-[#235eac]">
              {totalNodes}
            </span>

            <span className="text-[11px] text-slate-500 uppercase tracking-wider">
              Nodes
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pt-4">
        {distribution.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-1"
          >
            <span
              className="w-2.5 h-2.5 rounded"
              style={{
                backgroundColor:
                  index === 0
                    ? "#235eac"
                    : index === 1
                    ? "#006d40"
                    : "#dfe2ef",
              }}
            />

            <span className="text-xs text-slate-500">
              {item.name} ({item.percentage}%)
            </span>
          </div>
        ))}

        <div className="flex items-center gap-1">
          <span className="text-[#006d40] text-sm">
            ✓
          </span>

          <span className="text-xs text-[#006d40] font-semibold">
            100% Synced
          </span>
        </div>
      </div>
    </div>
  );
};

export default FacilityDistribution;