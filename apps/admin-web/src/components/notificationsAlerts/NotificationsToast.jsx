const NotificationsToast = ({
  visible,
  message,
  type = "success",
}) => {
  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#2c303a] text-white shadow-xl"
      role="status"
      aria-live="polite"
    >
      <span
        className={
          type === "info"
            ? "text-[#aac7ff]"
            : "text-[#80d9a2]"
        }
      >
        {type === "info" ? "ⓘ" : "✓"}
      </span>

      <span className="text-sm font-medium">
        {message}
      </span>
    </div>
  );
};

export default NotificationsToast;