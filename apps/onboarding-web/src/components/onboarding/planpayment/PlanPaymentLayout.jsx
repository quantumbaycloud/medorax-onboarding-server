// PlanPaymentLayout.jsx - Scrollable on mobile only
import { useNavigate } from "react-router-dom";
import usePlanPayment from "./usePlanPayment";
import PlanCard from "./PlanCard";
import OrderSummaryCard from "./OrderSummaryCard";
import PaymentLogos from "./PaymentLogos";

export default function PlanPaymentLayout() {
  const navigate = useNavigate();
  const {
    plan,
    subtotal,
    gst,
    convenienceFee,
    total,
    loading,
    handlePayment,
    error,
  } = usePlanPayment();

  const handlePaymentAndNavigate = async () => {
    const success = await handlePayment();
    if (success) {
      navigate("/bank-setup");
    }
  };

  if (!plan) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-b-2 border-[#006B5F] mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500">Loading plan details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Mobile Layout - Fixed Header + Scrollable Content */}
      <div className="block lg:hidden flex flex-col h-full">
        {/* Fixed Header - Mobile */}
        <div className="flex-shrink-0 px-3 sm:px-4 pt-3 pb-2 bg-white z-10 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-900">Complete Your Subscription</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose your plan and complete the payment
          </p>
        </div>

        {/* Scrollable Content - Mobile */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 scrollbar-thin scrollbar-thumb-[#006B5F] scrollbar-track-gray-100">
          <div className="space-y-4">
            <PlanCard plan={plan} />
            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
            <OrderSummaryCard
              subtotal={subtotal}
              gst={gst}
              convenienceFee={convenienceFee}
              total={total}
              loading={loading}
              handlePayment={handlePaymentAndNavigate}
            />
            <PaymentLogos compact={true} />
          </div>
        </div>
      </div>

      {/* Desktop Layout - Full page no scroll */}
      <div className="hidden lg:flex flex-col h-full w-full px-6">
        {/* Header - Desktop */}
        <div className="flex-shrink-0 mb-5">
          <h1 className="text-2xl font-bold text-slate-900">Complete Your Subscription</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Choose your plan and complete the payment to activate your account
          </p>
        </div>

        {/* Main Grid - Desktop */}
        <div className="flex-1 min-h-0">
          <div className="grid grid-cols-12 gap-5 h-full">
            {/* LEFT COLUMN - Plan Card */}
            <div className="col-span-7">
              <PlanCard plan={plan} />
            </div>

            {/* RIGHT COLUMN - Order Summary */}
            <div className="col-span-5 flex flex-col gap-4">
              {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
              <OrderSummaryCard
                subtotal={subtotal}
                gst={gst}
                total={total}
                loading={loading}
                handlePayment={handlePaymentAndNavigate}
              />
              <PaymentLogos compact={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}