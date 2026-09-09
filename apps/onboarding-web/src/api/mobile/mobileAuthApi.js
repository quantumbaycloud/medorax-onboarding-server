// src/api/mobile/mobileAuthApi.js

import client from "../client";
import { MOBILE_AUTH_ENDPOINTS } from "./mobileAuthEndpoints";

/**
 * Send OTP to mobile number
 * @param {Object} data - Request payload
 * @param {string} data.mobileNumber - Mobile number with country code (e.g., +919876543210)
 * @returns {Promise} API response
 */
export const sendMobileOtp = async (data) => {
    try {
        console.log("📱 Sending mobile OTP with payload:", data);
        
        const response = await client.post(
            MOBILE_AUTH_ENDPOINTS.SEND_MOBILE_OTP,
            data
        );
        
        console.log("✅ Mobile OTP sent successfully:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Send mobile OTP error:");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message ||
                    error.response?.data?.title ||
                    "Failed to send OTP. Please try again.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};

/**
 * Verify mobile OTP
 * @param {Object} data - Request payload
 * @param {string} data.mobileNumber - Mobile number with country code
 * @param {string} data.sessionId - Session ID from send OTP response
 * @param {string} data.otp - 6-digit OTP
 * @returns {Promise} API response
 */
export const verifyMobileOtp = async (data) => {
    try {
        console.log("🔍 Verifying mobile OTP with payload:", data);
        
        const response = await client.post(
            MOBILE_AUTH_ENDPOINTS.VERIFY_MOBILE_OTP,
            data
        );
        
        console.log("✅ Mobile OTP verified successfully:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Verify mobile OTP error:");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message ||
                    error.response?.data?.title ||
                    "Invalid OTP. Please try again.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};

/**
 * Resend mobile OTP
 * @param {Object} data - Request payload
 * @param {string} data.mobileNumber - Mobile number with country code
 * @returns {Promise} API response
 */
export const resendMobileOtp = async (data) => {
    try {
        console.log("📱 Resending mobile OTP with payload:", data);
        
        const response = await client.post(
            MOBILE_AUTH_ENDPOINTS.SEND_MOBILE_OTP,
            data
        );
        
        console.log("✅ Mobile OTP resent successfully:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Resend mobile OTP error:");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message ||
                    error.response?.data?.title ||
                    "Failed to resend OTP. Please try again.",
            errors: error.response?.data?.errors || [],
            data: error.response?.data || {}
        };
    }
};