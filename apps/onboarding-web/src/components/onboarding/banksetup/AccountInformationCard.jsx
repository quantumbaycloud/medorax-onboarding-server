// AccountInformationCard.jsx - Responsive
import { useState } from "react";
import { Building2, AlertCircle } from "lucide-react";
import IFSCInput from "./IFSCInput";
import AccountNumberField from "./AccountNumberField";
import AutoFetchedFields from "./AutoFetchedFields";

export default function AccountInformationCard({
  bankData,
  updateField,
  verifyBankIFSC,
  ifscLoading = false,
  ifscError = '',
  showManualEntry = false,
  onManualEntry,
  onCancelManualEntry,
}) {
  const [showAccount, setShowAccount] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasAutoFetchedData = bankData.bankName && bankData.branch && bankData.ifscVerified;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#0EA5A4]/10">
          <Building2 size={18} className="text-[#0EA5A4]" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Account Information
          </h2>
          <p className="text-xs text-slate-500">
            Enter your bank account details for payouts.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
        {/* Account Holder Name */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Account Holder Name
          </label>
          <input
            type="text"
            value={bankData.accountHolderName}
            onChange={(e) => updateField("accountHolderName", e.target.value)}
            placeholder="John Doe"
            className="h-9 sm:h-10 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-[#0EA5A4]"
          />
        </div>

        {/* IFSC Code */}
        <IFSCInput
          value={bankData.ifscCode}
          onChange={(value) => {
            updateField("ifscCode", value);
            updateField("bankName", "");
            updateField("branch", "");
            updateField("branchName", "");
            updateField("city", "");
            updateField("state", "");
            updateField("ifscVerified", false);
            if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
              setTimeout(() => verifyBankIFSC(), 0);
            }
          }}
          onVerify={verifyBankIFSC}
          loading={ifscLoading}
          verified={bankData.ifscVerified}
          error={ifscError}
        />

        {/* IFSC Error Message */}
        {ifscError && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 sm:p-3">
            <AlertCircle size={14} className="mt-0.5 text-red-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-red-600 break-words">{ifscError}</p>
              {!showManualEntry && (
                <button
                  type="button"
                  onClick={onManualEntry}
                  className="mt-1 text-xs text-[#0EA5A4] hover:underline font-medium"
                >
                  Enter bank details manually →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Auto-fetched Bank Details */}
        {hasAutoFetchedData && !showManualEntry && (
          <AutoFetchedFields
            bankName={bankData.bankName}
            branch={bankData.branch}
            city={bankData.city}
            state={bankData.state}
            onManualEntry={onManualEntry}
          />
        )}

        {/* Manual Entry Section */}
        {showManualEntry && (
          <div className="rounded-xl border border-[#0EA5A4]/30 bg-[#F4FCFA] p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Manual Bank Details
                </h4>
                <p className="text-xs text-slate-500">
                  Enter your bank details manually
                </p>
              </div>
              <button
                type="button"
                onClick={onCancelManualEntry}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={bankData.bankName}
                  onChange={(e) => {
                    updateField("bankName", e.target.value);
                    updateField("ifscVerified", false);
                  }}
                  placeholder="e.g., HDFC Bank"
                  className="h-9 sm:h-10 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-[#0EA5A4]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Branch *
                </label>
                <input
                  type="text"
                  value={bankData.branch}
                  onChange={(e) => {
                    updateField("branch", e.target.value);
                    updateField("ifscVerified", false);
                  }}
                  placeholder="e.g., Greater Noida"
                  className="h-9 sm:h-10 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-[#0EA5A4]"
                />
              </div>
            </div>

            <p className="mt-2 text-[10px] sm:text-xs text-slate-500 flex items-center gap-1">
              <AlertCircle size={11} />
              Please ensure the bank name and branch are correct for successful payouts.
            </p>
          </div>
        )}

        {/* Account Number & Confirm */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
          <AccountNumberField
            label="Account Number"
            value={bankData.accountNumber}
            onChange={(value) => updateField("accountNumber", value)}
            show={showAccount}
            onToggle={() => setShowAccount(!showAccount)}
          />

          <AccountNumberField
            label="Confirm Account Number"
            value={bankData.confirmAccountNumber}
            onChange={(value) => updateField("confirmAccountNumber", value)}
            show={showConfirm}
            onToggle={() => setShowConfirm(!showConfirm)}
            error={
              bankData.accountNumber &&
              bankData.confirmAccountNumber &&
              bankData.accountNumber !== bankData.confirmAccountNumber
            }
          />
        </div>

        {/* Account Mismatch Error */}
        {bankData.accountNumber &&
          bankData.confirmAccountNumber &&
          bankData.accountNumber !== bankData.confirmAccountNumber && (
            <p className="text-xs text-red-500">
              Account numbers do not match.
            </p>
          )}
      </div>
    </div>
  );
}