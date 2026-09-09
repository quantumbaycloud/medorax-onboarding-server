import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";
import DocumentsLayout from "../../components/onboarding/documents/DocumentsLayout";

import { documentConfig } from "../../components/onboarding/documents/documentConfig";

import client, {
  getApiErrorMessage,
} from "../../api/client";


const createDocumentState = () => ({
  file: null,
  uploaded: false,
  processing: false,
  uploading: false,
  progress: 0,

  backendId: null,

  error: null,

  fileName: null,
  fileSize: null,

  fileUrl: null,

  documentType: null,

  uploadedAt: null,
});


export default function DocumentsPage() {
  const navigate = useNavigate();


  const [documents, setDocuments] =
    useState(() =>
      Object.fromEntries(
        documentConfig.map(
          (config) => [
            config.id,
            createDocumentState(),
          ]
        )
      )
    );


  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [businessType, setBusinessType] =
    useState("Pharmacy");


  /**
   * LOAD DOCUMENTS
   */
  const load = useCallback(
    async () => {
      try {
        setLoading(true);

        const [me, docs] =
          await Promise.all([
            client.get(
              "/api/auth/me"
            ),

            client.get(
              "/api/onboarding/documents"
            ),
          ]);


        const type =
          me.data?.user
            ?.businessType ||
          "Pharmacy";

        setBusinessType(type);


        const map =
          Object.fromEntries(
            documentConfig.map(
              (config) => [
                config.id,
                createDocumentState(),
              ]
            )
          );


        if (
          Array.isArray(
            docs.data
          )
        ) {
          docs.data.forEach(
            (doc) => {
              const config =
                documentConfig.find(
                  (item) =>
                    item.documentType ===
                    doc.documentType
                );


              if (!config) {
                return;
              }


              map[config.id] = {
                ...map[config.id],

                uploaded:
                  true,

                backendId:
                  doc.id,

                fileName:
                  doc.fileName,

                fileSize:
                  doc.fileSize,

                documentType:
                  doc.documentType,

                uploadedAt:
                  doc.uploadedAt,

                fileUrl:
                  null,

                error:
                  null,
              };
            }
          );
        }


        setDocuments(map);

        setError(null);
      } catch (err) {
        console.error(
          "❌ Failed to load documents:",
          err.response?.data ||
          err.message
        );


        const message =
          getApiErrorMessage(
            err,
            "Unable to load documents."
          );


        if (
          err.response?.status ===
          401
        ) {
          setError(
            "Your session has expired. Please login again."
          );
        } else {
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );


  useEffect(() => {
    document.title =
      "Documents | MEDORAX";

    load();
  }, [load]);


  /**
   * BACK
   */
  const handleBack = () => {
    navigate(
      "/business-location"
    );
  };


  /**
   * UPLOAD DOCUMENT
   */
  const handleUpload = async (
    documentId,
    file
  ) => {
    if (!file) {
      return;
    }


    const config =
      documentConfig.find(
        (item) =>
          item.id === documentId
      );


    if (!config) {
      console.error(
        "❌ Document config not found:",
        documentId
      );

      return;
    }


    /**
     * VALIDATE EXTENSION
     */
    const acceptedFormats =
      config.acceptedFormats
        .toLowerCase()
        .split(",")
        .map(
          (ext) =>
            ext.trim()
        )
        .filter(Boolean);


    const validExtension =
      acceptedFormats.some(
        (ext) =>
          file.name
            .toLowerCase()
            .endsWith(ext)
      );


    if (!validExtension) {
      const message =
        `Invalid file type for ${config.title}.`;


      setDocuments(
        (prev) => ({
          ...prev,

          [documentId]: {
            ...prev[
            documentId
            ],

            error: message,
          },
        })
      );


      setError(message);

      return;
    }


    /**
     * VALIDATE SIZE
     */
    if (
      file.size >
      config.maxSize
    ) {
      const message =
        `${config.title} exceeds the maximum file size.`;


      setDocuments(
        (prev) => ({
          ...prev,

          [documentId]: {
            ...prev[
            documentId
            ],

            error: message,
          },
        })
      );


      setError(message);

      return;
    }


    setIsUploading(true);


    setDocuments(
      (prev) => ({
        ...prev,

        [documentId]: {
          ...prev[
          documentId
          ],

          file,

          uploading:
            true,

          uploaded:
            false,

          progress: 0,

          error: null,
        },
      })
    );


    try {
      /**
       * CREATE REAL FormData
       */
      const formData =
        new FormData();


      /**
       * EXACT FIELD NAME
       *
       * Backend:
       *
       * documentType: int = Form(...)
       */
      formData.append(
        "documentType",
        String(
          config.documentType
        )
      );


      /**
       * EXACT FIELD NAME
       *
       * Backend:
       *
       * file: UploadFile = File(...)
       */
      formData.append(
        "file",
        file,
        file.name
      );


      /**
       * DEBUG
       *
       * This proves that the browser
       * actually contains the file.
       */
      console.log(
        "=============================="
      );

      console.log(
        "📤 DOCUMENT UPLOAD"
      );

      console.log(
        "documentType:",
        formData.get(
          "documentType"
        )
      );

      const uploadedFile =
        formData.get("file");


      console.log(
        "file:",
        uploadedFile
          ? {
            name:
              uploadedFile.name,

            size:
              uploadedFile.size,

            type:
              uploadedFile.type,
          }
          : null
      );

      console.log(
        "=============================="
      );


      /**
       * IMPORTANT
       *
       * Do NOT put:
       *
       * headers: {
       *   "Content-Type":
       *      "application/json"
       * }
       *
       * Do NOT manually put:
       *
       * multipart/form-data
       *
       * Axios/browser creates the boundary.
       */
      const response =
        await client.post(
          "/api/onboarding/documents/upload",

          formData,

          {
            onUploadProgress:
              (event) => {
                if (
                  !event.total
                ) {
                  return;
                }


                const progress =
                  Math.round(
                    (event.loaded /
                      event.total) *
                    100
                  );


                setDocuments(
                  (prev) => ({
                    ...prev,

                    [documentId]:
                    {
                      ...prev[
                      documentId
                      ],

                      progress,
                    },
                  })
                );
              },
          }
        );


      const result =
        response.data;


      console.log(
        "✅ DOCUMENT UPLOAD SUCCESS:",
        result
      );


      /**
       * UPDATE STATE
       */
      setDocuments(
        (prev) => ({
          ...prev,

          [documentId]: {
            ...prev[
            documentId
            ],

            file: null,

            uploading:
              false,

            uploaded:
              true,

            progress: 100,

            backendId:
              result.id,

            fileName:
              result.fileName ||
              file.name,

            fileSize:
              result.fileSize ||
              file.size,

            fileUrl:
              null,

            documentType:
              result.documentType ||
              config.documentType,

            uploadedAt:
              result.uploadedAt,

            error: null,
          },
        })
      );


      setError(null);
    } catch (err) {
      console.error(
        "❌ Upload error:",
        err.response?.data ||
        err.message
      );


      /**
       * ALWAYS convert API error
       * to a STRING.
       */
      const message =
        getApiErrorMessage(
          err,
          "Document upload failed. Please try again."
        );


      setDocuments(
        (prev) => ({
          ...prev,

          [documentId]: {
            ...prev[
            documentId
            ],

            uploading:
              false,

            uploaded:
              false,

            progress: 0,

            error: message,
          },
        })
      );


      if (
        err.response?.status ===
        401
      ) {
        setError(
          "Your session has expired. Please login again."
        );
      } else {
        setError(message);
      }
    } finally {
      setIsUploading(false);
    }
  };


  /**
   * REMOVE
   */
  const handleRemove = async (
    documentId
  ) => {
    const doc =
      documents[documentId];


    if (!doc?.backendId) {
      setDocuments(
        (prev) => ({
          ...prev,

          [documentId]:
            createDocumentState(),
        })
      );

      return;
    }


    try {
      await client.delete(
        `/api/onboarding/documents/${doc.backendId}`
      );


      setDocuments(
        (prev) => ({
          ...prev,

          [documentId]:
            createDocumentState(),
        })
      );


      setError(null);
    } catch (err) {
      console.error(
        "❌ Delete document error:",
        err.response?.data ||
        err.message
      );


      setError(
        getApiErrorMessage(
          err,
          "Failed to delete document."
        )
      );
    }
  };


  /**
   * DOWNLOAD
   */
  /**
 * VIEW
 */
/**
 * VIEW
 */
const handleView = async (documentId) => {
  const doc = documents[documentId];

  if (!doc?.backendId) {
    alert("Document is not available.");
    return;
  }

  try {
    const response = await client.get(
      `/api/onboarding/documents/${doc.backendId}/download`,
      {
        responseType: "blob",
      }
    );

    const contentType =
      response.headers?.["content-type"] ||
      doc.mimeType ||
      "application/octet-stream";

    const blob = new Blob([response.data], {
      type: contentType,
    });

    const url = URL.createObjectURL(blob);

    // Create an invisible link and trigger it.
    // This avoids the popup-blocker issue.
    const link = document.createElement("a");

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Keep the blob URL alive while the new tab loads.
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  } catch (err) {
    console.error(
      "❌ View document error:",
      err.response?.data || err
    );

    alert(
      getApiErrorMessage(
        err,
        "Failed to view document."
      )
    );
  }
};

/**
 * DOWNLOAD
 */
const handleDownload = async (documentId) => {
  const doc = documents[documentId];

  if (!doc?.backendId) {
    alert("Document is not available.");
    return;
  }

  try {
    const response = await client.get(
      `/api/onboarding/documents/${doc.backendId}/download`,
      {
        responseType: "blob",
      }
    );

    const contentType =
      response.headers?.["content-type"] ||
      doc.mimeType ||
      "application/octet-stream";

    const blob = new Blob([response.data], {
      type: contentType,
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download =
      doc.fileName ||
      `document-${documentId}`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Do not revoke immediately because browser may
    // still be starting the download.
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (err) {
    console.error(
      "❌ Download document error:",
      err.response?.data || err
    );

    alert(
      getApiErrorMessage(
        err,
        "Failed to download document."
      )
    );
  }
};


  /**
   * REQUIRED DOCUMENTS
   */
  const requiredDocuments =
    documentConfig
      .filter(
        (config) =>
          config.status ===
          "required"
      )
      .map(
        (config) =>
          config.id
      );


  const isAllRequiredUploaded =
    requiredDocuments.every(
      (id) =>
        documents[id]
          ?.uploaded
    );


  /**
   * CONTINUE
   */
  const handleContinue = () => {
    if (
      !isAllRequiredUploaded
    ) {
      alert(
        "Please upload all required documents."
      );

      return;
    }


    navigate(
      "/plan-payment"
    );
  };


  /**
   * LOADING
   */
  if (loading) {
    return (
      <VerificationLayout active="Documents">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-sm text-gray-500">
            Loading documents...
          </div>
        </div>
      </VerificationLayout>
    );
  }


  return (
    <VerificationLayout active="Documents">
      <div className="flex h-full min-h-0 w-full flex-col">

        {error && (
          <div className="mb-4 shrink-0 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {String(error)}
          </div>
        )}

        <div className="flex-1 min-h-0">
          <DocumentsLayout
            businessType={businessType}
            config={documentConfig}
            documents={documents}
            setDocuments={setDocuments}
            onBack={handleBack}
            onContinue={handleContinue}
            isSubmitting={isUploading}
            onUpload={handleUpload}
            onRemove={handleRemove}
            onView={handleView}
            onDownload={handleDownload}
          />
        </div>

      </div>
    </VerificationLayout>
  );
}