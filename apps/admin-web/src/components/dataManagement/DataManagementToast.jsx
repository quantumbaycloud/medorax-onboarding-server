import React, { useEffect } from "react";

const DataManagementToast = ({
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(() => {
      onClose?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-lg bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-xl">
      <div className="flex items-center gap-3">
        <span className="text-green-400">✓</span>

        <span>{message}</span>

        <button
          type="button"
          onClick={onClose}
          className="ml-auto text-slate-400 hover:text-white"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default DataManagementToast;