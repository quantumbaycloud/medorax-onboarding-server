const CurrencyUnits = ({ settings, onChange }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="pb-4 mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Currency & Units
        </h2>

        <p className="text-[13px] text-slate-500 mt-1">
          Configure the default currency, measurement units and regional
          formatting used across the enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-900">
            Default Currency
          </label>

          <select
            value={settings.currency}
            onChange={(e) =>
              onChange("currency", e.target.value)
            }
            className="w-full px-4 py-2 bg-white rounded-lg shadow-sm text-sm outline-none"
          >
            {settings.currencyOptions.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-900">
            Weight Unit
          </label>

          <select
            value={settings.weightUnit}
            onChange={(e) =>
              onChange("weightUnit", e.target.value)
            }
            className="w-full px-4 py-2 bg-white rounded-lg shadow-sm text-sm outline-none"
          >
            {settings.weightUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-900">
            Volume Unit
          </label>

          <select
            value={settings.volumeUnit}
            onChange={(e) =>
              onChange("volumeUnit", e.target.value)
            }
            className="w-full px-4 py-2 bg-white rounded-lg shadow-sm text-sm outline-none"
          >
            {settings.volumeUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-900">
            Date Format
          </label>

          <select
            value={settings.dateFormat}
            onChange={(e) =>
              onChange("dateFormat", e.target.value)
            }
            className="w-full px-4 py-2 bg-white rounded-lg shadow-sm text-sm outline-none"
          >
            {settings.dateFormats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default CurrencyUnits;