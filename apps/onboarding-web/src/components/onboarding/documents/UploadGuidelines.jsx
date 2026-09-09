import {
  CircleAlert,
  CheckCircle2,
} from "lucide-react";

export default function UploadGuidelines() {
  return (
    <div
      className="
        bg-[#F2FCFB]
        border
        border-[#D5F1EC]
        rounded-2xl sm:rounded-3xl
        p-4 sm:p-5 lg:p-7
        h-full
        min-h-[280px] sm:min-h-[350px] lg:min-h-[430px]
        shadow-sm
      "
    >
      <div className="flex items-center gap-2">
        <CircleAlert className="text-[#006B5F]" size={18} />
        <h3 className="font-bold text-base sm:text-lg">
          Upload Guidelines
        </h3>
      </div>

      <div className="mt-3 sm:mt-4 lg:mt-5 space-y-3 sm:space-y-4">
        <div className="flex gap-2 sm:gap-3">
          <CheckCircle2
            className="text-green-500 flex-shrink-0"
            size={16}
          />
          <p className="text-xs sm:text-sm text-slate-600">
            Upload PDF, JPG or PNG files.
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <CheckCircle2
            className="text-green-500 flex-shrink-0"
            size={16}
          />
          <p className="text-xs sm:text-sm text-slate-600">
            Maximum file size: 10 MB.
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <CheckCircle2
            className="text-green-500 flex-shrink-0"
            size={16}
          />
          <p className="text-xs sm:text-sm text-slate-600">
            Ensure documents are clear and readable.
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <CheckCircle2
            className="text-green-500 flex-shrink-0"
            size={16}
          />
          <p className="text-xs sm:text-sm text-slate-600">
            Avoid cropped or blurry images.
          </p>
        </div>
      </div>
    </div>
  );
}