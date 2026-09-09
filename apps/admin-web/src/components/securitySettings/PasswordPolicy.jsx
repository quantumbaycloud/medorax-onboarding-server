import SecurityIcon from "./SecurityIcon";

const PasswordPolicy = ({
  data,
  values,
  onChange,
  onTest,
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label
                htmlFor="password-length"
                className="block text-sm font-medium text-[#171C24]"
              >
                {data.minimumLength.label}
              </label>

              <div className="relative">
                <input
                  id="password-length"
                  type="number"
                  min={data.minimumLength.min}
                  max={data.minimumLength.max}
                  value={values.minimumLength}
                  onChange={(e) =>
                    onChange(
                      "minimumLength",
                      e.target.value
                    )
                  }
                  className="h-10 w-full rounded-lg bg-[#F1F3FF] px-4 pr-14 text-sm text-[#171C24] outline-none focus:bg-white focus:ring-2 focus:ring-[#235EAC]/20"
                />

                <span className="absolute right-3 top-3 text-xs text-[#424751]">
                  {data.minimumLength.unit}
                </span>
              </div>

              <span className="text-xs text-[#424751]">
                {data.minimumLength.description}
              </span>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password-expiration"
                className="block text-sm font-medium text-[#171C24]"
              >
                {data.expiration.label}
              </label>

              <div className="relative">
                <select
                  id="password-expiration"
                  value={values.expiration}
                  onChange={(e) =>
                    onChange(
                      "expiration",
                      e.target.value
                    )
                  }
                  className="h-10 w-full appearance-none rounded-lg bg-[#F1F3FF] px-4 pr-10 text-sm text-[#171C24] outline-none focus:bg-white focus:ring-2 focus:ring-[#235EAC]/20"
                >
                  {data.expiration.options.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>

                <SecurityIcon
                  name="chevronDown"
                  size={18}
                  className="pointer-events-none absolute right-3 top-2.5 text-[#424751]"
                />
              </div>

              <span className="text-xs text-[#424751]">
                {data.expiration.description}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="block text-sm font-medium text-[#171C24]">
              {data.complexity.label}
            </span>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {data.complexity.rules.map((rule) => (
                <label
                  key={rule.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#F1F3FF] p-2"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(
                      values.complexity[rule.id]
                    )}
                    onChange={() =>
                      onChange(
                        "complexity",
                        rule.id
                      )
                    }
                    className="h-4 w-4 accent-[#235EAC]"
                  />

                  <span className="text-sm text-[#171C24]">
                    {rule.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-[#D6E3FF] p-2 text-[#235EAC]">
            <div className="flex items-center gap-2">
              <SecurityIcon
                name={data.encryption.icon}
                size={20}
              />

              <span className="text-sm font-semibold">
                {data.encryption.label}
              </span>
            </div>

            <span className="font-mono text-xs font-semibold">
              {data.encryption.value}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 text-xs text-[#424751]">
        <span>
          {data.bcrypt.label}:{" "}
          <strong>{data.bcrypt.value}</strong>
        </span>

        <button
          type="button"
          onClick={onTest}
          className="font-medium text-[#235EAC] hover:underline"
        >
          {data.testPasswordAction.label}
        </button>
      </div>
    </div>
  );
};

export default PasswordPolicy;