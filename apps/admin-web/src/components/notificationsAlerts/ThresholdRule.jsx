const ThresholdRule = ({
  rule,
  value,
  onChange,
}) => {
  const updateNumber = (direction) => {
    const current = Number(value);

    if (!Number.isFinite(current)) {
      onChange(rule.min);
      return;
    }

    const next =
      direction === "increase"
        ? current + rule.step
        : current - rule.step;

    const safeValue = Math.min(
      rule.max,
      Math.max(rule.min, next)
    );

    onChange(safeValue);
  };

  return (
    <div className="p-4 rounded-xl bg-[#f1f3ff] flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-slate-900">
            {rule.title}
          </span>

          {rule.badge && (
            <span
              className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold ${
                rule.badgeTone === "danger"
                  ? "bg-[#ffdad6] text-[#93000a]"
                  : rule.badgeTone === "success"
                  ? "bg-[#9cf6bc] text-[#00522f]"
                  : "bg-[#e5e8f4] text-slate-600"
              }`}
            >
              {rule.badge}
            </span>
          )}

          {rule.info && (
            <span
              title={rule.info}
              className="w-4 h-4 rounded-full border border-slate-400 text-slate-500 text-[10px] flex items-center justify-center cursor-help"
            >
              i
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {rule.description}
        </p>
      </div>

      {rule.type === "select" ? (
        <div className="bg-white px-3 py-2 rounded-xl shadow-sm flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-700">
            Tolerance:
          </span>

          <select
            value={value}
            onChange={(event) =>
              onChange(event.target.value)
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
      ) : (
        <div className="flex items-center gap-1 bg-white px-1 py-1 rounded-xl shadow-sm shrink-0">
          <button
            type="button"
            onClick={() =>
              updateNumber("decrease")
            }
            disabled={Number(value) <= rule.min}
            aria-label={`Decrease ${rule.title}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-[#eaedfa] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
          >
            −
          </button>

          <input
            type="number"
            value={value}
            min={rule.min}
            max={rule.max}
            step={rule.step}
            onChange={(event) => {
              const raw = event.target.value;

              if (raw === "") {
                onChange("");
                return;
              }

              const numeric = Number(raw);

              if (!Number.isFinite(numeric)) {
                return;
              }

              onChange(
                Math.min(
                  rule.max,
                  Math.max(rule.min, numeric)
                )
              );
            }}
            onBlur={() => {
              const numeric = Number(value);

              if (!Number.isFinite(numeric)) {
                onChange(rule.min);
                return;
              }

              onChange(
                Math.min(
                  rule.max,
                  Math.max(rule.min, numeric)
                )
              );
            }}
            className={`w-16 text-center text-sm font-semibold bg-transparent focus:outline-none ${
              rule.tone === "danger"
                ? "text-[#ba1a1a]"
                : "text-[#235eac]"
            }`}
          />

          <span className="text-xs text-slate-500 pr-2 whitespace-nowrap">
            {rule.suffix}
          </span>

          <button
            type="button"
            onClick={() =>
              updateNumber("increase")
            }
            disabled={Number(value) >= rule.max}
            aria-label={`Increase ${rule.title}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-[#eaedfa] disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ThresholdRule;