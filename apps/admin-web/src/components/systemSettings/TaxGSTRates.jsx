const TaxGSTRates = ({ taxRates, onEdit }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between pb-2 mb-2">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">
            Tax & GST Rates Matrix
          </h3>

          <p className="text-[13px] text-slate-500">
            Default pharmaceutical tariff classifications.
          </p>
        </div>

        <div className="text-[#235eac] text-xl font-bold">
          %
        </div>
      </div>

      <div className="space-y-2 my-4">
        {taxRates.map((tax) => (
          <div
            key={tax.id}
            className="p-4 rounded-lg bg-[#f1f3ff] flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="text-sm text-slate-900 font-semibold">
                {tax.name}
              </span>

              <span className="font-mono text-xs text-slate-500">
                {tax.hsn}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#235eac]">
                {tax.rate}
              </span>

              <button
                type="button"
                onClick={() => onEdit(tax)}
                className="text-[#235eac] hover:text-[#004287] text-sm font-medium underline underline-offset-2"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 rounded-lg bg-[#eaedfa] flex items-center gap-2 mt-4">
        <span className="text-[#235eac] font-bold">
          i
        </span>

        <p className="text-xs text-slate-500">
          Tax adjustments automatically apply to all queued purchase invoices and dispatch challans.
        </p>
      </div>
    </div>
  );
};

export default TaxGSTRates;