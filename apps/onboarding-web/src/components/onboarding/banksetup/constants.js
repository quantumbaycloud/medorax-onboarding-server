// constants.js
export const BANK_CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ACCEPTED_FILE_TYPES: [".pdf", ".jpg", ".jpeg", ".png"],
  ACCEPTED_MIME_TYPES: ["application/pdf", "image/jpeg", "image/png"],
  ACCOUNT_NUMBER_MIN: 9,
  ACCOUNT_NUMBER_MAX: 18,
  IFSC_LENGTH: 11,
  VERIFY_DELAY: 1500,
  UPLOAD_DELAY: 1500,
  PROCESS_DELAY: 1800,
};

export const BANK_STEPS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  PROCESSING: "processing",
  UPLOADED: "uploaded",
};

export const DEFAULT_BANK_DATA = {
  accountHolderName: "",
  accountNumber: "",
  confirmAccountNumber: "",
  showAccount: false,
  showConfirm: false,
  ifscCode: "",
  bankName: "",
  branch: "",
  branchName: "",
  city: "",
  state: "",
  ifscVerified: false,
  upiId: "",
  upiVerified: false,
  cheque: null,
  chequeUploaded: false,
  chequeUploading: false,
  chequeProcessing: false,
  chequeId: null,
};