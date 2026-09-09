// CardPaymentForm.jsx - New Design
export default function CardPaymentForm({
  formData,
  updateField,
}) {
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    updateField("cardNumber", formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    updateField("expiry", value);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Card Number
          <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.cardNumber || ""}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition-all duration-200 focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
            <span className="w-6 h-4 rounded bg-gradient-to-r from-blue-600 to-blue-400" />
            <span className="w-6 h-4 rounded bg-gradient-to-r from-red-600 to-orange-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Card Holder
          <span className="text-red-500 ml-0.5">*</span>
        </label>
        <input
          type="text"
          value={formData.cardHolder || ""}
          onChange={(e) => updateField("cardHolder", e.target.value)}
          placeholder="John Doe"
          className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition-all duration-200 focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Expiry
            <span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            placeholder="MM/YY"
            value={formData.expiry || ""}
            onChange={handleExpiryChange}
            maxLength="5"
            className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition-all duration-200 focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            CVV
            <span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            type="password"
            value={formData.cvv || ""}
            onChange={(e) => updateField("cvv", e.target.value)}
            maxLength="4"
            placeholder="•••"
            className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition-all duration-200 focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"
          />
        </div>
      </div>
    </div>
  );
}