// src/api/onboarding/onboardingApi.js

import client from "../client";
import { ONBOARDING_ENDPOINTS } from "./onboardingEndpoints";

/**
 * Submit pharmacy details
 * @param {Object} data - Pharmacy business details
 * @returns {Promise} API response
 */
export const submitPharmacyDetails = async (data) => {
    try {
        console.log("📤 Submitting pharmacy details:", data);
        
        const response = await client.post(
            ONBOARDING_ENDPOINTS.PHARMACY_DETAILS,
            data
        );
        
        console.log("✅ Pharmacy details submitted successfully:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Pharmacy details submission error:", error.response?.data);
        
        if (!error.response) {
            throw {
                status: 0,
                message: "Network error. Please check your connection.",
                errors: [],
                data: {}
            };
        }
        
        const errorData = error.response?.data || {};
        let errorMessage = "Failed to submit pharmacy details. Please try again.";
        
        if (typeof errorData === 'string') {
            errorMessage = errorData;
        } else if (errorData.message) {
            errorMessage = errorData.message;
        } else if (errorData.Message) {
            errorMessage = errorData.Message;
        } else if (errorData.title) {
            errorMessage = errorData.title;
        } else if (errorData.error) {
            errorMessage = errorData.error;
        } else if (errorData.errors) {
            const validationErrors = Object.values(errorData.errors).flat();
            errorMessage = validationErrors.join(". ");
        }
        
        if (error.response?.status === 401) {
            errorMessage = "Your session has expired. Please login again.";
        }
        
        throw {
            status: error.response?.status || 500,
            message: errorMessage,
            errors: errorData.errors || [],
            data: errorData
        };
    }
};

// Re-export distributor functions
export { 
    submitDistributorDetails,
    getDistributorDetails,
    updateDistributorDetails
} from "./distributorApi";

/**
 * Utility function to format business data for API based on business type
 * @param {Object} businessData - Raw business data from form
 * @param {string} businessType - 'Distributor' or 'Pharmacy'
 * @returns {Object} Formatted data for API
 */
export const formatBusinessDataForAPI = (businessData, businessType) => {
    if (businessType === "Distributor") {
        return formatDistributorDataForAPI(businessData);
    } else {
        return formatPharmacyDataForAPI(businessData);
    }
};

/**
 * Format pharmacy data for API
 * @param {Object} data - Raw pharmacy data
 * @returns {Object} Formatted pharmacy data
 */
const formatPharmacyDataForAPI = (data) => {
    const formattedData = {
        pharmacyName: data.businessName || data.pharmacyName || "",
        contactPerson: data.contactPerson || "",
        contactNumber: data.contactNumber || "",
        email: data.email || "",
        formattedAddress: data.formattedAddress || "",
        latitude: parseFloat(data.latitude) || 0,
        longitude: parseFloat(data.longitude) || 0,
    };

    // Optional fields
    if (data.gstNumber) formattedData.gstNumber = data.gstNumber;
    if (data.panNumber) formattedData.panNumber = data.panNumber;
    if (data.drugLicenseNumber) {
        formattedData.drugLicenseNumber = data.drugLicenseNumber;
    }
    if (data.pharmacyRegistrationNumber) {
        formattedData.pharmacyRegistrationNumber = data.pharmacyRegistrationNumber;
    }

    // Drug license expiry date
    if (data.drugLicenseExpiryDate) {
        const expiryDate = new Date(data.drugLicenseExpiryDate);
        if (!isNaN(expiryDate.getTime())) {
            formattedData.drugLicenseExpiryDate = expiryDate.toISOString().split('T')[0];
        }
    }

    // Store timings - format as TimeOnly (HH:mm:ss)
    if (data.storeOpenTime) {
        formattedData.storeOpenTime = formatTimeToTimeOnly(data.storeOpenTime);
    }
    if (data.storeCloseTime) {
        formattedData.storeCloseTime = formatTimeToTimeOnly(data.storeCloseTime);
    }

    // 24x7 flag
    if (data.is24x7 !== undefined && data.is24x7 !== null) {
        formattedData.is24x7 = Boolean(data.is24x7);
    }

    // Emergency contact
    if (data.emergencyContactNumber) {
        formattedData.emergencyContactNumber = data.emergencyContactNumber;
    }

    // Remove undefined values
    Object.keys(formattedData).forEach(key => {
        if (formattedData[key] === undefined || formattedData[key] === null || formattedData[key] === "") {
            delete formattedData[key];
        }
    });

    return formattedData;
};

