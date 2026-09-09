// PaymentMethodTabs.jsx - Responsive
import { Smartphone, CreditCard, Landmark, CheckCircle } from "lucide-react";

const tabs = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
];

export default function PaymentMethodTabs({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = paymentMethod === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPaymentMethod(tab.id)}
            className={`
              relative rounded-xl border-2 p-2 sm:p-3 transition-all duration-300
              ${active
                ? "border-[#0EA5A4] bg-gradient-to-br from-[#0EA5A4]/5 to-[#2563EB]/5 shadow-md"
                : "border-slate-200 bg-white hover:border-[#0EA5A4]/40 hover:bg-slate-50/80"}
            `}
          >
            {active && (
              <div className="absolute -top-1.5 -right-1.5">
                <CheckCircle size={14} className="text-[#0EA5A4] fill-white" />
              </div>
            )}
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <Icon
                size={18}
                className={active ? "text-[#0EA5A4]" : "text-slate-500"}
              />
              <span
                className={`text-[10px] sm:text-xs font-semibold ${
                  active ? "text-[#006B5F]" : "text-slate-600"
                }`}
              >
                {tab.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}