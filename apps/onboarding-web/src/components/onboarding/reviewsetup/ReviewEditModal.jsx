// components/onboarding/reviewsetup/ReviewEditModal.jsx
import { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";

export default function ReviewEditModal({
  isOpen,
  onClose,
  onSave,
  title,
  fields,
  initialData,
  loading = false,
}) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.id]?.trim()) {
        newErrors[field.id] = `${field.label} is required`;
      }
      if (field.validate) {
        const error = field.validate(formData[field.id]);
        if (error) newErrors[field.id] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-[#131B2E]">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={field.rows || 3}
                    className={`
                      w-full px-4 py-2.5 rounded-xl border 
                      focus:outline-none focus:ring-2 focus:ring-[#0EA5A4] focus:border-transparent
                      transition bg-white
                      ${errors[field.id] ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"}
                    `}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={`
                      w-full px-4 py-2.5 rounded-xl border 
                      focus:outline-none focus:ring-2 focus:ring-[#0EA5A4] focus:border-transparent
                      transition bg-white
                      ${errors[field.id] ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"}
                    `}
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className={`
                      w-full px-4 py-2.5 rounded-xl border 
                      focus:outline-none focus:ring-2 focus:ring-[#0EA5A4] focus:border-transparent
                      transition bg-white
                      ${errors[field.id] ? "border-red-400 ring-2 ring-red-200" : "border-slate-200"}
                    `}
                  />
                )}
                {errors[field.id] && (
                  <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
                )}
                {field.helper && (
                  <p className="mt-1 text-xs text-slate-400">{field.helper}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white font-semibold shadow-lg hover:shadow-xl transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}