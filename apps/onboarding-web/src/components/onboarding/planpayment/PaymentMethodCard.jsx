// PaymentMethodCard.jsx - Responsive
import PaymentMethodTabs from "./PaymentMethodTabs";
import UPIPaymentForm from "./UPIPaymentForm";
import CardPaymentForm from "./CardPaymentForm";
import NetBankingForm from "./NetBankingForm";
import PaymentSecurityInfo from "./PaymentSecurityInfo";
import PaymentLogos from "./PaymentLogos";

export default function PaymentMethodCard({
  paymentMethod,
  setPaymentMethod,
  formData,
  updateField,
  loading,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1 h-4 sm:h-5 rounded-full bg-gradient-to-b from-[#0EA5A4] to-[#2563EB]" />
            Payment Method
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 ml-2 sm:ml-3">Choose your preferred payment option.</p>
        </div>
        <PaymentSecurityInfo compact={true} />
      </div>

      <div className="mt-3">
        <PaymentMethodTabs
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>

      <div className="mt-3">
        {paymentMethod === "upi" && (
          <UPIPaymentForm
            formData={formData}
            updateField={updateField}
            loading={loading}
          />
        )}
        {paymentMethod === "card" && (
          <CardPaymentForm
            formData={formData}
            updateField={updateField}
          />
        )}
        {paymentMethod === "netbanking" && (
          <NetBankingForm
            formData={formData}
            updateField={updateField}
          />
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100">
        <PaymentLogos compact={true} />
      </div>
    </div>
  );
}