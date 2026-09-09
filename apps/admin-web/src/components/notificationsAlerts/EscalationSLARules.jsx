import EscalationRule from "./EscalationRule";

const EscalationSlaRules = ({
  escalation,
  values,
  enabledValues,
  onValueChange,
  onToggle,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 pb-4 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#235eac]">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
            <path d="M12 8v4l3 2" />
          </svg>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {escalation.title}
          </h2>

          <p className="text-sm text-slate-500">
            {escalation.description}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {escalation.rules.map((rule) => (
          <EscalationRule
            key={rule.id}
            rule={rule}
            value={values[rule.id]}
            enabled={enabledValues[rule.id]}
            onValueChange={onValueChange}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default EscalationSlaRules;