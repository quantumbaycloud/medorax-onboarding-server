import { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  Image,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function UploadDropzone({
  inputId,
  selectedFile,
  onSelectFile,
  acceptedFormats = ".pdf,.png,.jpg,.jpeg",
  maxSize = 10 * 1024 * 1024,
}) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return false;

    const extension =
      "." +
      file.name
        .split(".")
        .pop()
        .toLowerCase();

    const allowed =
      acceptedFormats
        .split(",")
        .map((e) => e.trim().toLowerCase());

    if (!allowed.includes(extension)) {
      setError(
        "Only PDF, PNG, JPG and JPEG files are allowed."
      );
      return false;
    }

    if (file.size > maxSize) {
      setError(
        "Maximum file size is 10 MB."
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleFiles = (file) => {
    if (!validateFile(file)) return;
    onSelectFile(file);
  };

  const handleInput = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFiles(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    handleFiles(file);
  };

  const isImage =
    selectedFile &&
    selectedFile.type.startsWith("image/");

  const preview =
    isImage
      ? URL.createObjectURL(selectedFile)
      : null;

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() =>
          setDragging(false)
        }
        onDrop={handleDrop}
        onClick={() =>
          inputRef.current?.click()
        }
        className={`
          rounded-2xl
          border-2
          border-dashed
          transition
          duration-300
          cursor-pointer
          p-4 sm:p-5 md:p-7
          ${dragging
            ? "border-[#0EA5A4] bg-[#F3FFFD]"
            : "border-slate-300 bg-slate-50 hover:border-[#0EA5A4]"
          }
        `}
      >
        {!selectedFile ? (
          <div className="text-center">
            <UploadCloud
              className="mx-auto text-[#0EA5A4]"
              size={36}
            />
            <h4 className="mt-3 text-sm sm:text-base md:text-lg font-semibold">
              Drag & Drop File
            </h4>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">
              or click to browse
            </p>
            <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-slate-400">
              PDF • PNG • JPG • JPEG
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-5">
            {isImage ? (
              <img
                src={preview}
                alt=""
                className="
                  h-28 sm:h-36 md:h-44
                  w-full
                  rounded-xl
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  h-24 sm:h-32 md:h-40
                  rounded-xl
                  bg-slate-100
                  flex
                  items-center
                  justify-center
                "
              >
                <FileText
                  size={40}
                  className="text-[#0EA5A4]"
                />
              </div>
            )}

            <div
              className="
                rounded-xl
                border
                border-green-200
                bg-green-50
                p-3 sm:p-4
                flex
                gap-2 sm:gap-3
              "
            >
              <CheckCircle2
                className="text-green-600 flex-shrink-0"
                size={16}
              />
              <div className="min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          id={inputId}
          hidden
          type="file"
          accept={acceptedFormats}
          onChange={handleInput}
        />
      </div>

      {error && (
        <div
          className="
            mt-3
            rounded-xl
            bg-red-50
            border
            border-red-200
            px-3 sm:px-4
            py-2 sm:py-3
            flex
            gap-2
          "
        >
          <AlertCircle
            className="text-red-500 flex-shrink-0"
            size={16}
          />
          <span className="text-xs sm:text-sm text-red-600">
            {error}
          </span>
        </div>
      )}
    </div>
  );
}