// BankSetupPage.jsx - Responsive with Backend Integration
import { useNavigate } from "react-router-dom";
import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import BankSetupLayout from "../../components/onboarding/banksetup/BankSetupLayout";
import useBankSetup from "../../components/onboarding/banksetup/useBankSetup";

export default function BankSetupPage() {
  const navigate = useNavigate();

  const {
    bankData,
    loading,
    ifscLoading,
    upiLoading,
    ifscError,
    saveError,
    showManualEntry,
    updateField,
    verifyBankIFSC,
    verifyBusinessUPI,
    uploadCancelledCheque,
    removeCheque,
    finishOnboarding,
    handleManualEntry,
    handleCancelManualEntry,
  } = useBankSetup();

  const handleBack = () => {
    navigate("/plan-payment");
  };

  const handleFinish = async () => {
    const success = await finishOnboarding();
    if (!success) return;
    navigate("/review-setup");
  };

  return (
    <VerificationLayout active="Bank Setup">
      <div className="h-full w-full overflow-hidden">
        <BankSetupLayout
          bankData={bankData}
          updateField={updateField}
          ifscLoading={ifscLoading}
          ifscError={ifscError}
          saveError={saveError}
          showManualEntry={showManualEntry}
          verifyBankIFSC={verifyBankIFSC}
          upiLoading={upiLoading}
          verifyBusinessUPI={verifyBusinessUPI}
          uploadCancelledCheque={uploadCancelledCheque}
          removeCheque={removeCheque}
          loading={loading}
          onBack={handleBack}
          onFinish={handleFinish}
          onManualEntry={handleManualEntry}
          onCancelManualEntry={handleCancelManualEntry}
        />
      </div>
    </VerificationLayout>
  );
}