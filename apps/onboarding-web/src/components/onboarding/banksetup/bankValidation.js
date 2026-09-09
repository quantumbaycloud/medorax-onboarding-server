// -----------------------------------------
// Account Holder Name
// -----------------------------------------

export function validateAccountHolder(name) {
  if (!name.trim()) {
    return "Account holder name is required.";
  }

  if (name.trim().length < 3) {
    return "Enter a valid account holder name.";
  }

  return "";
}

// -----------------------------------------
// IFSC
// -----------------------------------------

export function validateIFSC(ifsc) {
  if (!ifsc.trim()) {
    return "IFSC Code is required.";
  }

  const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  if (!regex.test(ifsc.toUpperCase())) {
    return "Invalid IFSC Code.";
  }

  return "";
}

// -----------------------------------------
// Account Number
// -----------------------------------------

export function validateAccountNumber(number) {
  if (!number.trim()) {
    return "Account number is required.";
  }

  if (!/^[0-9]{9,18}$/.test(number)) {
    return "Enter a valid account number.";
  }

  return "";
}

// -----------------------------------------
// Confirm Account Number
// -----------------------------------------

export function validateConfirmAccount(
  account,
  confirm
) {
  if (!confirm.trim()) {
    return "Please confirm account number.";
  }

  if (account !== confirm) {
    return "Account numbers do not match.";
  }

  return "";
}

// -----------------------------------------
// UPI
// -----------------------------------------

export function validateUPI(upi) {
  if (!upi) return "";

  const regex =
    /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/;

  if (!regex.test(upi)) {
    return "Invalid UPI ID.";
  }

  return "";
}

// -----------------------------------------
// Cancelled Cheque
// -----------------------------------------

export function validateCheque(file) {
  if (!file) {
    return "Cancelled cheque is required.";
  }

  const allowed = [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];

  if (!allowed.includes(file.type)) {
    return "Only PDF, JPG and PNG files are allowed.";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Maximum file size is 5 MB.";
  }

  return "";
}

// -----------------------------------------
// Entire Form
// -----------------------------------------

export function validateBankSetup(data) {
  return {
    accountHolderName:
      validateAccountHolder(
        data.accountHolderName
      ),

    ifscCode:
      validateIFSC(data.ifscCode),

    accountNumber:
      validateAccountNumber(
        data.accountNumber
      ),

    confirmAccount:
      validateConfirmAccount(
        data.accountNumber,
        data.confirmAccountNumber
      ),

    upiId:
      validateUPI(data.upiId),

    cheque:
      validateCheque(data.cheque),
  };
}

export function isBankFormValid(data) {
  const errors =
    validateBankSetup(data);

  return Object.values(errors).every(
    (value) => value === ""
  );
}