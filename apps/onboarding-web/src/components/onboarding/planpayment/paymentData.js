export const PLAN = {
  id: "professional-annual",
  badge: "PROFESSIONAL",
  name: "Professional Plan",
  description: "Enterprise-grade tools for scaling clinics and pharmacies.",
  yearlyPrice: 10000,
  gstPercentage: 0,
  convenienceFeePercentage: 2,
  platformFee: 200,
  renewalDate: null,
  saveText: "Annual subscription • Auto-renews every year",
  features: [
    { id: 1, icon: "inventory", title: "Unlimited Inventory Sync" },
    { id: 2, icon: "ocr", title: "AI Prescription OCR" },
    { id: 3, icon: "truck", title: "Real-time Logistics Tracking" },
    { id: 4, icon: "support", title: "24/7 Priority Support" },
  ],
};

export const PAYMENT_METHODS = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Card" },
  { id: "netbanking", label: "Net Banking" },
];

export default { PLAN, PAYMENT_METHODS };
