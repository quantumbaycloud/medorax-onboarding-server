// BankSetupLayout.jsx - Fully Responsive with Backend Integration
import AccountInformationCard from "./AccountInformationCard";
import UPIConfigurationCard from "./UPIConfigurationCard";
import CancelledChequeCard from "./CancelledChequeCard";
import BankBenefitsCard from "./BankBenefitsCard";
import BankFooter from "./BankFooter";
import { AlertCircle } from "lucide-react";

export default function BankSetupLayout({
  bankData,
  updateField,
  ifscLoading,
  ifscError,
  saveError,
  showManualEntry,
  verifyBankIFSC,
  upiLoading,
  verifyBusinessUPI,
  uploadCancelledCheque,
  removeCheque,
  loading,
  onBack,
  onFinish,
  onManualEntry,
  onCancelManualEntry,
}) {
  // Enhanced validation with more checks
  const canContinue =
    bankData.accountHolderName.trim() !== "" &&
    bankData.accountHolderName.trim().length >= 3 &&
    bankData.accountNumber.trim() !== "" &&
    /^[0-9]{9,18}$/.test(bankData.accountNumber) &&
    bankData.confirmAccountNumber.trim() !== "" &&
    bankData.accountNumber === bankData.confirmAccountNumber &&
    (bankData.ifscVerified || 
     (bankData.bankName && bankData.bankName.trim() !== "" && 
      (bankData.branch || bankData.branchName) && 
      (bankData.branch || bankData.branchName).trim() !== "")) &&
    bankData.chequeUploaded;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Mobile Layout - Fixed Header + Scrollable Content */}
      <div className="block lg:hidden flex flex-col h-full">
        {/* Fixed Header - Mobile */}
        <div className="flex-shrink-0 px-3 sm:px-4 pt-3 pb-2 bg-white z-10 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#0EA5A4]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#006B5F]">
              STEP 5 OF 5
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
              Configure Payout Account
            </h1>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Add your payout bank account to receive settlements securely.
          </p>
        </div>

        {/* Scrollable Content - Mobile */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 scrollbar-thin scrollbar-thumb-[#006B5F] scrollbar-track-gray-100">
          <div className="space-y-4">
            <AccountInformationCard
              bankData={bankData}
              updateField={updateField}
              verifyBankIFSC={verifyBankIFSC}
              ifscLoading={ifscLoading}
              ifscError={ifscError}
              showManualEntry={showManualEntry}
              onManualEntry={onManualEntry}
              onCancelManualEntry={onCancelManualEntry}
            />

            <UPIConfigurationCard
              bankData={bankData}
              updateField={updateField}
              verifyBusinessUPI={verifyBusinessUPI}
              loading={upiLoading}
            />

            <div className="grid grid-cols-1 gap-4">
              <CancelledChequeCard
                bankData={bankData}
                uploadCancelledCheque={uploadCancelledCheque}
                removeCheque={removeCheque}
              />
              <BankBenefitsCard />
            </div>

            {/* Save Error Message - Mobile */}
            {saveError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-red-600 break-words">{saveError}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Mobile */}
        <div className="flex-shrink-0 px-3 sm:px-4 pt-2 pb-3 bg-white border-t border-slate-100">
          <BankFooter
            loading={loading}
            canContinue={canContinue}
            onBack={onBack}
            onFinish={onFinish}
          />
        </div>
      </div>

      {/* Desktop Layout - Full page */}
      <div className="hidden lg:flex flex-col h-full max-w-[1450px] mx-auto w-full px-4">
        {/* Header - Desktop */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-[#0EA5A4]/10 px-3 py-0.5 text-xs font-semibold text-[#006B5F]">
              STEP 5 OF 5
            </span>
            <h1 className="text-2xl font-bold text-slate-900">
              Configure Payout Account
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Add your payout bank account to receive settlements securely from MEDORAX ERP.
          </p>
        </div>

        {/* Scrollable Content - Desktop */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-2 scrollbar-thin scrollbar-thumb-[#006B5F] scrollbar-track-gray-100">
          <div className="grid grid-cols-12 gap-5">
            {/* LEFT */}
            <div className="col-span-12 xl:col-span-8 space-y-5">
              <AccountInformationCard
                bankData={bankData}
                updateField={updateField}
                verifyBankIFSC={verifyBankIFSC}
                ifscLoading={ifscLoading}
                ifscError={ifscError}
                showManualEntry={showManualEntry}
                onManualEntry={onManualEntry}
                onCancelManualEntry={onCancelManualEntry}
              />

              <UPIConfigurationCard
                bankData={bankData}
                updateField={updateField}
                verifyBusinessUPI={verifyBusinessUPI}
                loading={upiLoading}
              />

              <BankBenefitsCard />
            </div>

            {/* RIGHT */}
            <div className="col-span-12 xl:col-span-4">
              <CancelledChequeCard
                bankData={bankData}
                uploadCancelledCheque={uploadCancelledCheque}
                removeCheque={removeCheque}
              />
            </div>
          </div>

          {/* Save Error Message - Desktop */}
          {saveError && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 text-red-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-red-600 break-words">{saveError}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Desktop */}
        <div className="flex-shrink-0 pt-2 pb-0">
          <BankFooter
            loading={loading}
            canContinue={canContinue}
            onBack={onBack}
            onFinish={onFinish}
          />
        </div>
      </div>
    </div>
  );
}