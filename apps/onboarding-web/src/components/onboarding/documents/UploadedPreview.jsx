import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Eye,
  Download,
  RefreshCw,
  Trash2,
  Calendar,
  FileText,
} from "lucide-react";

export default function UploadedPreview({
  file,
  documentId,
  uploadDate = new Date(),
  onView = () => {},
  onDownload = () => {},
  onReplace = () => {},
  onRemove = () => {},
}) {
  if (!file) return null;

  const [preview, setPreview] = useState(null);

  const fileName = file?.name || file?.fileName || "Uploaded Document";
  const fileType = file?.type || file?.mimeType || "";
  const fileSize = file?.size || 0;

  const isImage = fileType.startsWith("image/");

  useEffect(() => {
    if (file instanceof File && isImage) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (file?.url) {
      setPreview(file.url);
      return;
    }
    setPreview(null);
  }, [file, isImage]);

  const displayName =
    fileName.length > 25
      ? fileName.substring(0, 25) + "..."
      : fileName;

  const formattedSize =
    fileSize > 0
      ? (fileSize / 1024 / 1024).toFixed(2)
      : "0.00";

  return (
    <div
      className="
        rounded-2xl
        border
        border-green-200
        bg-gradient-to-br
        from-green-50
        to-white
        overflow-hidden
      "
    >
      {/* Preview */}
      <div
        className="
          h-32 sm:h-40 md:h-48
          bg-slate-100
          flex
          items-center
          justify-center
        "
      >
        {isImage && preview ? (
          <img
            src={preview}
            alt={fileName}
            className="h-full w-full object-cover"
          />
        ) : (
          <FileText
            size={48}
            className="text-[#0EA5A4]"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex items-center gap-2">
          <CheckCircle2
            size={16}
            className="text-green-600"
          />
          <span className="font-semibold text-green-600 text-xs sm:text-sm">
            Uploaded Successfully
          </span>
        </div>

        <h4
          className="
            mt-2 sm:mt-3
            text-sm sm:text-[15px]
            font-semibold
            text-slate-800
            truncate
          "
          title={fileName}
        >
          {displayName}
        </h4>

        <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Calendar size={14} />
          <span>
            {new Date(uploadDate).toLocaleDateString()}
          </span>
          <span className="text-slate-300">•</span>
          <span>Size: {formattedSize} MB</span>
        </div>

        {documentId && (
          <div className="mt-1 text-[10px] text-slate-400">
            ID: {documentId}
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        className="
          border-t
          border-slate-200
          p-3 sm:p-4
          grid
          grid-cols-2
          gap-2 sm:gap-3
        "
      >
        <button
          onClick={onView}
          className="
            h-9 sm:h-11
            rounded-xl
            border
            border-slate-300
            hover:border-[#0EA5A4]
            flex
            items-center
            justify-center
            gap-1.5 sm:gap-2
            transition
            text-xs sm:text-sm
          "
        >
          <Eye size={16} />
          View
        </button>

        <button
          onClick={onDownload}
          className="
            h-9 sm:h-11
            rounded-xl
            border
            border-slate-300
            hover:border-[#0EA5A4]
            flex
            items-center
            justify-center
            gap-1.5 sm:gap-2
            transition
            text-xs sm:text-sm
          "
        >
          <Download size={16} />
          Download
        </button>

        <button
          onClick={onReplace}
          className="
            h-9 sm:h-11
            rounded-xl
            border
            border-[#0EA5A4]
            text-[#0EA5A4]
            hover:bg-[#0EA5A4]/5
            flex
            items-center
            justify-center
            gap-1.5 sm:gap-2
            transition
            text-xs sm:text-sm
          "
        >
          <RefreshCw size={16} />
          Replace
        </button>

        <button
          onClick={onRemove}
          className="
            h-9 sm:h-11
            rounded-xl
            border
            border-red-200
            text-red-600
            hover:bg-red-50
            flex
            items-center
            justify-center
            gap-1.5 sm:gap-2
            transition
            text-xs sm:text-sm
          "
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}