/**
 * Format distributor data for API
 * @param {Object} data - Raw distributor data
 * @returns {Object} Formatted distributor data
 */
const formatDistributorDataForAPI = (data) => {
    const formattedData = {
        companyName: data.companyName || data.businessName || "",
        contactPerson: data.contactPerson || "",
        contactNumber: data.contactNumber || "",
        email: data.email || "",
        formattedAddress: data.formattedAddress || "",
        latitude: parseFloat(data.latitude) || 0,
        longitude: parseFloat(data.longitude) || 0,
    };

    // Optional fields - only add if they have valid values
    if (data.gstNumber && data.gstNumber.trim() !== "") {
        formattedData.gstNumber = data.gstNumber.trim();
    }
    
    if (data.panNumber && data.panNumber.trim() !== "") {
        formattedData.panNumber = data.panNumber.trim();
    }
    
    if (data.drugLicenseNumber && data.drugLicenseNumber.trim() !== "") {
        formattedData.drugLicenseNumber = data.drugLicenseNumber.trim();
    }
    
    if (data.distributorRegistrationNumber && data.distributorRegistrationNumber.trim() !== "") {
        formattedData.distributorRegistrationNumber = data.distributorRegistrationNumber.trim();
    }

    // Drug license expiry date
    if (data.drugLicenseExpiryDate) {
        const expiryDate = new Date(data.drugLicenseExpiryDate);
        if (!isNaN(expiryDate.getTime())) {
            formattedData.drugLicenseExpiryDate = expiryDate.toISOString().split('T')[0];
        }
    }

    // Service cities - convert comma-separated string to array
    if (data.serviceCities && Array.isArray(data.serviceCities) && data.serviceCities.length > 0) {
        formattedData.serviceCities = data.serviceCities.filter(city => city && city.trim() !== '');
    } else if (data.serviceCitiesInput && data.serviceCitiesInput.trim() !== "") {
        const cities = data.serviceCitiesInput.split(',').map(city => city.trim()).filter(city => city !== '');
        if (cities.length > 0) {
            formattedData.serviceCities = cities;
        }
    }

    // Minimum order value
    if (data.minimumOrderValue !== undefined && data.minimumOrderValue !== null && data.minimumOrderValue !== '') {
        const value = parseFloat(data.minimumOrderValue);
        if (!isNaN(value) && value >= 0) {
            formattedData.minimumOrderValue = value;
        }
    }

    // Credit options
    if (data.isCreditAvailable !== undefined && data.isCreditAvailable !== null) {
        formattedData.isCreditAvailable = Boolean(data.isCreditAvailable);
        if (data.isCreditAvailable) {
            if (data.creditDays !== undefined && data.creditDays !== null && data.creditDays !== '') {
                const days = parseInt(data.creditDays);
                if (!isNaN(days) && days >= 0) {
                    formattedData.creditDays = days;
                }
            }
            if (data.maximumCreditLimit !== undefined && data.maximumCreditLimit !== null && data.maximumCreditLimit !== '') {
                const limit = parseFloat(data.maximumCreditLimit);
                if (!isNaN(limit) && limit >= 0) {
                    formattedData.maximumCreditLimit = limit;
                }
            }
        }
    }

    // Delivery options
    if (data.hasOwnDelivery !== undefined && data.hasOwnDelivery !== null) {
        formattedData.hasOwnDelivery = Boolean(data.hasOwnDelivery);
        if (data.hasOwnDelivery) {
            if (data.deliveryVehicleTypes && Array.isArray(data.deliveryVehicleTypes) && data.deliveryVehicleTypes.length > 0) {
                formattedData.deliveryVehicleTypes = data.deliveryVehicleTypes.filter(v => v && v.trim() !== '');
            } else if (data.deliveryVehicleTypesInput && data.deliveryVehicleTypesInput.trim() !== "") {
                const vehicles = data.deliveryVehicleTypesInput.split(',').map(v => v.trim()).filter(v => v !== '');
                if (vehicles.length > 0) {
                    formattedData.deliveryVehicleTypes = vehicles;
                }
            }
        }
    }

    // Warehouse timings - format as TimeOnly (HH:mm:ss)
    if (data.warehouseOpenTime) {
        formattedData.warehouseOpenTime = formatTimeToTimeOnly(data.warehouseOpenTime);
    }
    if (data.warehouseCloseTime) {
        formattedData.warehouseCloseTime = formatTimeToTimeOnly(data.warehouseCloseTime);
    }

    // 24x7 flag
    if (data.is24x7 !== undefined && data.is24x7 !== null) {
        formattedData.is24x7 = Boolean(data.is24x7);
    }

    // Emergency contact
    if (data.emergencyContactNumber && data.emergencyContactNumber.trim() !== "") {
        formattedData.emergencyContactNumber = data.emergencyContactNumber.trim();
    }

    // Remove undefined, null, or empty values
    Object.keys(formattedData).forEach(key => {
        const value = formattedData[key];
        if (
            value === undefined || 
            value === null || 
            value === "" || 
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'string' && value.trim() === '')
        ) {
            delete formattedData[key];
        }
    });

    return formattedData;
};

