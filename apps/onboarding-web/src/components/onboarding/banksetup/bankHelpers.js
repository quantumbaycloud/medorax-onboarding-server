// --------------------------------------------
// Validation
// --------------------------------------------

export const validateIFSC = (ifsc) => {
  const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  return regex.test(ifsc);
};

export const validateUPI = (upi) => {
  if (!upi) return true;

  const regex =
    /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;

  return regex.test(upi);
};

export const validateAccountNumber = (
  account,
  confirm
) => {
  return (
    account.trim() !== "" &&
    account === confirm
  );
};

// --------------------------------------------
// Mock API
// --------------------------------------------

export const verifyIFSC = async (ifsc) => {
  await new Promise((r) =>
    setTimeout(r, 1200)
  );

  return {
    success: true,

    bankName: "HDFC Bank",

    branch: "Greater Noida",

    city: "Greater Noida",

    state: "Uttar Pradesh",
  };
};

export const verifyUPI = async (upi) => {
  await new Promise((r) =>
    setTimeout(r, 1200)
  );

  return {
    success: true,
  };
};

export const uploadCancelledCheque =
  async (file) => {
    await new Promise((r) =>
      setTimeout(r, 2000)
    );

    return {
      success: true,

      documentId:
        "CHEQUE-" + Date.now(),

      url: URL.createObjectURL(file),
    };
  };

export const saveBankDetails =
  async (bankData) => {
    await new Promise((r) =>
      setTimeout(r, 2000)
    );

    console.log(bankData);

    return {
      success: true,
    };
  };