const Toggle = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full p-0.5 flex items-center transition-all ${
        checked
          ? "bg-[#9cf6bc] justify-end"
          : "bg-[#e5e8f4] justify-start"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full shadow-sm transition-all ${
          checked
            ? "bg-[#006d40]"
            : "bg-[#737782]"
        }`}
      />
    </button>
  );
};

const EscalationRule = ({
  rule,
  value,
  enabled,
  onValueChange,
  onToggle,
}) => {
  return (
    <div className="p-4 rounded-xl bg-[#f1f3ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-slate-900">
            {rule.title}
          </span>

          {rule.badge && (
            <span
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                rule.badgeTone === "danger"
                  ? "bg-[#ffdad6] text-[#93000a]"
                  : "bg-[#e5e8f4] text-slate-600"
              }`}
            >
              {rule.badge}
            </span>
          )}
        </div>

        <span className="text-xs text-slate-500 mt-1">
          {rule.description}
        </span>
      </div>

      {rule.type === "toggle" ? (
        <Toggle
          checked={enabled}
          onChange={(nextValue) =>
            onToggle(rule.id, nextValue)
          }
          label={`Toggle ${rule.title}`}
        />
      ) : (
        <div className="bg-white px-3 py-2 rounded-xl shadow-sm shrink-0">
          <select
            value={value}
            onChange={(event) =>
              onValueChange(
                rule.id,
                event.target.value
              )
            }
            className="text-sm font-semibold text-[#235eac] bg-transparent focus:outline-none cursor-pointer max-w-[280px]"
          >
            {rule.options?.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default EscalationRule;