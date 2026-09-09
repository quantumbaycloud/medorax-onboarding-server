// src/utils/reviewDataManager.js
// Sensitive onboarding data is server-side. Do not persist bank details, documents, addresses or account data in browser storage.
export const getAllOnboardingData = () => ({
  registration: {},
  businessType: { type: localStorage.getItem("businessType") || "", value: localStorage.getItem("businessTypeValue") || "" },
  businessLocation: {},
  documents: {},
  bankSetup: {},
  plan: { selected: localStorage.getItem("selectedPlan") || "Free", paymentMethod: localStorage.getItem("paymentMethod") || "" },
});

export const saveOnboardingData = (section, data) => {
  switch (section) {
    case "businessType":
      if (data?.type) { localStorage.setItem("businessType", data.type); localStorage.setItem("businessTypeValue", data.value ?? data.type); }
      break;
    case "plan":
      if (data?.selected) localStorage.setItem("selectedPlan", data.selected);
      if (data?.paymentMethod) localStorage.setItem("paymentMethod", data.paymentMethod);
      break;
    case "registration":
    case "businessLocation":
    case "bankSetup":
    case "documents":
      console.warn(`Skipped browser persistence for sensitive section: ${section}`);
      break;
    default:
      console.warn(`Unknown section: ${section}`);
  }
};

export const getEditFields = () => [];
export const formatDisplayData = (data) => data || {};
