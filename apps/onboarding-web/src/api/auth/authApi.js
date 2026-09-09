// src/api/auth/authApi.js
import client from "../client";
import { AUTH_ENDPOINTS } from "./authEndpoints";

export const registerUser = async (data) => {
    try {
        const payload = {
            fullName: data.fullName,
            email: data.email,
            mobileNumber: data.mobileNumber?.startsWith("+")
                ? data.mobileNumber
                : `+91${data.mobileNumber}`,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

        console.log("🚀 Registration payload:", payload);

        const response = await client.post(
            AUTH_ENDPOINTS.REGISTER,
            payload
        );

        console.log("✅ Registration successful:", response.data);
        return response.data;

    } catch (error) {
        console.error("❌ Register error:", error.response?.data);

        throw {
            status: error.response?.status || 500,
            message:
                error.response?.data?.message ||
                error.response?.data?.detail?.[0]?.msg ||
                "Registration failed.",
            errors: error.response?.data?.detail || [],
            data: error.response?.data || {},
        };
    }
};

export const loginUser = async (data) => {
    try {
        console.log("🔐 Logging in with payload:", { email: data.email });
        
        const response = await client.post(
            AUTH_ENDPOINTS.LOGIN,
            data
        );
        
        console.log("✅ Login successful:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Login error details:");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
        console.error("Error message:", error.message);
        
        // Check for network errors
        if (!error.response) {
            console.error("🔴 Network error - No response from server");
            throw {
                status: 0,
                message: "Network error. Please check your connection or try again later.",
                errors: [],
                data: {}
            };
        }
        
        // Extract error message from response
        const errorData = error.response?.data || {};
        let errorMessage = "Invalid email or password. Please try again.";
        
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

        throw {
            status: error.response?.status || 500,
            message: errorMessage,
            errors: errorData.errors || [],
            data: errorData
        };
    }
};

const pendingVerifications = new Map();

export const verifyEmail = async (data) => {
    try {
        const token = data.token?.trim();
        if (!token) {
            throw {
                status: 400,
                message: "Verification token is required",
                data: { message: "Verification token is required" }
            };
        }

        if (pendingVerifications.has(token)) {
            console.log(`⏭️ Verification already in progress for token: ${token}`);
            return pendingVerifications.get(token);
        }

        console.log("🔍 Verifying email with payload:", data);

        const verifyPromise = (async () => {
            try {
                const response = await client.post(
                    AUTH_ENDPOINTS.VERIFY_EMAIL,
                    { token }
                );
                console.log("✅ Verify email response:", response.data);
                return response.data;
            } finally {
                pendingVerifications.delete(token);
            }
        })();

        pendingVerifications.set(token, verifyPromise);
        return await verifyPromise;

    } catch (error) {
        console.error("❌ Verify email error details:");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);

        if (!error.response) {
            throw {
                status: 0,
                message: "Network error - Please check your connection",
                data: { message: "Network error - Please check your connection" }
            };
        }

        const errorData = error.response?.data || {};
        let errorMessage = "Email verification failed.";

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

        console.error("📝 Full error data:", JSON.stringify(errorData, null, 2));

        throw {
            status: error.response?.status || 500,
            message: errorMessage,
            errors: errorData.errors || [],
            data: errorData
        };
    }
};

export const resendVerification = async (data) => {
    try {
        console.log("📧 Resending verification with payload:", data);

        const response = await client.post(
            AUTH_ENDPOINTS.RESEND_EMAIL,
            data
        );

        console.log("✅ Resend response:", response.data);
        return response.data;

    } catch (error) {
        console.error("❌ Resend error details:");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);

        if (!error.response) {
            throw {
                status: 0,
                message: "Network error - Please check your connection",
                data: { message: "Network error - Please check your connection" }
            };
        }

        const errorData = error.response?.data || {};
        let errorMessage = "Failed to resend verification email.";

        if (typeof errorData === 'string') {
            errorMessage = errorData;
        } else if (errorData.message) {
            errorMessage = errorData.message;
        } else if (errorData.Message) {
            errorMessage = errorData.Message;
        } else if (errorData.title) {
            errorMessage = errorData.title;
        }

        throw {
            status: error.response?.status || 500,
            message: errorMessage,
            errors: errorData.errors || [],
            data: errorData
        };
    }
};

export const sendMobileOtp = (data) =>
    client.post(AUTH_ENDPOINTS.SEND_MOBILE_OTP, data);

export const verifyMobileOtp = (data) =>
    client.post(AUTH_ENDPOINTS.VERIFY_MOBILE_OTP, data);

// Add forgot password function
export const forgotPassword = async (data) => {
    try {
        console.log("📧 Sending forgot password request:", { email: data.email });
        
        const response = await client.post(
            AUTH_ENDPOINTS.FORGOT_PASSWORD,
            data
        );
        
        console.log("✅ Forgot password response:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Forgot password error:", error.response?.data);
        throw error.response?.data || {
            message: "Failed to send password reset email."
        };
    }
};

// Add reset password function
export const resetPassword = async (data) => {
    try {
        console.log("🔐 Resetting password with payload:", { token: data.token });
        
        const response = await client.post(
            AUTH_ENDPOINTS.RESET_PASSWORD,
            data
        );
        
        console.log("✅ Reset password response:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("❌ Reset password error:", error.response?.data);
        throw error.response?.data || {
            message: "Failed to reset password."
        };
    }
};