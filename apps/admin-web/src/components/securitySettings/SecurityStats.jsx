import SecurityIcon from "./SecurityIcon";

const SecurityStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
        >
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#424751]">
              {stat.label}
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#171C24]">
                {stat.value}
              </span>

              {stat.suffix && (
                <span
                  className={`text-xs font-medium ${stat.supportingColor}`}
                >
                  {stat.suffix}
                </span>
              )}
            </div>

            <span
              className={`text-xs font-medium ${stat.supportingColor}`}
            >
              {stat.supportingText}
            </span>
          </div>

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBackground} ${stat.iconColor}`}
          >
            <SecurityIcon name={stat.icon} size={26} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecurityStats;