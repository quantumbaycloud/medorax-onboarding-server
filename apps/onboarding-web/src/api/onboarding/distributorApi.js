// src/api/onboarding/distributorApi.js

import client from "../client";
import { ONBOARDING_ENDPOINTS } from "./onboardingEndpoints";

/**
 * Submit distributor details
 * @param {Object} data - Distributor business details
 * @returns {Promise} API response
 */
export const submitDistributorDetails = async (data) => {
    try {
        console.log("📤 Submitting distributor details:", data);
        
        const response = await client.post(
            ONBOARDING_ENDPOINTS.DISTRIBUTOR_DETAILS,
            data
        );
        
        console.log("✅ Distributor details submitted successfully:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Distributor details submission error:", error.response?.data);
        
        // Check for network errors
        if (!error.response) {
            throw {
                status: 0,
                message: "Network error. Please check your connection or try again later.",
                errors: [],
                data: {}
            };
        }
        
        // Get the full error response
        const errorData = error.response?.data || {};
        console.log("🔍 Full error response:", JSON.stringify(errorData, null, 2));
        
        let errorMessage = "Failed to submit distributor details. Please try again.";
        let validationErrors = [];
        
        // Try to extract validation errors
        if (errorData.errors) {
            validationErrors = errorData.errors;
            // Check if errors is an object with field names
            if (typeof errorData.errors === 'object') {
                const errorMessages = [];
                for (const [field, messages] of Object.entries(errorData.errors)) {
                    if (Array.isArray(messages)) {
                        errorMessages.push(`${field}: ${messages.join(', ')}`);
                    } else if (typeof messages === 'string') {
                        errorMessages.push(`${field}: ${messages}`);
                    } else {
                        errorMessages.push(JSON.stringify(messages));
                    }
                }
                if (errorMessages.length > 0) {
                    errorMessage = errorMessages.join(". ");
                    console.log("📝 Validation Errors:", errorMessages);
                }
            } else if (Array.isArray(errorData.errors)) {
                errorMessage = errorData.errors.join(". ");
            }
        } else if (errorData.message) {
            errorMessage = errorData.message;
        } else if (errorData.Message) {
            errorMessage = errorData.Message;
        } else if (errorData.title) {
            errorMessage = errorData.title;
        } else if (errorData.error) {
            errorMessage = errorData.error;
        }
        
        // Handle specific status codes
        if (error.response?.status === 401) {
            errorMessage = "Your session has expired. Please login again.";
        } else if (error.response?.status === 403) {
            errorMessage = "You don't have permission to perform this action.";
        } else if (error.response?.status === 404) {
            errorMessage = "User not found. Please login again.";
        } else if (error.response?.status === 400) {
            // Log the specific validation errors
            console.error("🔍 Validation Error Details:", JSON.stringify(errorData, null, 2));
            if (errorMessage === "Failed to submit distributor details. Please try again.") {
                errorMessage = "Invalid data submitted. Please check all fields and try again.";
            }
        } else if (error.response?.status === 500) {
            errorMessage = "Server error. Please try again later.";
        }
        
        throw {
            status: error.response?.status || 500,
            message: errorMessage,
            errors: validationErrors,
            data: errorData
        };
    }
};

/**
 * Get distributor details
 * @param {string} id - Distributor ID
 * @returns {Promise} API response
 */
export const getDistributorDetails = async (id) => {
    try {
        const response = await client.get(
            `${ONBOARDING_ENDPOINTS.DISTRIBUTOR_DETAILS}/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch distributor details:", error.response?.data);
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to fetch distributor details.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};

/**
 * Update distributor details
 * @param {string} id - Distributor ID
 * @param {Object} data - Updated distributor details
 * @returns {Promise} API response
 */
export const updateDistributorDetails = async (id, data) => {
    try {
        console.log("📤 Updating distributor details:", data);
        const response = await client.put(
            `${ONBOARDING_ENDPOINTS.DISTRIBUTOR_DETAILS}/${id}`,
            data
        );
        console.log("✅ Distributor details updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Distributor details update error:", error.response?.data);
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message || "Failed to update distributor details.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};