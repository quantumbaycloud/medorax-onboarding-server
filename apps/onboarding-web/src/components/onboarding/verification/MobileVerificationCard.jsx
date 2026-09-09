import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Smartphone } from "lucide-react";
import {
  verifyMobileOTP,
} from "../../api/authApi";
import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import VerificationCard from "../../components/onboarding/verification/VerificationCard";

export default function MobileVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const phone =
    location.state?.phone ||
    localStorage.getItem("registrationPhone") ||
    "+91 XXXXX XXXXX";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const enteredOTP = otp.join("");

    if (enteredOTP !== "123456") {
      alert("Invalid Verification Code");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Mobile Verified Successfully!");
      navigate("/business-type");
    }, 1000);
  };

  const handleResend = async () => {
    console.log("Resend Mobile OTP");
  };

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
              We've sent a <strong>6-digit verification code</strong>
            </p>
            <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-6 sm:leading-7 text-slate-600 mt-1">
              to
            </p>
            <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-6 sm:leading-7 font-semibold text-[#131B2E] mt-1 break-all">
              {phone}
            </p>
          </div>
        }
        otp={otp}
        setOtp={setOtp}
        buttonText="Verify Number"
        loading={loading}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </VerificationLayout>
  );
}