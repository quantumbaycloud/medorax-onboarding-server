// src/api/onboarding/businessTypeApi.js

import client from "../client";
import { ONBOARDING_ENDPOINTS } from "./onboardingEndpoints";
import toast from "react-hot-toast";

/**
 * Select business type for the current user
 * @param {Object} data - Business type selection data
 * @param {number} data.businessType - Business type (0 = Pharmacy, 1 = Distributor)
 * @returns {Promise} API response
 */
export const selectBusinessType = async (data) => {
    try {
        console.log("📤 Selecting business type:", data);
        
        const response = await client.post(
            ONBOARDING_ENDPOINTS.SELECT_BUSINESS_TYPE,
            data
        );
        
        console.log("✅ Business type selected successfully:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Business type selection error:", error.response?.data);
        
        // Check if it's a network error
        if (!error.response) {
            throw {
                status: 0,
                message: "Network error. Please check your connection or try again later.",
                errors: [],
                data: {}
            };
        }
        
        // Extract error message from response
        const errorData = error.response?.data || {};
        let errorMessage = "Failed to select business type. Please try again.";
        
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
        
        // Handle specific status codes
        if (error.response?.status === 401) {
            errorMessage = "Your session has expired. Please login again.";
            // Optionally redirect to login
            // window.location.href = '/login';
        } else if (error.response?.status === 403) {
            errorMessage = "You don't have permission to perform this action.";
        } else if (error.response?.status === 404) {
            errorMessage = "User not found. Please login again.";
        } else if (error.response?.status === 400) {
            errorMessage = errorMessage || "Invalid business type selected.";
        } else if (error.response?.status === 500) {
            errorMessage = "Server error. Please try again later.";
        }
        
        throw {
            status: error.response?.status || 500,
            message: errorMessage,
            errors: errorData.errors || [],
            data: errorData
        };
    }
};

/**
 * Get current user's business type
 * @returns {Promise} API response with business type
 */
export const getBusinessType = async () => {
    try {
        console.log("📤 Fetching business type...");
        
        const response = await client.get(
            ONBOARDING_ENDPOINTS.SELECT_BUSINESS_TYPE
        );
        
        console.log("✅ Business type fetched successfully:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Failed to fetch business type:", error.response?.data);
        
        if (!error.response) {
            throw {
                status: 0,
                message: "Network error. Please check your connection.",
                errors: [],
                data: {}
            };
        }
        
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to fetch business type.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};

// Business type constants
export const BUSINESS_TYPES = {
    PHARMACY: 0,
    DISTRIBUTOR: 1,
};

export const BUSINESS_TYPE_NAMES = {
    0: "Pharmacy",
    1: "Distributor",
};

export const BUSINESS_TYPE_LABELS = {
    [BUSINESS_TYPES.PHARMACY]: "Pharmacy",
    [BUSINESS_TYPES.DISTRIBUTOR]: "Distributor",
};