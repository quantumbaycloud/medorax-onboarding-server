export default function VerificationBackground() {
  return (
    <>
      {/* Gradient Blobs - Responsive sizes */}

      <div className="absolute -top-32 -left-20 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-teal-200 blur-[100px] sm:blur-[120px] opacity-40" />

      <div className="absolute -bottom-20 -right-24 w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full bg-blue-200 blur-[120px] sm:blur-[140px] opacity-40" />

      {/* Grid - Smaller dots on mobile */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(#006B5F 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Responsive grid size using media query */}
      <style>{`
        @media (min-width: 640px) {
          .absolute.inset-0.opacity-\\[0\\.04\\] {
            background-size: 32px 32px !important;
          }
        }
      `}</style>
    </>
  );
}