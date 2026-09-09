// src/components/onboarding/verification/OTPInput.jsx

import { useRef, useEffect } from "react";

export default function OTPInput({ value, onChange, length = 6 }) {
  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, "");

    if (!val) {
      const newOtp = [...value];
      newOtp[index] = "";
      onChange(newOtp);
      return;
    }

    const newOtp = [...value];
    newOtp[index] = val[0];
    onChange(newOtp);

    // Move to next input if available
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newOtp = [...value];
        newOtp[index] = "";
        onChange(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const newOtp = [...value];

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    onChange(newOtp);

    // Focus on the next empty input or last filled
    const nextIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  // Handle auto-submit when all digits are filled
  useEffect(() => {
    const allFilled = value.every(digit => digit !== "");
    if (allFilled && value.length === length) {
      // Auto-submit after a small delay
      const timer = setTimeout(() => {
        const submitEvent = new CustomEvent('otpComplete', { detail: { otp: value.join('') } });
        document.dispatchEvent(submitEvent);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, length]);

  return (
    <div
      onPaste={handlePaste}
      className="w-full flex justify-center gap-2 sm:gap-3 mt-6 mb-8 px-1"
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          inputMode="numeric"
          maxLength={1}
          autoComplete="one-time-code"
          className={`
            flex-1
            min-w-0
            max-w-[56px]
            aspect-square
            rounded-xl
            bg-[#F1F5F9]
            border-2
            ${value[index] ? 'border-[#006B5F]' : 'border-transparent'}
            text-center
            text-lg
            sm:text-xl
            md:text-2xl
            font-bold
            text-[#131B2E]
            outline-none
            transition-all
            duration-200
            focus:bg-white
            focus:border-[#2563EB]
            focus:ring-4
            focus:ring-blue-100
          `}
        />
      ))}
    </div>
  );
}