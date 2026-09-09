// src/components/onboarding/documents/DocumentsLayout.jsx

import DocumentsHeader from "./DocumentsHeader";
import DocumentsGrid from "./DocumentsGrid";
import DocumentsFooter from "./DocumentsFooter";

export default function DocumentsLayout({
  businessType,
  config = [],
  documents = {},
  setDocuments,
  onBack,
  onContinue,
  isSubmitting = false,
  onUpload,
  onRemove,
  onView,
  onDownload,
}) {
  const requiredDocs = config.filter(
    (doc) => doc.status === "required"
  );

  const isUploaded = (value) => {
    if (!value) return false;

    if (value instanceof File) {
      return true;
    }

    if (typeof value === "object") {
      return (
        value.uploaded === true ||
        value.file instanceof File ||
        (value.backendId && value.uploaded === true)
      );
    }

    return false;
  };

  const uploadedRequired = requiredDocs.filter(
    (doc) => isUploaded(documents[doc.id])
  ).length;

  const uploadedCount = Object.values(documents).filter(
    isUploaded
  ).length;

  const isAllRequiredUploaded =
    uploadedRequired === requiredDocs.length;

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#F8FAFC]">

      {/* ============================= */}
      {/* SCROLLABLE DOCUMENT CONTENT */}
      {/* ============================= */}

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div
          className="
            max-w-[1450px]
            mx-auto
            px-3
            sm:px-6
            lg:px-8
            pt-4
            sm:pt-6
            lg:pt-8
            pb-8
          "
        >

          {/* HEADER */}
          <DocumentsHeader
            uploadedCount={uploadedCount}
            total={config.length}
            requiredCount={requiredDocs.length}
            uploadedRequired={uploadedRequired}
          />

          {/* DOCUMENT GRID */}
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <DocumentsGrid
              businessType={businessType}
              config={config}
              documents={documents}
              setDocuments={setDocuments}
              onUpload={onUpload}
              onRemove={onRemove}
              onView={onView}
              onDownload={onDownload}
            />
          </div>

        </div>
      </div>

      {/* ============================= */}
      {/* FIXED DOCUMENT FOOTER */}
      {/* ============================= */}

      <div
        className="
          shrink-0
          border-t
          border-slate-200
          bg-white
          shadow-[0_-8px_30px_rgba(15,23,42,.06)]
          backdrop-blur-md
        "
      >
        <div className="max-w-[1450px] mx-auto px-3 sm:px-6 lg:px-8">

          <DocumentsFooter
            onBack={onBack}
            onContinue={onContinue}
            isSubmitting={isSubmitting}
            uploadedCount={uploadedCount}
            totalDocs={config.length}
            isAllRequiredUploaded={
              isAllRequiredUploaded
            }
          />

        </div>
      </div>

    </div>
  );
}