/**
 * Format time to TimeOnly format (HH:mm:ss) for backend
 * @param {string} time - Time string (could be "09:00", ISO string, or already formatted)
 * @returns {string|null} TimeOnly formatted time (HH:mm:ss) or null
 */
const formatTimeToTimeOnly = (time) => {
    if (!time) return null;
    
    // If it's already in HH:mm:ss format
    if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
        return time;
    }
    
    // If it's in HH:mm format
    if (/^\d{2}:\d{2}$/.test(time)) {
        return `${time}:00`;
    }
    
    // If it's an ISO string with 'T'
    if (time.includes('T')) {
        try {
            const date = new Date(time);
            if (!isNaN(date.getTime())) {
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                return `${hours}:${minutes}:${seconds}`;
            }
        } catch {
            // Fall through to next check
        }
    }
    
    // If it's a simple time string with colon
    if (time.includes(':')) {
        const parts = time.split(':');
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parts.length > 2 ? parseInt(parts[2]) : 0;
        
        if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
            const secs = !isNaN(seconds) && seconds >= 0 && seconds <= 59 ? seconds : 0;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
    }
    
    return null;
};

/**
 * Utility function to format time to ISO format (for pharmacy)
 * @param {string} time - Time string
 * @returns {string|null} ISO formatted time or null
 */
const formatTimeToISO = (time) => {
    if (!time) return null;
    
    // If it's already an ISO string with 'T', return as is
    if (time.includes('T')) {
        return time;
    }
    
    // If it's a simple time string like "09:00"
    if (time.includes(':')) {
        const parts = time.split(':');
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        
        if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date.toISOString();
        }
    }
    
    return null;
};

/**
 * Get pharmacy details by ID
 */
export const getPharmacyDetails = async (id) => {
    try {
        const response = await client.get(
            `${ONBOARDING_ENDPOINTS.PHARMACY_DETAILS}/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch pharmacy details:", error.response?.data);
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to fetch pharmacy details.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};

/**
 * Update pharmacy details
 */
export const updatePharmacyDetails = async (id, data) => {
    try {
        console.log("📤 Updating pharmacy details:", data);
        const response = await client.put(
            `${ONBOARDING_ENDPOINTS.PHARMACY_DETAILS}/${id}`,
            data
        );
        console.log("✅ Pharmacy details updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Pharmacy details update error:", error.response?.data);
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to update pharmacy details.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};

/**
 * Upload documents
 */
export const uploadDocuments = async (formData) => {
    try {
        console.log("📤 Uploading documents...");
        const response = await client.post(
            ONBOARDING_ENDPOINTS.UPLOAD_DOCUMENTS,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log("✅ Documents uploaded successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Document upload error:", error.response?.data);
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to upload documents.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};

/**
 * Verify business
 */
export const verifyBusiness = async (data) => {
    try {
        console.log("🔍 Verifying business:", data);
        const response = await client.post(
            ONBOARDING_ENDPOINTS.VERIFY_BUSINESS,
            data
        );
        console.log("✅ Business verified successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Business verification error:", error.response?.data);
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to verify business.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};

/**
 * Get business onboarding status
 */
export const getBusinessStatus = async () => {
    try {
        const response = await client.get(
            ONBOARDING_ENDPOINTS.BUSINESS_STATUS
        );
        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch business status:", error.response?.data);
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to fetch business status.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};