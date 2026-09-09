// src/components/onboarding/reviewsetup/ReviewDataProvider.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import client from "../../../api/client";
import { documentConfig } from "../documents/documentConfig";

const ReviewDataContext = createContext();
export const useReviewData = () => { const context=useContext(ReviewDataContext); if(!context) throw new Error("useReviewData must be used within a ReviewDataProvider"); return context; };

export const ReviewDataProvider = ({ children }) => {
  const [reviewData, setReviewData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, statusRes, bankRes] = await Promise.all([client.get("/api/auth/me"), client.get("/api/onboarding/status"), client.get("/api/onboarding/bank-details")]);
      const user = meRes.data?.user || statusRes.data?.user || {};
      const status = statusRes.data || {};
      const location = (status.locations || []).find(x => x.isPrimary) || (status.locations || [])[0] || {};
      const business = status.pharmacy || status.distributor || {};
      const type = status.businessType || user.businessType || "";
      const bank = bankRes.data || {};
      const data = {
        accountInfo: { fullName: user.fullName || "", email: user.email || "", mobile: user.mobileNumber || "", role: user.role || "" },
        businessDetails: { businessName: business.pharmacyName || business.companyName || "", businessType: type, gstNumber: business.gstNumber || "", drugLicense: business.drugLicenseNumber || "", address: location.formattedAddress || business.formattedAddress || "" },
        bankSetup: { accountHolder: bank.accountHolderName || "", bankName: bank.bankName || "", accountNumber: bank.accountNumberMasked || "", ifsc: bank.ifscCode || "", upi: bank.upiId || "", branch: bank.branchName || "" },
        documents: Object.fromEntries((status.documents || []).map(d => { const c=documentConfig.find(x=>x.documentType===d.documentType); return [c?.id || String(d.documentType), { ...d, displayName:c?.title || `Document ${d.documentType}`, uploaded:true }]; })),
        businessLocation: location,
        plan: localStorage.getItem("selectedPlan") || "Free",
        paymentMethod: localStorage.getItem("paymentMethod") || "Not selected",
      };
      setReviewData(data);
      return data;
    } catch (error) {
      console.error("❌ Failed to load review data:", error.response?.data || error.message);
      setReviewData({});
      throw error;
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchAllData().catch(() => {}); }, [fetchAllData]);
  const refreshData = useCallback(() => fetchAllData(), [fetchAllData]);
  return <ReviewDataContext.Provider value={{ reviewData, loading, refreshData }}>{children}</ReviewDataContext.Provider>;
};
