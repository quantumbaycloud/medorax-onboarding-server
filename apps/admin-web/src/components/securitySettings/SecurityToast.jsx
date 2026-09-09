import SecurityIcon from "./SecurityIcon";

const SecurityToast = ({
  visible,
  data,
}) => {
  return (
    <div
      className={`fixed right-6 top-20 z-50 flex items-center gap-3 rounded-xl bg-white p-4 shadow-xl transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9CF6BC] text-[#00522F]">
        <SecurityIcon name={data.icon} size={20} />
      </div>

      <div>
        <span className="block text-sm font-semibold text-[#171C24]">
          {data.title}
        </span>

        <span className="text-xs text-[#424751]">
          {data.message}
        </span>
      </div>
    </div>
  );
};

export default SecurityToast;