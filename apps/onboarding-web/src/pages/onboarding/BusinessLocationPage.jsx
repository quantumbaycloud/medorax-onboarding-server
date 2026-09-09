// src/pages/onboarding/BusinessLocationPage.jsx
import { useState, useEffect } from "react";
import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import BusinessLocationLayout from "../../components/onboarding/businessLocation/BusinessLocationLayout";
import client from "../../api/client";

const emptyState = (businessType, user = {}) => ({
  businessType,
  contactPerson: "",
  contactNumber: user.mobileNumber || "",
  email: user.email || "",
  formattedAddress: "",
  latitude: null, longitude: null, accuracy: null,
  gstNumber: "", panNumber: "", drugLicenseNumber: "",
  drugLicenseExpiryDate: "", is24x7: false, emergencyContactNumber: "",
  ...(businessType === "Distributor" ? {
    companyName: "", distributorRegistrationNumber: "", serviceCitiesInput: "", serviceCities: [],
    minimumOrderValue: "", isCreditAvailable: false, creditDays: "", maximumCreditLimit: "",
    hasOwnDelivery: false, deliveryVehicleTypesInput: "", deliveryVehicleTypes: [],
    warehouseOpenTime: "", warehouseCloseTime: ""
  } : {
    businessName: "", pharmacyRegistrationNumber: "", storeOpenTime: "", storeCloseTime: ""
  })
});

export default function BusinessLocationPage() {
  const [businessType, setBusinessType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [businessData, setBusinessData] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const meResponse = await client.get("/api/auth/me");
        const user = meResponse.data?.user || {};
        const type = user.businessType || localStorage.getItem("businessType") || "Pharmacy";

        const requests = [client.get("/api/onboarding/location")];
        requests.push(
          type === "Distributor"
            ? client.get("/api/onboarding/distributor/details")
            : client.get("/api/onboarding/pharmacy/details")
        );
        const [locationResponse, detailsResponse] = await Promise.all(requests);
        if (!mounted) return;
        setBusinessType(type);
        const rows = Array.isArray(locationResponse.data) ? locationResponse.data : [];
        const existingLocation = rows.find((x) => x.isPrimary) || rows[0];
        const details = detailsResponse.data || {};
        const normalizedDetails = type === "Distributor"
          ? details
          : { ...details, businessName: details.pharmacyName };
        const existing = { ...normalizedDetails, ...(existingLocation || {}) };
        setBusinessData({ ...emptyState(type, user), ...existing, businessType: type });
        setError("");
      } catch (err) {
        console.error("❌ Failed to load business location:", err.response?.data || err.message);
        if (!mounted) return;
        if (err.response?.status === 401) setError("Your session has expired. Please login again.");
        else setError(err.response?.data?.detail || "Unable to load your business location.");
        setBusinessData(null);
      } finally { if (mounted) setLoading(false); }
    };
    document.title = "Business Location | MEDORAX";
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <VerificationLayout active="Business Info"><div className="flex items-center justify-center h-full"><div className="text-center"><div className="w-12 h-12 border-4 border-[#006B5F] border-t-transparent rounded-full animate-spin mx-auto" /><p className="mt-4 text-slate-600">Loading...</p></div></div></VerificationLayout>;

  return <VerificationLayout active="Business Info"><div className="h-full w-full overflow-hidden">{error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 mx-4">{error}</div>}{businessData && <BusinessLocationLayout businessType={businessType} businessData={businessData} setBusinessData={setBusinessData} />}</div></VerificationLayout>;
}
