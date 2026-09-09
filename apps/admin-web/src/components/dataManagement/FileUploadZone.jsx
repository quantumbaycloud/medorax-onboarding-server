import React, { useRef, useState } from "react";

const FileUploadZone = ({
  config = {},
  onFileSelect,
}) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const acceptedTypes = Array.isArray(
    config?.acceptedTypes
  )
    ? config.acceptedTypes
    : [];

  const maxSizeMB = Number(config?.maxSizeMB) || 50;

  const validateFile = (file) => {
    if (!file) return false;

    const extension =
      "." +
      (file.name.split(".").pop() || "").toLowerCase();

    const validExtension = acceptedTypes.some(
      (type) => type.toLowerCase() === extension
    );

    const validSize =
      file.size <= maxSizeMB * 1024 * 1024;

    return validExtension && validSize;
  };

  const processFile = (file) => {
    if (!file || !validateFile(file)) {
      onFileSelect?.(null, {
        valid: false,
      });
      return;
    }

    onFileSelect?.(file, {
      valid: true,
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    processFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`flex min-h-[135px] cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed p-4 text-center transition ${
        dragging
          ? "border-blue-500 bg-blue-50"
          : "border-slate-300 bg-white hover:bg-slate-50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={acceptedTypes.join(",")}
        onChange={(event) =>
          processFile(event.target.files?.[0])
        }
      />

      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-700">
        ☁
      </div>

      <p className="max-w-md text-[11px] font-semibold leading-4 text-slate-700">
        {config?.title ||
          "Click to browse or drag and drop files here"}
      </p>

      <p className="mt-1 text-[9px] text-slate-500">
        {config?.description || ""}
      </p>

      <span className="mt-2 rounded-full bg-slate-100 px-2 py-0.5 text-[8px] font-semibold text-slate-500">
        🔒 {config?.restriction || ""}
      </span>
    </div>
  );
};

export default FileUploadZone;