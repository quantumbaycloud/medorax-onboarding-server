import UploadDropzone from "../documents/UploadDropzone";
import UploadedPreview from "../documents/UploadedPreview";
import ProcessingPreview from "../documents/ProcessingPreview";
import { FileCheck2, AlertCircle } from "lucide-react";

export default function CancelledChequeCard({
  bankData,
  uploadCancelledCheque,
  removeCheque,
}) {
  const handleSelectFile = (file) => {
    if (!file) return;
    uploadCancelledCheque(file);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header - Compact */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5A4]/10">
          <FileCheck2 className="text-[#0EA5A4]" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Cancelled Cheque
          </h2>
          <p className="text-xs text-slate-500">
            Upload your cancelled cheque for bank verification.
          </p>
        </div>
      </div>

      {/* Upload Area - Compact */}
      <div className="mt-4">
        {bankData.chequeProcessing ? (
          <ProcessingPreview />
        ) : bankData.chequeUploaded ? (
          <UploadedPreview
            file={bankData.cheque}
            onView={() => {
              const url = URL.createObjectURL(bankData.cheque);
              window.open(url, "_blank");
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
            onDownload={() => {
              const url = URL.createObjectURL(bankData.cheque);
              const a = document.createElement("a");
              a.href = url;
              a.download = bankData.cheque.name;
              a.click();
              setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
            onReplace={() => removeCheque()}
            onRemove={removeCheque}
          />
        ) : (
          <UploadDropzone
            inputId="cancelled-cheque"
            selectedFile={bankData.cheque}
            onSelectFile={handleSelectFile}
          />
        )}
      </div>

      {/* Uploading - Compact */}
      {bankData.chequeUploading && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-600">
              Uploading Cancelled Cheque...
            </span>
            <span className="text-xs font-semibold text-[#0EA5A4]">
              Processing
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="
                h-full
                w-2/3
                animate-pulse
                rounded-full
                bg-gradient-to-r
                from-[#0EA5A4]
                to-[#2563EB]
              "
            />
          </div>
        </div>
      )}

      {/* Info - Compact */}
      <div
        className="
          mt-4
          rounded-xl
          border
          border-[#CDEEE8]
          bg-[#F4FCFA]
          p-3
        "
      >
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 text-[#0EA5A4]" />
          <p className="text-xs leading-5 text-slate-600">
            Make sure your account holder name, account number and IFSC are clearly
            visible on the cancelled cheque.
          </p>
        </div>
      </div>
    </div>
  );
}