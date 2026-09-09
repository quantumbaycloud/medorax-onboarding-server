// src/pages/MobileVerificationPage.jsx

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Smartphone } from "lucide-react";

import { useMobileVerification } from "../../hooks/useMobileVerification";
import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import VerificationCard from "../../components/onboarding/verification/VerificationCard";
import { successAlert } from "../../utils/alerts";

export default function MobileVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get phone number from location state or localStorage
  const rawPhone =
    location.state?.phone ||
    localStorage.getItem("registrationPhone") ||
    "";

  const phone = rawPhone.startsWith("+")
    ? rawPhone
    : `+91${rawPhone.replace(/\D/g, "")}`;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  const timerRef = useRef(null);
  const otpRequestRef = useRef(false);

  const {
    loading,
    error,
    otpSent,
    sendOTP,
    verifyOTP,
    resendOTP,
    resetVerification,
  } = useMobileVerification();

  // ---------------------------------------------------------
  // Automatically send OTP when page loads
  // ---------------------------------------------------------
  useEffect(() => {
    if (!phone) {
      setErrorMessage("Mobile number not found.");
      return;
    }

    // Prevent duplicate OTP requests in React development/StrictMode
    if (otpSent || otpRequestRef.current) {
      return;
    }

    otpRequestRef.current = true;

    console.log("📱 Sending initial OTP to:", phone);

    sendOTP(phone)
      .then(() => {
        console.log("✅ Initial OTP sent successfully");
        setTimer(60);
      })
      .catch((err) => {
        console.error("❌ Failed to send initial OTP:", err);

        setErrorMessage(
          err?.message ||
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Failed to send verification code."
        );

        // Allow another attempt if the request failed
        otpRequestRef.current = false;
      });
  }, [phone, otpSent, sendOTP]);

  // ---------------------------------------------------------
  // Countdown timer
  // ---------------------------------------------------------
  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [timer]);

  // ---------------------------------------------------------
  // Verify OTP
  // ---------------------------------------------------------
  const handleVerify = async () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      setOtpError("Please enter all 6 digits.");
      return;
    }

    setOtpError("");
    setErrorMessage("");

    try {
      // Send OTP + mobile number to FastAPI.
      // Backend verifies the code through Twilio Verify.
      const response = await verifyOTP(phone, enteredOTP);

      console.log("✅ Mobile verification response:", response);

      // Backend should return verified: true after Twilio
      // returns status = approved.
      if (response?.verified === false) {
        throw new Error(
          response?.message || "Mobile verification failed."
        );
      }

      // Save verification status locally
      localStorage.setItem("mobileVerified", "true");
      localStorage.setItem("mobileNumber", phone);
      localStorage.setItem("onboardingPart1Complete", "true");

      await successAlert(
        "✅ Mobile Verified!",
        "Your mobile number has been verified successfully."
      );

      navigate("/onboarding-complete");
    } catch (err) {
      console.error("❌ Mobile verification failed:", err);

      const message =
        err?.message ||
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Invalid verification code. Please try again.";

      setErrorMessage(message);

      // Clear OTP after failed verification
      setOtp(["", "", "", "", "", ""]);

      // Focus first OTP input
      setTimeout(() => {
        document
          .querySelector('input[inputmode="numeric"]')
          ?.focus();
      }, 0);
    }
  };

  // ---------------------------------------------------------
  // Resend OTP
  // ---------------------------------------------------------
  const handleResend = async () => {
    if (isResending || timer > 0 || !phone) {
      return;
    }

    setIsResending(true);
    setErrorMessage("");
    setOtpError("");
    setOtp(["", "", "", "", "", ""]);

    try {
      console.log("📱 Resending OTP to:", phone);

      await resendOTP(phone);

      console.log("✅ OTP resent successfully");

      // Reset countdown
      setTimer(60);

      // Focus first OTP input
      setTimeout(() => {
        document
          .querySelector('input[inputmode="numeric"]')
          ?.focus();
      }, 0);
    } catch (err) {
      console.error("❌ Failed to resend OTP:", err);

      setErrorMessage(
        err?.message ||
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  // ---------------------------------------------------------
  // OTP input change
  // ---------------------------------------------------------
  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    setOtpError("");
    setErrorMessage("");
  };

  // ---------------------------------------------------------
  // Cleanup
  // ---------------------------------------------------------
  useEffect(() => {
    return () => {
      resetVerification();
      clearTimeout(timerRef.current);
    };
  }, [resetVerification]);

  // ---------------------------------------------------------
  // Timer formatting
  // ---------------------------------------------------------
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------
  return (
    <VerificationLayout active="Verification">
      <VerificationCard
        icon={
          <Smartphone
            size={34}
            className="text-[#006B5F]"
          />
        }
        title="Verify Mobile Number"
        description={
          <div className="text-center">
            <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-6 sm:leading-7 text-slate-600">
              We've sent a{" "}
              <strong>6-digit verification code</strong>
            </p>

            <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-6 sm:leading-7 text-slate-600 mt-1">
              to
            </p>

            <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-6 sm:leading-7 font-semibold text-[#131B2E] mt-1 break-all">
              {phone || "Mobile number unavailable"}
            </p>
          </div>
        }
        otp={otp}
        setOtp={handleOtpChange}
        buttonText="Verify Number"
        loading={loading}
        onVerify={handleVerify}
        onResend={handleResend}
        error={errorMessage || otpError || error}
        timer={timer}
        formatTime={formatTime}
        isResending={isResending}
      />
    </VerificationLayout>
  );
}