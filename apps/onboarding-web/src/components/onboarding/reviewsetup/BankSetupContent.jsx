// BankSetupContent.jsx
function DetailItem({
  label,
  value,
  className = "",
}) {
  return (
    <div className={className}>
      <p
        className="
          text-[10px] sm:text-[12px]
          font-semibold
          uppercase
          tracking-[0.06em] sm:tracking-[0.08em]
          text-slate-500
          mb-1 sm:mb-2
        "
      >
        {label}
      </p>
      <p className="text-sm sm:text-base lg:text-[17px] font-semibold text-[#131B2E] break-words">
        {value || <span className="text-slate-400 font-normal">Not provided</span>}
      </p>
    </div>
  );
}

export default function BankSetupContent({ data = {} }) {
  const bank = data || {};
  const hasData = Object.values(bank).some(v => v !== null && v !== undefined && String(v).trim() !== "");
  if (!hasData) return <div className="text-center py-6"><p className="text-slate-500">No bank details provided yet.</p></div>;
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-x-16 lg:gap-y-8">
    <DetailItem label="Account Holder" value={bank.accountHolder} />
    <DetailItem label="Bank Name" value={bank.bankName} />
    <DetailItem label="Account Number" value={bank.accountNumber} />
    <DetailItem label="IFSC Code" value={bank.ifsc} />
    <DetailItem className="sm:col-span-2" label="Branch" value={bank.branch} />
    <DetailItem className="sm:col-span-2" label="UPI ID" value={bank.upi} />
  </div>;
}
