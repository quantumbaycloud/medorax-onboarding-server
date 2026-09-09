// src/components/onboarding/documents/DocumentsGrid.jsx
import DocumentCard from "./DocumentCard";
import UploadGuidelines from "./UploadGuidelines";

export default function DocumentsGrid({
  config = [],
  documents = {},
  setDocuments,
  businessType = "Distributor",
  onUpload,
  onRemove,
  onView,
  onDownload,
}) {
  const getConfig = (id) =>
    config.find((item) => item.id === id);

  const renderCard = (id) => {
    const item = getConfig(id);
    if (!item) return null;

    return (
      <DocumentCard
        key={id}
        config={item}
        value={documents[id]}
        onUpload={(file) => onUpload(id, file)}
        onRemove={() => onRemove(id)}
        onView={() => onView(id)}
        onDownload={() => onDownload(id)}
        isUploading={documents[id]?.uploading || false}
        isProcessing={documents[id]?.processing || false}
        error={documents[id]?.error || null}
      />
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Top Row */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-4 sm:gap-5 lg:gap-6
        "
      >
        {renderCard("gstCertificate")}
        {renderCard("drugLicense")}
        {renderCard("panCard")}
      </div>

      {/* Bottom Row */}
      <div
        className="
          mt-4 sm:mt-5 lg:mt-6
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-4 sm:gap-5 lg:gap-6
          items-start
        "
      >
        {renderCard("aadhaarCard")}
        {renderCard("businessRegistration")}
        <UploadGuidelines />
      </div>
    </div>
  );
}