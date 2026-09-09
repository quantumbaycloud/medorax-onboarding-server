import { useNavigate } from "react-router-dom";
import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import PlanPaymentLayout from "../../components/onboarding/planpayment/PlanPaymentLayout";

export default function PlanPaymentPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/documents");
  };

  return (
    <VerificationLayout active="Plan & Payment">
      <div className="h-full w-full overflow-hidden">
        <PlanPaymentLayout onBack={handleBack} />
      </div>
    </VerificationLayout>
  );
}