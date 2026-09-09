// src/hooks/useMobileVerification.js

import { useState, useCallback } from 'react';
import {
    sendMobileOtp,
    verifyMobileOtp,
    resendMobileOtp
} from '../api/mobile/mobileAuthApi';

export const useMobileVerification = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [verificationData, setVerificationData] = useState(null);

    // =====================================================
    // SEND OTP
    // =====================================================
    const sendOTP = useCallback(async (mobileNumber) => {
        setLoading(true);
        setError(null);
        setOtpSent(false);

        try {
            const response = await sendMobileOtp({
                mobileNumber
            });

            setOtpSent(true);
            setVerificationData(response);

            return response;

        } catch (err) {
            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to send OTP";

            setError(message);
            throw new Error(message);

        } finally {
            setLoading(false);
        }
    }, []);

    // =====================================================
    // VERIFY OTP
    // =====================================================
    const verifyOTP = useCallback(async (mobileNumber, otp) => {
        setLoading(true);
        setError(null);
        setVerified(false);

        try {
            // Twilio Verify does NOT require a sessionId
            const response = await verifyMobileOtp({
                mobileNumber,
                otp
            });

            setVerified(true);
            setVerificationData(response);

            return response;

        } catch (err) {
            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                err?.message ||
                "Invalid OTP. Please try again.";

            setError(message);
            throw new Error(message);

        } finally {
            setLoading(false);
        }
    }, []);

    // =====================================================
    // RESEND OTP
    // =====================================================
    const resendOTP = useCallback(async (mobileNumber) => {
        setLoading(true);
        setError(null);

        try {
            const response = await resendMobileOtp({
                mobileNumber
            });

            setOtpSent(true);
            setVerificationData(response);

            return response;

        } catch (err) {
            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to resend OTP";

            setError(message);
            throw new Error(message);

        } finally {
            setLoading(false);
        }
    }, []);

    // =====================================================
    // RESET
    // =====================================================
    const resetVerification = useCallback(() => {
        setOtpSent(false);
        setVerified(false);
        setVerificationData(null);
        setError(null);
        setLoading(false);
    }, []);

    // =====================================================
    // RETURN
    // =====================================================
    return {
        loading,
        error,
        otpSent,
        verified,
        verificationData,

        sendOTP,
        verifyOTP,
        resendOTP,
        resetVerification,

        setError,
    };
};