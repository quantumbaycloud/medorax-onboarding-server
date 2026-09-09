import client from "../../../api/client";

let razorpayPromise = null;

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (razorpayPromise) return razorpayPromise;

  razorpayPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Razorpay));
      existing.addEventListener("error", () => reject(new Error("Unable to load Razorpay Checkout.")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => window.Razorpay ? resolve(window.Razorpay) : reject(new Error("Razorpay Checkout failed to initialize."));
    script.onerror = () => reject(new Error("Unable to load Razorpay Checkout."));
    document.body.appendChild(script);
  });

  return razorpayPromise;
}

export const paymentService = {
  getPlan: async () => {
    const { data } = await client.get("/api/payments/plan");
    return data;
  },

  getStatus: async () => {
    const { data } = await client.get("/api/payments/status");
    return data;
  },

  createSubscription: async () => {
    const { data } = await client.post("/api/payments/create-subscription");
    return data;
  },

  verifyPayment: async (data) => {
    const { data: response } = await client.post("/api/payments/verify", data);

    // The server creates the invoice only after Razorpay signature verification.
    // Download it automatically for the customer, but do not mark a successful
    // payment as failed if the browser download is blocked.
    if (response?.invoiceDownloadUrl) {
      try {
        const { data: pdf } = await client.get(response.invoiceDownloadUrl, {
          responseType: "blob",
        });

        const blobUrl = window.URL.createObjectURL(pdf);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${response.invoiceNumber || "Medorax-Invoice"}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
      } catch (invoiceError) {
        console.warn("Invoice was generated but could not be downloaded automatically:", invoiceError);
      }
    }

    return response;
  },

  openSubscriptionCheckout: async ({ subscription, user, onSuccess, onFailure }) => {
    const Razorpay = await loadRazorpay();

    return new Promise((resolve, reject) => {
      const options = {
        key: subscription.keyId,
        subscription_id: subscription.subscriptionId,
        name: "Medorax",
        description: "Professional Plan — ₹10,000 + 2% convenience fee (₹10,200 total)/year",
        prefill: {
          name: user?.fullName || "",
          email: user?.email || "",
          contact: user?.mobileNumber || "",
        },
        notes: {
          plan: "professional-annual",
        },
        theme: {
          color: "#006B5F",
        },
        handler: async (response) => {
          try {
            const verified = await paymentService.verifyPayment({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySubscriptionId: response.razorpay_subscription_id,
              razorpaySignature: response.razorpay_signature,
            });
            onSuccess?.(verified);
            resolve(verified);
          } catch (error) {
            onFailure?.(error);
            reject(error);
          }
        },
        modal: {
          ondismiss: () => {
            const error = new Error("Payment window was closed.");
            onFailure?.(error);
            reject(error);
          },
        },
      };

      const checkout = new Razorpay(options);
      checkout.on("payment.failed", (response) => {
        const message = response?.error?.description || "Payment failed. Please try again.";
        const error = new Error(message);
        onFailure?.(error);
        reject(error);
      });
      checkout.open();
    });
  },
};

export default paymentService;
