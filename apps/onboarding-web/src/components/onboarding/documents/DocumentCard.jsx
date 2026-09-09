// src/components/onboarding/documents/DocumentCard.jsx
import { useState, useEffect } from "react";
import {
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import DocumentIcon from "./DocumentIcon";
import UploadDropzone from "./UploadDropzone";
import UploadedPreview from "./UploadedPreview";
import ProcessingPreview from "./ProcessingPreview";

export default function DocumentCard({
  config,
  value,
  onUpload,
  onRemove,
  onView,
  onDownload,
  isUploading = false,
  isProcessing = false,
  error = null,
}) {
  const {
    id,
    title,
    description,
    status,
    icon,
    acceptedFormats = ".pdf,.png,.jpg,.jpeg",
    maxSize = 10 * 1024 * 1024,
  } = config;

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [localError, setLocalError] = useState("");

  // Check if document is already uploaded
  const isUploaded = value?.uploaded === true || value?.backendId !== null;
  const isProcessingState = isProcessing || value?.processing === true;
  const isUploadingState = isUploading || value?.uploading === true;
  const displayError = error || value?.error || localError;

  // Simulate progress
  useEffect(() => {
    if (!isUploadingState) return;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.floor(Math.random() * 12);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isUploadingState]);

  useEffect(() => {
    if (!isProcessingState) return;
    // Processing state will be handled by parent
  }, [isProcessingState]);

  const validateFile = (file) => {
    if (!file) return false;

    const ext = "." + file.name.split(".").pop().toLowerCase();
    const allowed = acceptedFormats.split(",").map((x) => x.trim().toLowerCase());

    if (!allowed.includes(ext)) {
      setLocalError("Only PDF, JPG, JPEG and PNG files are allowed.");
      return false;
    }

    if (file.size > maxSize) {
      setLocalError("Maximum file size is 10 MB.");
      return false;
    }

    setLocalError("");
    return true;
  };

  const handleSelectFile = (file) => {
    if (!validateFile(file)) return;
    setSelectedFile(file);
    setLocalError("");
  };

  const handleUploadClick = () => {
    if (!selectedFile) return;
    onUpload(selectedFile);
    setSelectedFile(null);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setLocalError("");
    onRemove();
  };

  const currentState = isUploaded
    ? "uploaded"
    : isProcessingState
    ? "processing"
    : isUploadingState
    ? "uploading"
    : selectedFile
    ? "selected"
    : "idle";

  return (
    <div
      className="
        relative
        flex
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        p-4 sm:p-5
        min-h-[380px] sm:min-h-[420px]
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <DocumentIcon icon={icon} />
        <StatusBadge
          status={
            isUploaded
              ? "verified"
              : isProcessingState
              ? "processing"
              : status
          }
        />
      </div>

      {/* Title */}
      <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1.5 text-xs sm:text-sm leading-5 text-slate-500">
        {description}
      </p>

      {/* Error */}
      {displayError && (
        <div
          className="
            mt-3
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-3
            py-2
            flex
            items-center
            gap-2
          "
        >
          <AlertCircle size={16} className="text-red-500" />
          <span className="text-xs text-red-600">{displayError}</span>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 mt-3 sm:mt-4">
        {currentState === "processing" ? (
          <ProcessingPreview />
        ) : currentState === "uploaded" ? (
          <UploadedPreview
            file={value}
            onView={() => {
              if (onView) {
                onView();
              }
            }}
            onDownload={() => {
              if (onDownload) {
                onDownload();
              }
            }}
            onReplace={() => {
              // Allow re-upload by resetting
              setSelectedFile(null);

              // Call parent to reset state
              onRemove();
            }}
            onRemove={handleRemove}
          />
        ) : (
          <UploadDropzone
            inputId={`upload-${id}`}
            selectedFile={selectedFile}
            onSelectFile={handleSelectFile}
          />
        )}
      </div>

      {/* Upload Progress */}
      {currentState === "uploading" && (
        <div className="mt-3 sm:mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-600">
              Uploading Document...
            </span>
            <span className="text-xs font-semibold text-[#0EA5A4]">
              {uploadProgress}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 sm:mt-4">
        {currentState === "uploaded" ? null :
        currentState === "processing" ? (
          <button
            disabled
            className="
              w-full
              h-9 sm:h-10
              rounded-lg
              bg-yellow-100
              text-yellow-700
              font-semibold
              text-xs sm:text-sm
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Loader2 size={16} className="animate-spin" />
            Processing...
          </button>
        ) : currentState === "uploading" ? (
          <button
            disabled
            className="
              w-full
              h-9 sm:h-10
              rounded-lg
              bg-[#0EA5A4]
              text-white
              font-semibold
              text-xs sm:text-sm
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Loader2 size={16} className="animate-spin" />
            Uploading...
          </button>
        ) : (
          <button
            type="button"
            disabled={!selectedFile}
            onClick={handleUploadClick}
            className={`
              w-full
              h-9 sm:h-10
              rounded-lg
              font-semibold
              text-xs sm:text-sm
              transition-all
              flex
              items-center
              justify-center
              gap-2
              ${selectedFile
                ? "bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white hover:shadow-md"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }
            `}
          >
            <Upload size={16} />
            Upload Document
          </button>
        )}
      </div>
    </div>
  );
}