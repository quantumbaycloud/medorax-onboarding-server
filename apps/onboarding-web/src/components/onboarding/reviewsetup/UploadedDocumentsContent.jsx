// UploadedDocumentsContent.jsx
import { FileText, CheckCircle2, XCircle, RefreshCw, Upload } from "lucide-react";
import { useState } from "react";

function DocumentCard({
  name,
  verified = true,
  documentType,
  fileSize,
  icon = FileText,
  onEdit,
  isEditMode = false,
}) {
  const Icon = icon;
  
  return (
    <div
      className="
        flex
        flex-col xs:flex-row
        items-start xs:items-center
        justify-between
        gap-2 xs:gap-3
        rounded-xl sm:rounded-2xl
        border
        border-slate-200
        bg-white
        px-3 sm:px-4 lg:px-5
        py-3 sm:py-3.5 lg:py-4
        transition
        hover:shadow-md
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3 sm:gap-4 w-full xs:w-auto">
        <div
          className="
            w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12
            rounded-lg sm:rounded-xl
            bg-[#E7F7F3]
            flex
            items-center
            justify-center
            flex-shrink-0
          "
        >
          <Icon
            size={18}
            className="text-[#006B5F]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#131B2E] text-sm sm:text-base truncate">
            {name}
          </p>
          <p className="text-xs sm:text-sm text-slate-500">
            {documentType || "Document"} {fileSize ? `• ${Math.round(fileSize / 1024)} KB` : ""}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 flex-shrink-0 w-full xs:w-auto justify-end">
        {verified ? (
          <div
            className="
              flex
              items-center
              gap-1.5 sm:gap-2
              rounded-full
              bg-green-50
              px-2.5 sm:px-3
              py-1 sm:py-1.5
            "
          >
            <CheckCircle2
              size={14}
              className="text-green-600"
            />
            <span className="text-[10px] sm:text-sm font-semibold text-green-700">
              Verified
            </span>
          </div>
        ) : (
          <div
            className="
              flex
              items-center
              gap-1.5 sm:gap-2
              rounded-full
              bg-yellow-50
              px-2.5 sm:px-3
              py-1 sm:py-1.5
            "
          >
            <XCircle
              size={14}
              className="text-yellow-600"
            />
            <span className="text-[10px] sm:text-sm font-semibold text-yellow-700">
              Pending
            </span>
          </div>
        )}
        
        {/* Edit Button */}
        {onEdit && (
          <button
            onClick={onEdit}
            className="
              flex
              items-center
              gap-1
              rounded-lg
              border
              border-slate-200
              bg-white
              px-2 sm:px-3
              py-1
              text-slate-600
              hover:bg-slate-50
              transition
              text-xs
            "
          >
            <RefreshCw size={12} />
            <span className="hidden sm:inline">Replace</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function UploadedDocumentsContent({ documents, onEdit }) {
  const [isEditMode, setIsEditMode] = useState(false);

  // If no documents, show fallback message
  if (!documents || Object.keys(documents).length === 0) {
    return (
      <div className="text-center py-8">
        <FileText size={48} className="text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500">No documents uploaded yet.</p>
        <p className="text-sm text-slate-400">Please upload your documents in the Documents section.</p>
      </div>
    );
  }

  // Convert documents object to array
  const documentList = Object.entries(documents).map(([key, doc]) => ({
    id: key,
    name: doc.displayName || doc.fileName || key,
    documentType: doc.documentType || key,
    fileSize: doc.fileSize || 0,
    fileUrl: doc.fileUrl || "",
    uploaded: doc.uploaded !== false,
    icon: FileText,
  }));

  // Sort: show uploaded first
  const sortedDocs = documentList.sort((a, b) => {
    if (a.uploaded && !b.uploaded) return -1;
    if (!a.uploaded && b.uploaded) return 1;
    return 0;
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Document Count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          {sortedDocs.filter(d => d.uploaded).length} of {sortedDocs.length} documents uploaded
        </span>
      </div>

      {sortedDocs.map((doc) => (
        <DocumentCard
          key={doc.id}
          name={doc.name}
          verified={doc.uploaded}
          documentType={doc.documentType}
          fileSize={doc.fileSize}
          icon={doc.icon}
          onEdit={onEdit ? () => onEdit(doc.id) : undefined}
          isEditMode={isEditMode}
        />
      ))}

      {/* Edit Mode Toggle (optional) */}
      {onEdit && sortedDocs.some(d => d.uploaded) && (
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="text-sm text-[#006B5F] hover:underline font-medium mt-2"
        >
          {isEditMode ? "Done" : "Manage Documents"}
        </button>
      )}
    </div>
  );
}