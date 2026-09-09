import SecurityIcon from "./SecurityIcon";

const SessionAuthGovernance = ({
  data,
  values,
  onChange,
}) => {
  return (
    <div className="flex flex-col justify-between space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F1F3FF] text-[#235EAC]">
            <SecurityIcon name={data.icon} size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#171C24]">
              {data.title}
            </h2>

            <p className="text-sm text-[#424751]">
              {data.description}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <label
              htmlFor="session-timeout"
              className="block text-sm font-medium text-[#171C24]"
            >
              {data.sessionTimeout.label}
            </label>

            <div className="relative">
              <select
                id="session-timeout"
                value={values.sessionTimeout}
                onChange={(e) =>
                  onChange("sessionTimeout", e.target.value)
                }
                className="h-10 w-full appearance-none rounded-lg bg-[#F1F3FF] px-4 pr-10 text-sm text-[#171C24] outline-none focus:bg-white focus:ring-2 focus:ring-[#235EAC]/20"
              >
                {data.sessionTimeout.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <SecurityIcon
                name="chevronDown"
                size={18}
                className="pointer-events-none absolute right-3 top-2.5 text-[#424751]"
              />
            </div>

            <span className="block text-xs text-[#424751]">
              {data.sessionTimeout.description}
            </span>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="concurrent-sessions"
              className="block text-sm font-medium text-[#171C24]"
            >
              {data.concurrentSessions.label}
            </label>

            <div className="relative">
              <input
                id="concurrent-sessions"
                type="text"
                value={values.concurrentSessions}
                onChange={(e) =>
                  onChange(
                    "concurrentSessions",
                    e.target.value
                  )
                }
                className="h-10 w-full rounded-lg bg-[#F1F3FF] px-4 pr-12 text-sm text-[#171C24] outline-none focus:bg-white focus:ring-2 focus:ring-[#235EAC]/20"
              />

              <SecurityIcon
                name={data.concurrentSessions.icon}
                size={19}
                className="pointer-events-none absolute right-3 top-2.5 text-[#424751]"
              />
            </div>

            <span className="block text-xs text-[#424751]">
              {data.concurrentSessions.description}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#F1F3FF] p-4">
            <div className="pr-4">
              <span className="block text-sm font-semibold text-[#171C24]">
                {data.forceLogout.label}
              </span>

              <p className="mt-1 text-xs text-[#424751]">
                {data.forceLogout.description}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={values.forceLogout}
              onClick={() =>
                onChange(
                  "forceLogout",
                  !values.forceLogout
                )
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                values.forceLogout
                  ? "bg-[#006D40]"
                  : "bg-[#C3C6D2]"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                  values.forceLogout
                    ? "left-5"
                    : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 pt-2 text-xs text-[#424751]">
        <span>{data.footer.breadcrumb[0]}</span>
        <span>›</span>
        <span className="font-semibold text-[#235EAC]">
          {data.footer.breadcrumb[1]}
        </span>
      </div>
    </div>
  );
};

export default SessionAuthGovernance;