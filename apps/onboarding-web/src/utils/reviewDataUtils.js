// src/utils/reviewDataUtils.js
// Review data is loaded from the authenticated backend. Sensitive values are never read from localStorage.
export const getReviewData = () => ({
  accountInfo: {},
  businessDetails: {},
  bankSetup: {},
  documents: {},
  businessLocation: {},
  plan: localStorage.getItem("selectedPlan") || "Free",
  paymentMethod: localStorage.getItem("paymentMethod") || "Not selected",
});
export const isReviewDataComplete = () => ({ complete: false, missing: ["backend"], data: getReviewData() });
