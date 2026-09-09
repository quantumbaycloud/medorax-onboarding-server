// PaymentLogos.jsx - Responsive
export default function PaymentLogos({ compact = false }) {
  return (
    <div className={`${compact ? "py-1.5 sm:py-2" : "py-3 sm:py-4"}`}>
      <div className={`flex flex-wrap items-center justify-center ${compact ? "gap-3 sm:gap-5" : "gap-4 sm:gap-8"} opacity-60`}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
          alt="UPI"
          className="h-4 sm:h-5 object-contain"
          onError={(e) => e.target.style.display = 'none'}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
          alt="Visa"
          className="h-3 sm:h-4 object-contain"
          onError={(e) => e.target.style.display = 'none'}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
          alt="Mastercard"
          className="h-5 sm:h-6 object-contain"
          onError={(e) => e.target.style.display = 'none'}
        />
        <img
          src="https://razorpay.com/assets/razorpay-logo.svg"
          alt="Razorpay"
          className="h-3 sm:h-4 object-contain"
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>
    </div>
  );
}