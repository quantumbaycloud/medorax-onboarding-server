import { useState } from "react";
import { verifyIFSC, verifyUPI, saveBankDetails } from "../../../api/onboarding/bankApi";
import { DEFAULT_BANK_DATA, BANK_CONSTANTS } from "./constants";
import client, { getApiErrorMessage } from "../../../api/client";

export default function useBankSetup() {
  const [bankData, setBankData] = useState(DEFAULT_BANK_DATA);
  const [loading, setLoading] = useState(false);
  const [ifscLoading, setIfscLoading] = useState(false);
  const [upiLoading, setUpiLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [ifscError, setIfscError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [showManualEntry, setShowManualEntry] = useState(false);

  const updateField = (field, value) => {
    setBankData((prev) => ({ ...prev, [field]: value }));
    setSaveError("");
  };

  const verifyBankIFSC = async () => {
    const ifsc = bankData.ifscCode.trim().toUpperCase();
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      setIfscError("Invalid IFSC format. Enter a valid 11-character IFSC code.");
      setBankData((prev) => ({ ...prev, ifscVerified: false }));
      return false;
    }
    setIfscLoading(true); setIfscError(""); setShowManualEntry(false);
    try {
      const res = await verifyIFSC(ifsc);
      if (res.valid || res.success) {
        setBankData((prev) => ({
          ...prev, ifscCode: ifsc,
          bankName: res.bankName || res.BANK || prev.bankName,
          branch: res.branch || prev.branch,
          branchName: res.branchName || res.branch || prev.branchName,
          city: res.city || prev.city, state: res.state || prev.state,
          ifscVerified: true,
        }));
        return true;
      }
      setBankData((prev) => ({ ...prev, ifscVerified: false }));
      setIfscError(res.message || "This IFSC code could not be verified.");
      return false;
    } catch (error) {
      setBankData((prev) => ({ ...prev, ifscVerified: false }));
      setIfscError(error.message || "IFSC verification failed.");
      return false;
    } finally { setIfscLoading(false); }
  };

  const verifyBusinessUPI = async () => {
    if (!bankData.upiId.trim()) return;
    setUpiLoading(true);
    try {
      const res = await verifyUPI(bankData.upiId);
      setBankData((prev) => ({ ...prev, upiVerified: !!(res.valid || res.success) }));
      if (!(res.valid || res.success)) setSaveError(res.message || "Invalid UPI ID.");
    } catch (error) { setSaveError(error.message || "UPI verification failed"); }
    finally { setUpiLoading(false); }
  };

  const uploadCancelledCheque = async (file) => {
    if (!file) return;
    if (!BANK_CONSTANTS.ACCEPTED_MIME_TYPES.includes(file.type)) { setSaveError("Only PDF, JPG and PNG files are allowed."); return; }
    if (file.size > BANK_CONSTANTS.MAX_FILE_SIZE) { setSaveError("Maximum file size is 5 MB."); return; }
    setUploadLoading(true); setBankData((prev) => ({ ...prev, chequeUploading: true }));
    try {
      const form = new FormData(); form.append("documentType", "6"); form.append("file", file);
      const response = await client.post("/api/onboarding/documents/upload", form);
      setBankData((prev) => ({ ...prev, cheque: file, chequeUploading: false, chequeUploaded: true, chequeProcessing: false, chequeId: response.data.id }));
      setSaveError("");
    } catch (error) {
      setBankData((prev) => ({ ...prev, chequeUploading: false, chequeUploaded: false, chequeId: null }));
      setSaveError(getApiErrorMessage(error, "Failed to securely upload cancelled cheque."));
    } finally { setUploadLoading(false); }
  };

  const removeCheque = async () => {
    const id = bankData.chequeId;
    if (id) { try { await client.delete(`/api/onboarding/documents/${id}`); } catch (error) { setSaveError(getApiErrorMessage(error, "Failed to remove cancelled cheque.")); return; } }
    setBankData((prev) => ({ ...prev, cheque: null, chequeUploaded: false, chequeUploading: false, chequeProcessing: false, chequeId: null }));
  };

  const finishOnboarding = async () => {
    const ifsc = bankData.ifscCode.trim().toUpperCase();
    if (!bankData.ifscVerified) { setSaveError("Please verify your IFSC code. Bank name and branch must be fetched successfully."); return false; }
    if (bankData.accountNumber !== bankData.confirmAccountNumber) { setSaveError("Account numbers do not match."); return false; }
    if (bankData.accountHolderName.trim().length < 3) { setSaveError("Account holder name must be at least 3 characters."); return false; }
    if (!/^[0-9]{9,18}$/.test(bankData.accountNumber)) { setSaveError("Account number must be 9-18 digits."); return false; }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) { setSaveError("Invalid IFSC code."); return false; }
    if (!bankData.bankName.trim() || !(bankData.branchName || bankData.branch || "").trim()) { setSaveError("Verified bank name and branch are required."); return false; }
    if (!bankData.chequeUploaded || !bankData.chequeId) { setSaveError("Please upload a cancelled cheque before finishing."); return false; }
    setLoading(true); setSaveError("");
    try {
      await saveBankDetails({
        accountHolderName: bankData.accountHolderName.trim(), bankName: bankData.bankName.trim(),
        accountNumber: bankData.accountNumber, confirmAccountNumber: bankData.confirmAccountNumber,
        ifscCode: ifsc, branchName: (bankData.branchName || bankData.branch || "").trim(),
        upiId: bankData.upiId.trim() || null,
      });
      return true;
    } catch (error) {
      setSaveError(typeof error?.message === "string" ? error.message : "Failed to save bank details. Please try again.");
      if (error.status === 401) window.location.assign("/login");
      return false;
    } finally { setLoading(false); }
  };

  return { bankData, loading, ifscLoading, upiLoading, uploadLoading, ifscError, saveError, showManualEntry, setBankData, updateField, verifyBankIFSC, verifyBusinessUPI, uploadCancelledCheque, removeCheque, finishOnboarding, handleManualEntry: () => { setShowManualEntry(true); setIfscError(""); }, handleCancelManualEntry: () => setShowManualEntry(false) };
}
