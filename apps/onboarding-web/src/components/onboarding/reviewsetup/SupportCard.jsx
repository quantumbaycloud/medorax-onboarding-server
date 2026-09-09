import {
  Headphones,
} from "lucide-react";

export default function SupportCard() {
  return (
    <div
      className="
        rounded-2xl sm:rounded-[28px]
        bg-gradient-to-br
        from-[#0EA5A4]
        to-[#2563EB]
        p-5 sm:p-6 lg:p-8
        text-white
        shadow-[0_18px_50px_rgba(37,99,235,.25)]
        flex
        flex-col
        justify-between
      "
    >
      <Headphones size={32} />

      <div>
        <h2 className="mt-4 sm:mt-5 lg:mt-6 text-xl sm:text-2xl lg:text-[28px] font-bold">
          Priority Support
        </h2>
        <p className="mt-2 sm:mt-3 lg:mt-4 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 opacity-90">
          Have questions about your onboarding?
          Our support specialists are available
          to assist you anytime.
        </p>
      </div>

      <button
        className="
          mt-4 sm:mt-5 lg:mt-8
          rounded-xl
          bg-white
          py-2.5 sm:py-3
          font-semibold
          text-[#006B5F]
          transition
          hover:scale-[1.02]
          text-sm sm:text-base
        "
      >
        Chat Now
      </button>
    </div>
  );
}