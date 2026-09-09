import {
  Eye,
  Download,
  RefreshCw,
  Trash2,
} from "lucide-react";

export default function ViewDocumentButton({
  file,
  onView,
  onDownload,
  onReplace,
  onRemove,
}) {
  if (!file) return null;

  const handleView = () => {
    if (onView) return onView(file);

    const url = URL.createObjectURL(file);
    window.open(url, "_blank");

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const handleDownload = () => {
    if (onDownload) return onDownload(file);

    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-2 gap-3">

      <button
        onClick={handleView}
        className="
          h-11
          rounded-xl
          border
          border-slate-300
          hover:border-[#0EA5A4]
          hover:bg-[#0EA5A4]/5
          transition
          flex
          items-center
          justify-center
          gap-2
          font-medium
        "
      >
        <Eye size={18} />
        View
      </button>

      <button
        onClick={handleDownload}
        className="
          h-11
          rounded-xl
          border
          border-slate-300
          hover:border-[#2563EB]
          hover:bg-[#2563EB]/5
          transition
          flex
          items-center
          justify-center
          gap-2
          font-medium
        "
      >
        <Download size={18} />
        Download
      </button>

      <button
        onClick={onReplace}
        className="
          h-11
          rounded-xl
          border
          border-[#0EA5A4]
          text-[#0EA5A4]
          hover:bg-[#0EA5A4]/5
          transition
          flex
          items-center
          justify-center
          gap-2
          font-medium
        "
      >
        <RefreshCw size={18} />
        Replace
      </button>

      <button
        onClick={onRemove}
        className="
          h-11
          rounded-xl
          border
          border-red-200
          text-red-600
          hover:bg-red-50
          transition
          flex
          items-center
          justify-center
          gap-2
          font-medium
        "
      >
        <Trash2 size={18} />
        Remove
      </button>

    </div>
  );
}