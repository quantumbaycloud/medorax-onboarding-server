import { useEffect, useState } from "react";

export default function CountdownTimer({
  initialTime = 60,
  onResend,
}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft > 0) return;

    setTimeLeft(initialTime);

    if (onResend) {
      onResend();
    }
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2 mt-3 sm:mt-4">

      <button
        type="button"
        onClick={handleResend}
        disabled={timeLeft > 0}
        className={`font-semibold transition text-sm sm:text-base ${
          timeLeft > 0
            ? "text-slate-400 cursor-not-allowed"
            : "text-[#006B5F] hover:underline"
        }`}
      >
        Resend Code
      </button>

      {timeLeft > 0 && (
        <p className="text-xs sm:text-sm text-slate-500">
          Request new code in{" "}
          <span className="font-bold text-[#131B2E]">
            {minutes}:{seconds}
          </span>
        </p>
      )}
    </div>
  );
}