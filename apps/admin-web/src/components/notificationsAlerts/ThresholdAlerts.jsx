import ThresholdRule from "./ThresholdRule";

const ThresholdAlerts = ({
  section,
  values,
  onValueChange,
  enabledCount,
}) => {
  return (
    <section className="xl:col-span-7 bg-white rounded-xl shadow-sm p-6 flex flex-col">
      <div className="flex items-center justify-between gap-4 pb-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#f1f3ff] text-[#235eac] flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 3a7 7 0 0 0-7 7v4l-2 3h18l-2-3v-4a7 7 0 0 0-7-7z" />
              <path d="M9 21h6" />
            </svg>
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-slate-900">
              {section.title}
            </h2>

            <p className="text-sm text-slate-500">
              {section.description}
            </p>
          </div>
        </div>

        <span className="px-3 py-1.5 rounded-lg bg-[#eaedfa] text-slate-600 text-xs font-semibold whitespace-nowrap">
          {enabledCount} {section.enabledLabel}
        </span>
      </div>

      <div className="space-y-3">
        {section.rules.map((rule) => (
          <ThresholdRule
            key={rule.id}
            rule={rule}
            value={values[rule.id]}
            onChange={(value) =>
              onValueChange(rule.id, value)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default ThresholdAlerts;