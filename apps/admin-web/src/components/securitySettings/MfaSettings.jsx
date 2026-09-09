import SecurityIcon from "./SecurityIcon";

const MfaSettings = ({
  data,
  values,
  onEnforcementChange,
  onMethodChange,
  onBackupCodes,
}) => {
  return (
    <div className="flex flex-col justify-between space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
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

          <span className="inline-flex items-center gap-1 rounded-md bg-[#9CF6BC]/50 px-2 py-1 text-xs font-semibold text-[#00522F]">
            <SecurityIcon
              name={data.badge.icon}
              size={15}
              className="text-[#006D40]"
            />
            {data.badge.label}
          </span>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#171C24]">
              {data.enforcement.label}
            </label>

            <div className="space-y-1">
              {data.enforcement.options.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center justify-between rounded-lg bg-[#F1F3FF] p-2 transition hover:bg-[#EAEDFA]"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="mfa-enforcement"
                      value={option.value}
                      checked={
                        values.enforcement === option.value
                      }
                      onChange={() =>
                        onEnforcementChange(option.value)
                      }
                      className="h-4 w-4 accent-[#235EAC]"
                    />

                    <span className="text-sm font-medium text-[#171C24]">
                      {option.label}
                    </span>
                  </div>

                  {option.verified && (
                    <SecurityIcon
                      name="verified"
                      size={17}
                      className="text-[#006D40]"
                    />
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-[#171C24]">
              {data.methods.label}
            </label>

            <div className="space-y-1">
              {data.methods.items.map((method) => (
                <label
                  key={method.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-[#F1F3FF] p-2"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <input
                      type="checkbox"
                      checked={
                        Boolean(values.methods[method.id])
                      }
                      onChange={() =>
                        onMethodChange(method.id)
                      }
                      className="h-4 w-4 rounded accent-[#235EAC]"
                    />

                    <div className="min-w-0">
                      <span className="block text-sm font-medium text-[#171C24]">
                        {method.label}
                      </span>

                      <span className="block text-xs text-[#424751]">
                        {method.description}
                      </span>
                    </div>
                  </div>

                  {method.badge && (
                    <span
                      className={`shrink-0 text-xs font-medium ${method.badgeColor}`}
                    >
                      {method.badge}
                    </span>
                  )}

                  {method.warning && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#FFEBE8] px-1.5 py-0.5 text-[11px] font-semibold text-[#93000A]">
                      <SecurityIcon
                        name={method.warningIcon}
                        size={13}
                      />
                      {method.warning}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 text-xs text-[#424751]">
        <span>
          {data.gracePeriod.label}:{" "}
          <strong>{data.gracePeriod.value}</strong>
        </span>

        <button
          type="button"
          onClick={onBackupCodes}
          className="font-medium text-[#235EAC] hover:underline"
        >
          {data.backupCodesAction.label}
        </button>
      </div>
    </div>
  );
};

export default MfaSettings;