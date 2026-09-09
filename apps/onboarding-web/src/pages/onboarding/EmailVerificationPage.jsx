// src/pages/EmailVerificationPage.jsx
import { useState, useEffect } from "react";
import {
    useNavigate,
    useLocation,
    useSearchParams
} from "react-router-dom";
import { Mail, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import {
    resendVerification,
    verifyEmail
} from "../../api/auth/authApi";
import {
    successAlert,
    errorAlert
} from "../../utils/alerts";
import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import { APP_CONFIG } from "../../config";

export default function EmailVerificationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // Get token from URL or localStorage (development only)
    const urlToken = searchParams.get("token");
    const token = APP_CONFIG.useLocalToken
        ? urlToken || localStorage.getItem("dev_email_token")
        : urlToken;

    const email =
        location.state?.email ||
        localStorage.getItem("registrationEmail") ||
        "example@email.com";

    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [verificationState, setVerificationState] = useState({
        status: "verifying",
        message: "We're securely verifying your email address.",
    });
    const [verificationCompleted, setVerificationCompleted] = useState(false);

    // Auto-verify when token is present
    useEffect(() => {
        if (verificationCompleted) {
            return;
        }

        if (!token) {
            setVerificationState({
                status: "error",
                message: "No verification token found. Please check your email link.",
            });
            return;
        }

        const verifyToken = async () => {
            try {
                setLoading(true);

                const response = await verifyEmail({ token });
                console.log("Verification response:", response);

                if (APP_CONFIG.useLocalToken) {
                    localStorage.removeItem("dev_email_token");
                }

                setVerificationState({
                    status: "success",
                    message: "Your email has been successfully verified.",
                });
                setVerificationCompleted(true);

                // Save email verification status
                localStorage.setItem("emailVerified", "true");

                await successAlert(
                    "Email Verified 🎉",
                    "Your email has been verified successfully."
                );

                // ✅ Get phone number from localStorage and navigate to mobile verification
                const phone = localStorage.getItem("registrationPhone") || "";
                setTimeout(() => {
                    navigate("/mobile-verification", {
                        replace: true,
                        state: { email, phone }
                    });
                }, 2000);

            } catch (error) {
                console.error("❌ Verification error:", error);
                console.error("Error details:", {
                    status: error.status,
                    message: error.message,
                    data: error.data,
                    errors: error.errors
                });

                let errorMessage = "This verification link is invalid, expired, or has already been used.";

                if (error.data) {
                    console.log("Server response data:", error.data);
                }

                if (error.data?.Message) {
                    errorMessage = error.data.Message;
                } else if (error.data?.message) {
                    errorMessage = error.data.message;
                } else if (error.data?.title) {
                    errorMessage = error.data.title;
                }

                if (error.status === 500) {
                    errorMessage = "Server error. Please try again later.";
                    await errorAlert(
                        "Server Error",
                        "The server encountered an error. Please try again later or contact support."
                    );
                    setVerificationState({
                        status: "error",
                        message: "Server error. Please try again later.",
                    });
                    return;
                }

                setVerificationState({ status: "error", message: errorMessage });
                await errorAlert("Verification Failed", errorMessage);

            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token, navigate, email, verificationCompleted]);

    // Handle Resend
    const handleResend = async () => {
        if (!email || email === "example@email.com") {
            await errorAlert(
                "Email Not Found",
                "No email address found. Please register again."
            );
            return;
        }

        try {
            setResendLoading(true);

            console.log("📧 Sending resend request for email:", email);

            const response = await resendVerification({ 
                email: email 
            });
            
            console.log("✅ Resend response:", response);

            await successAlert(
                "Verification Email Sent ✅",
                `A new verification email has been sent to ${email}.\n\nPlease check your inbox and spam folder.`
            );

            setVerificationState({
                status: "verifying",
                message: "We've sent a new verification email. Please check your inbox.",
            });
            setVerificationCompleted(false);

        } catch (error) {
            console.error("❌ Resend error:", error);

            let errorMessage = "Unable to send verification email. Please try again later.";
            let errorTitle = "Resend Failed";

            if (error.message) errorMessage = error.message;
            if (error.data?.message) errorMessage = error.data.message;
            if (error.data?.title) errorTitle = error.data.title;

            const lowerMessage = errorMessage.toLowerCase();

            if (lowerMessage.includes("already verified")) {
                await errorAlert(
                    "Already Verified",
                    "This email has already been verified. Please login to continue."
                );
                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 2000);
                return;
            }

            if (lowerMessage.includes("not found") || lowerMessage.includes("does not exist")) {
                await errorAlert(
                    "Email Not Found",
                    "No account exists with this email address. Please register first."
                );
                return;
            }

            if (lowerMessage.includes("too many") || lowerMessage.includes("rate limit")) {
                await errorAlert(
                    "Too Many Attempts",
                    "You've requested too many verification emails. Please wait a few minutes before trying again."
                );
                return;
            }

            if (error.status === 400) {
                await errorAlert(
                    "Invalid Request",
                    errorMessage || "The request was invalid. Please try again."
                );
                return;
            }

            if (error.status === 500) {
                await errorAlert(
                    "Server Error",
                    "Our server encountered an error. Please try again later."
                );
                return;
            }

            await errorAlert(errorTitle, errorMessage);

        } finally {
            setResendLoading(false);
        }
    };

    // Render content
    const renderContent = () => {
        const { status, message } = verificationState;

        if (status === "verifying") {
            return (
                <div className="w-full max-w-[480px] mx-auto px-3 sm:px-4">
                    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.12)]">
                        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#0EA5A4] to-[#2563EB]" />
                        <div className="px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center">
                                    <Mail className="w-10 h-10 text-[#006B5F]" />
                                </div>
                            </div>
                            <h1 className="mt-6 text-2xl font-bold text-center text-[#131B2E]">
                                Verifying Your Email
                            </h1>
                            <p className="mt-3 text-center text-slate-600 leading-relaxed">
                                {message}
                                <br />
                                <span className="text-sm text-slate-500">
                                    Please wait while we authenticate your verification link.
                                </span>
                            </p>
                            <div className="mt-6 flex items-center justify-center gap-2 text-[#006B5F]">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="font-medium">Verifying...</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (status === "success") {
            return (
                <div className="w-full max-w-[480px] mx-auto px-3 sm:px-4">
                    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.12)]">
                        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-green-400 to-emerald-500" />
                        <div className="px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                            </div>
                            <h1 className="mt-6 text-2xl font-bold text-center text-[#131B2E]">
                                Email Verified ✅
                            </h1>
                            <p className="mt-3 text-center text-slate-600 leading-relaxed">
                                {message}
                                <br />
                                <span className="text-sm text-slate-500">
                                    Redirecting you to verify your mobile number...
                                </span>
                            </p>
                            <div className="mt-6 flex justify-center">
                                <div className="flex items-center gap-2 text-green-600">
                                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                                    <span className="text-sm font-medium">Verification Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (status === "error") {
            return (
                <div className="w-full max-w-[480px] mx-auto px-3 sm:px-4">
                    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,.12)]">
                        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-red-400 to-rose-500" />
                        <div className="px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                                    <XCircle className="w-10 h-10 text-red-600" />
                                </div>
                            </div>
                            <h1 className="mt-6 text-2xl font-bold text-center text-[#131B2E]">
                                Verification Failed
                            </h1>
                            <p className="mt-3 text-center text-slate-600 leading-relaxed">
                                {message}
                            </p>
                            <p className="mt-2 text-center text-sm text-slate-500">
                                Email: <span className="font-medium">{email}</span>
                            </p>
                            <button
                                onClick={handleResend}
                                disabled={resendLoading}
                                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#006B5F] text-white rounded-xl font-semibold hover:bg-[#005A4F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {resendLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="w-4 h-4" />
                                        Resend Verification Email
                                    </>
                                )}
                            </button>
                            <p className="mt-4 text-center text-sm text-slate-500">
                                <button
                                    onClick={() => navigate("/register")}
                                    className="text-[#006B5F] hover:underline font-medium"
                                >
                                    Back to Registration
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <VerificationLayout active="Verification">
            {renderContent()}
        </VerificationLayout>
    );
}