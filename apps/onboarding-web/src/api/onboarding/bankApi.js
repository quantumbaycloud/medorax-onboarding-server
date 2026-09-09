import client, { getApiErrorMessage } from "../client";

const BANK_ENDPOINT = "/api/onboarding/bank-details";
const IFSC_ENDPOINT = "/api/onboarding/ifsc";

export const saveBankDetails = async (data) => {
  try {
    return (await client.post(BANK_ENDPOINT, data)).data;
  } catch (error) {
    const normalized = new Error(getApiErrorMessage(error, "Failed to save bank details."));
    normalized.status = error.response?.status;
    normalized.errors = error.response?.data?.detail || [];
    normalized.response = error.response;
    throw normalized;
  }
};

export const getBankDetails = async () => {
  try { return (await client.get(BANK_ENDPOINT)).data; }
  catch (error) { throw new Error(getApiErrorMessage(error, "Failed to fetch bank details.")); }
};

// Verifies the IFSC against the backend and returns authoritative bank/branch data.
export const verifyIFSC = async (ifscCode) => {
  const ifsc = String(ifscCode || "").trim().toUpperCase();
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
    return { valid: false, success: false, message: "Enter a valid 11-character IFSC code.", ifscCode: ifsc };
  }
  try {
    return (await client.get(`${IFSC_ENDPOINT}/${encodeURIComponent(ifsc)}`)).data;
  } catch (error) {
    const message = getApiErrorMessage(error, "Could not verify this IFSC code.");
    const e = new Error(message); e.status = error.response?.status; throw e;
  }
};

export const verifyUPI = async (upiId) => {
  const upi = String(upiId || "").trim();
  if (!/^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9.-]{2,}$/.test(upi)) return { valid: false, success: false, message: "Invalid UPI ID format.", upiId: upi };
  return { valid: true, success: true, message: "Valid UPI ID format.", upiId: upi };
};

export const verifyIfsc = verifyIFSC;
export const verifyUpi = verifyUPI;
