import React from "react";

const ICONS = {
  medication: "▣",
  inventory_2: "▤",
  local_shipping: "⌁",
  badge: "●",
};

const SchemaSelector = ({
  schema = {},
  selectedId,
  onSelect,
}) => {
  const options = Array.isArray(schema?.options)
    ? schema.options
    : [];

  return (
    <div className="min-w-0">
      <label className="mb-2 block text-[10px] font-bold text-slate-700">
        {schema?.label ||
          "Destination Entity / Schema Module"}
      </label>

      <div className="grid min-w-0 grid-cols-2 gap-1.5">
        {options.map((option) => {
          const selected = option?.id === selectedId;

          return (
            <button
              key={option?.id}
              type="button"
              onClick={() => onSelect?.(option?.id)}
              aria-pressed={selected}
              className={`flex min-w-0 items-center justify-between gap-1 rounded px-2 py-2 text-left text-[10px] font-semibold transition ${
                selected
                  ? "bg-[#235EAC] text-white"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="flex min-w-0 items-center gap-1">
                <span className="shrink-0">
                  {ICONS[option?.icon] || "•"}
                </span>

                <span className="truncate">
                  {option?.label || "Unnamed Module"}
                </span>
              </span>

              {selected && (
                <span className="shrink-0">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SchemaSelector;