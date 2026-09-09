import { useMemo, useState, useCallback } from "react";
import { PLAN } from "./paymentData";
import { paymentService } from "./paymentService";

export default function usePlanPayment() {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);

  const plan = PLAN;
  const subtotal = plan.yearlyPrice;
  const gst = useMemo(
    () => subtotal * ((plan.gstPercentage || 0) / 100),
    [subtotal, plan.gstPercentage]
  );
  const convenienceFee = useMemo(
    () => subtotal * ((plan.convenienceFeePercentage || 0) / 100),
    [subtotal, plan.convenienceFeePercentage]
  );
  const total = subtotal + gst + convenienceFee;

  const handlePayment = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const existing = await paymentService.getStatus();
      if (existing?.active) {
        setPaymentSuccess(true);
        return true;
      }

      const subscription = await paymentService.createSubscription();
      if (!subscription?.subscriptionId || !subscription?.keyId) {
        throw new Error("Unable to create the payment subscription.");
      }

      const verified = await paymentService.openSubscriptionCheckout({
        subscription,
        user: subscription.user,
        onFailure: (checkoutError) => setError(checkoutError?.message || "Payment failed."),
      });

      if (!verified?.success) {
        throw new Error("Payment could not be verified by the server.");
      }

      setPaymentSuccess(true);
      return true;
    } catch (err) {
      console.error("❌ Razorpay payment failed:", err?.response?.data || err);
      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message ||
        "Payment failed. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    plan,
    subtotal,
    gst,
    convenienceFee,
    total,
    loading,
    paymentSuccess,
    error,
    handlePayment,
  };
}
