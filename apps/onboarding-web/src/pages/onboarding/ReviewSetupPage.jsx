// ReviewSetupPage.jsx
import { useNavigate } from "react-router-dom";
import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import ReviewSetupLayout from "../../components/onboarding/reviewsetup/ReviewSetupLayout";
import { ReviewDataProvider } from "../../components/onboarding/reviewsetup/ReviewDataProvider";

export default function ReviewSetupPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/bank-setup");
  };

  return (
    <VerificationLayout active="Review & Setup">
      <div className="h-full w-full overflow-hidden">
        <ReviewDataProvider>
          <ReviewSetupLayout onBack={handleBack} />
        </ReviewDataProvider>
      </div>
    </VerificationLayout>
  );
}