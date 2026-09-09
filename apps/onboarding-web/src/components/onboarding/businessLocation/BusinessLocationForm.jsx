// BusinessLocationForm.jsx - Updated error handling

import DistributorFields from "./DistributorFields";
import PharmacyFields from "./PharmacyFields";
import AddressTextarea from "./AddressTextarea";
import GeoCoordinatesCard from "./GeoCoordinatesCard";
import CurrentLocationButton from "./CurrentLocationButton";
import LocationInfoCard from "./LocationInfoCard";
import ContactFields from "./ContactFields";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
// IMPORT THE API FUNCTIONS
import { 
    submitPharmacyDetails, 
    submitDistributorDetails,
    formatBusinessDataForAPI 
} from "../../../api/onboarding/onboardingApi";
import { saveLocation, updateLocation } from "../../../api/onboarding/locationApi";

export default function BusinessLocationForm({
  businessType,
  businessData,
  setBusinessData,
  onBack,
  onContinue,
  isMobile = false,
  onShowMap,
}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleContinue = async () => {
  // Validate required fields based on business type
  let requiredFields = [];

  if (businessType === "Distributor") {
    requiredFields = [
      { key: "companyName", label: "Company Name" },
      { key: "gstNumber", label: "GST Number" },
      { key: "drugLicenseNumber", label: "Drug License Number" },
      { key: "drugLicenseExpiryDate", label: "Drug License Expiry Date" },
      { key: "panNumber", label: "PAN Number" },
      { key: "distributorRegistrationNumber", label: "Distributor Registration Number" },
      { key: "contactPerson", label: "Contact Person" },
      { key: "contactNumber", label: "Contact Number" },
      { key: "email", label: "Email Address" },
      { key: "formattedAddress", label: "Business Address" },
      { key: "latitude", label: "Latitude" },
      { key: "longitude", label: "Longitude" },
    ];
  } else {
    requiredFields = [
      { key: "businessName", label: "Pharmacy Name" },
      { key: "gstNumber", label: "GST Number" },
      { key: "drugLicenseNumber", label: "Drug License Number" },
      { key: "drugLicenseExpiryDate", label: "Drug License Expiry Date" },
      { key: "panNumber", label: "PAN Number" },
      { key: "pharmacyRegistrationNumber", label: "Pharmacy Registration Number" },
      { key: "contactPerson", label: "Contact Person" },
      { key: "contactNumber", label: "Contact Number" },
      { key: "email", label: "Email Address" },
      { key: "formattedAddress", label: "Business Address" },
      { key: "latitude", label: "Latitude" },
      { key: "longitude", label: "Longitude" },
    ];
  }

  for (const field of requiredFields) {
    const value = businessData?.[field.key];
    if (value === undefined || value === null || value === "" || (typeof value === "string" && value.trim() === "")) {
      alert(`Please enter ${field.label}.`);
      return;
    }
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(businessData.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate phone
  const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
  if (!phoneRegex.test(businessData.contactNumber)) {
    alert("Please enter a valid contact number (10-15 digits).");
    return;
  }

  // Validate drug license expiry
  if (businessData.drugLicenseExpiryDate) {
    const expiryDate = new Date(businessData.drugLicenseExpiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (expiryDate < today) {
      alert("Drug license expiry date cannot be in the past.");
      return;
    }
  }

  // Validate GST
  if (businessData.gstNumber && businessData.gstNumber.trim() !== "") {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!gstRegex.test(businessData.gstNumber.trim())) {
      alert("Please enter a valid GST number (e.g., 22AAAAA0000A1Z5).");
      return;
    }
  }

  // Validate PAN
  if (businessData.panNumber && businessData.panNumber.trim() !== "") {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(businessData.panNumber.trim())) {
      alert("Please enter a valid PAN number (e.g., AAAAA1234X).");
      return;
    }
  }

  setIsSubmitting(true);
  setError(null);
  setValidationErrors([]);

  try {
    // Format data for API
    const formattedData = formatBusinessDataForAPI(businessData, businessType);
    console.log("📤 Formatted data for API:", formattedData);

    let response;
    if (businessType === "Distributor") {
      response = await submitDistributorDetails(formattedData);
    } else {
      response = await submitPharmacyDetails(formattedData);
    }
    console.log("✅ Business details saved:", response);

    // Persist the Google Maps-selected address/coordinates in BusinessLocation too.
    const locationPayload = {
      locationType: 0,
      warehouseName: businessType === "Distributor"
        ? (businessData.companyName || "")
        : (businessData.businessName || ""),
      contactPerson: businessData.contactPerson,
      contactNumber: businessData.contactNumber,
      latitude: Number(businessData.latitude),
      longitude: Number(businessData.longitude),
      accuracy: businessData.accuracy == null ? null : Number(businessData.accuracy),
      formattedAddress: businessData.formattedAddress,
      addressLine1: businessData.addressLine1 || businessData.formattedAddress,
      addressLine2: businessData.addressLine2 || null,
      city: businessData.city || null,
      state: businessData.state || null,
      country: businessData.country || null,
      pincode: businessData.pincode || null,
      isPrimary: true,
    };

    const savedLocation = businessData.id
      ? await updateLocation(businessData.id, locationPayload)
      : await saveLocation(locationPayload);

    setBusinessData((prev) => ({ ...prev, ...savedLocation }));
    console.log("✅ Location saved:", savedLocation);
    navigate("/documents");

  } catch (error) {
    console.error("❌ Error submitting form:", error);
    
    let errorMessage = error.message || "Failed to save business information. Please try again.";
    let errorsList = error.errors || [];
    
    if (error.status === 401) {
      errorMessage = "Your session has expired. Please login again.";
      navigate("/login", { replace: true });
    } else if (error.status === 400) {
      if (errorsList && Object.keys(errorsList).length > 0) {
        const errorMessages = [];
        for (const [field, messages] of Object.entries(errorsList)) {
          if (Array.isArray(messages)) {
            errorMessages.push(`${field}: ${messages.join(', ')}`);
          } else {
            errorMessages.push(`${field}: ${messages}`);
          }
        }
        errorMessage = errorMessages.join(". ");
        setValidationErrors(errorMessages);
      } else {
        errorMessage = error.message || "Please check your inputs and try again.";
      }
    } else if (error.status === 500) {
      errorMessage = "Server error. Please try again later.";
    }
    
    setError(errorMessage);
    
    if (validationErrors.length > 0) {
      alert(`Validation Errors:\n${validationErrors.join('\n')}`);
    } else if (error.status !== 401) {
      alert(`Error: ${errorMessage}`);
    }
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBusinessData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTimeChange = (e) => {
  const { name, value } = e.target;
  // Store time in HH:mm:ss.000Z format for backend
  if (value) {
    // Format: HH:mm:ss.000Z (e.g., "09:00:00.000Z")
    const formattedTime = value + ':00.000Z';
    setBusinessData((prev) => ({
      ...prev,
      [name]: formattedTime,
    }));
  } else {
    setBusinessData((prev) => ({
      ...prev,
      [name]: null,
    }));
  }
  };

  // Helper function to format time for display
  // Helper function to format time for display
  // Helper function to format time for display
  const formatTimeForDisplay = (timeValue) => {
    if (!timeValue) return "";
    try {
      let timeStr = timeValue;
      // If it has milliseconds (HH:mm:ss.000Z), remove the .000Z part
      if (timeStr.includes('.')) {
        timeStr = timeStr.split('.')[0];
      }
      // If it has Z at the end, remove it
      if (timeStr.includes('Z')) {
        timeStr = timeStr.replace('Z', '');
      }
      // Return HH:mm
      if (timeStr.includes(':')) {
        const parts = timeStr.split(':');
        if (parts.length >= 2) {
          return `${parts[0]}:${parts[1]}`;
        }
      }
      return timeStr.slice(0, 5);
    } catch {
      return "";
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Validation Errors List */}
      {validationErrors.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl">
          <p className="font-semibold mb-1">Please fix the following errors:</p>
          <ul className="list-disc pl-5 text-sm">
            {validationErrors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile: Show map button */}
      {isMobile && onShowMap && (
        <button
          onClick={onShowMap}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <MapPin size={18} />
          Open Map to Select Location
        </button>
      )}

      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {businessType === "Distributor"
            ? "Distributor Information"
            : "Pharmacy Information"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Complete your business information and verify the location.
        </p>
      </div>

      {/* Business Information */}
      {businessType === "Distributor" ? (
        <DistributorFields
          businessData={businessData}
          setBusinessData={setBusinessData}
          isMobile={isMobile}
        />
      ) : (
        <PharmacyFields
          businessData={businessData}
          setBusinessData={setBusinessData}
          isMobile={isMobile}
        />
      )}

      {/* Common Fields for both types */}
      {/* GST Number */}
      <div>
        <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
          GST Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="gstNumber"
          value={businessData.gstNumber || ""}
          onChange={handleChange}
          placeholder="22AAAAA0000A1Z5"
          className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base uppercase"
        />
        <p className="mt-1 text-xs text-slate-500">Format: 22AAAAA0000A1Z5 (15 characters)</p>
      </div>

      {/* PAN Number */}
      <div>
        <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
          PAN Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="panNumber"
          value={businessData.panNumber || ""}
          onChange={handleChange}
          placeholder="AAAAA1234X"
          className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base uppercase"
        />
        <p className="mt-1 text-xs text-slate-500">Format: AAAAA1234X (10 characters)</p>
      </div>

      {/* Drug License Number */}
      <div>
        <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
          Drug License Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="drugLicenseNumber"
          value={businessData.drugLicenseNumber || ""}
          onChange={handleChange}
          placeholder="Enter Drug License Number"
          className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
        />
      </div>

      {/* Drug License Expiry Date */}
      <div>
        <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
          Drug License Expiry Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="drugLicenseExpiryDate"
          value={businessData.drugLicenseExpiryDate?.split('T')[0] || ""}
          onChange={handleChange}
          className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
        />
      </div>

      {/* Distributor Specific Fields */}
      {businessType === "Distributor" && (
        <>
          {/* Service Cities */}
          <div>
            <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
              Service Cities
            </label>
            <input
              type="text"
              name="serviceCitiesInput"
              value={businessData.serviceCitiesInput || ""}
              onChange={(e) => {
                const cities = e.target.value.split(',').map(city => city.trim());
                setBusinessData((prev) => ({
                  ...prev,
                  serviceCitiesInput: e.target.value,
                  serviceCities: cities.filter(city => city !== ''),
                }));
              }}
              placeholder="Mumbai, Delhi, Bangalore"
              className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
            />
            <p className="mt-1 text-xs text-slate-500">Separate cities with commas</p>
          </div>

          {/* Minimum Order Value */}
          <div>
            <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
              Minimum Order Value (₹)
            </label>
            <input
              type="number"
              name="minimumOrderValue"
              value={businessData.minimumOrderValue || ""}
              onChange={handleChange}
              placeholder="0"
              className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
            />
          </div>

          {/* Credit Options */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isCreditAvailable"
              checked={businessData.isCreditAvailable || false}
              onChange={handleChange}
              className="w-5 h-5 rounded accent-[#006B5F] cursor-pointer"
            />
            <label className="text-sm font-medium text-slate-700 cursor-pointer">
              Credit Available
            </label>
          </div>

          {businessData.isCreditAvailable && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
                    Credit Days
                  </label>
                  <input
                    type="number"
                    name="creditDays"
                    value={businessData.creditDays || ""}
                    onChange={handleChange}
                    placeholder="30"
                    className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
                    Max Credit Limit (₹)
                  </label>
                  <input
                    type="number"
                    name="maximumCreditLimit"
                    value={businessData.maximumCreditLimit || ""}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
                  />
                </div>
              </div>
            </>
          )}

          {/* Delivery Options */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="hasOwnDelivery"
              checked={businessData.hasOwnDelivery || false}
              onChange={handleChange}
              className="w-5 h-5 rounded accent-[#006B5F] cursor-pointer"
            />
            <label className="text-sm font-medium text-slate-700 cursor-pointer">
              Has Own Delivery Fleet
            </label>
          </div>

          {businessData.hasOwnDelivery && (
            <div>
              <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
                Delivery Vehicle Types
              </label>
              <input
                type="text"
                name="deliveryVehicleTypesInput"
                value={businessData.deliveryVehicleTypesInput || ""}
                onChange={(e) => {
                  const vehicles = e.target.value.split(',').map(v => v.trim());
                  setBusinessData((prev) => ({
                    ...prev,
                    deliveryVehicleTypesInput: e.target.value,
                    deliveryVehicleTypes: vehicles.filter(v => v !== ''),
                  }));
                }}
                placeholder="Bike, Van, Truck"
                className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
              />
              <p className="mt-1 text-xs text-slate-500">Separate vehicle types with commas</p>
            </div>
          )}

          {/* Warehouse Timings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
                Warehouse Open Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="time"
                  name="warehouseOpenTime"
                  value={formatTimeForDisplay(businessData.warehouseOpenTime)}
                  onChange={handleTimeChange}
                  className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 pl-10 pr-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
                Warehouse Close Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="time"
                  name="warehouseCloseTime"
                  value={formatTimeForDisplay(businessData.warehouseCloseTime)}
                  onChange={handleTimeChange}
                  className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 pl-10 pr-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* 24x7 Operation */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is24x7"
              checked={businessData.is24x7 || false}
              onChange={handleChange}
              className="w-5 h-5 rounded accent-[#006B5F] cursor-pointer"
            />
            <label className="text-sm font-medium text-slate-700 cursor-pointer">
              24x7 Warehouse (Open All Day)
            </label>
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
              Emergency Contact Number
            </label>
            <div className="relative">
              <input
                type="tel"
                name="emergencyContactNumber"
                value={businessData.emergencyContactNumber || ""}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <AlertCircle size={16} className="text-slate-400" />
              </div>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              For emergency deliveries or urgent inquiries
            </p>
          </div>
        </>
      )}

      {/* Pharmacy Fields (Additional) */}
      {businessType === "Pharmacy" && (
        <>
          {/* Store Open Time */}
          <div>
            <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
              Store Open Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="time"
                name="storeOpenTime"
                value={formatTimeForDisplay(businessData.storeOpenTime)}
                onChange={handleTimeChange}
                className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 pl-10 pr-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Store Close Time */}
          <div>
            <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
              Store Close Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="time"
                name="storeCloseTime"
                value={formatTimeForDisplay(businessData.storeCloseTime)}
                onChange={handleTimeChange}
                className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 pl-10 pr-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* 24x7 Operation */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is24x7"
              checked={businessData.is24x7 || false}
              onChange={handleChange}
              className="w-5 h-5 rounded accent-[#006B5F] cursor-pointer"
            />
            <label className="text-sm font-medium text-slate-700 cursor-pointer">
              24x7 Pharmacy (Open All Day)
            </label>
          </div>

          {/* Emergency Contact Number */}
          <div>
            <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
              Emergency Contact Number
            </label>
            <div className="relative">
              <input
                type="tel"
                name="emergencyContactNumber"
                value={businessData.emergencyContactNumber || ""}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <AlertCircle size={16} className="text-slate-400" />
              </div>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              For emergency deliveries or urgent inquiries
            </p>
          </div>
        </>
      )}

      {/* Contact Fields */}
      <ContactFields
        locationData={businessData}
        setLocationData={setBusinessData}
        isMobile={isMobile}
      />

      {/* Email Address */}
      <div>
        <label className="block text-xs uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-slate-500 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={businessData.email || ""}
            onChange={handleChange}
            placeholder="Enter Email Address"
            className="w-full h-11 sm:h-12 rounded-xl bg-slate-100 px-4 border border-transparent outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Address */}
      <AddressTextarea
        value={businessData?.formattedAddress || ""}
        setBusinessData={setBusinessData}
        isMobile={isMobile}
      />

      {/* Coordinates */}
      <GeoCoordinatesCard businessData={businessData} isMobile={isMobile} />

      {/* Current Location */}
      <CurrentLocationButton setLocationData={setBusinessData} isMobile={isMobile} />

      {/* Navigation */}
      <div className="flex gap-3 sm:gap-4 pt-3 sm:pt-4">
        <button
          type="button"
          onClick={onBack || (() => navigate(-1))}
          disabled={isSubmitting}
          className="flex-1 rounded-xl border border-slate-300 bg-white py-2.5 sm:py-3 font-semibold text-slate-700 transition hover:bg-slate-50 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={isSubmitting}
          className="flex-[2] rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] py-2.5 sm:py-3 font-semibold text-white shadow-md transition hover:opacity-95 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Confirm & Continue"
          )}
        </button>
      </div>

      {/* Why is location important? */}
      <LocationInfoCard isMobile={isMobile} />
    </div>
  );
} 