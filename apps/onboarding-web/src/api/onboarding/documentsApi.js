// src/api/onboarding/documentsApi.js
import client from "../client";

// Document API endpoints
const DOCUMENT_ENDPOINTS = {
  UPLOAD: "/api/onboarding/documents/upload",
  GET_ALL: "/api/onboarding/documents",
  GET_ONE: "/api/onboarding/documents",
  UPDATE: "/api/onboarding/documents",
  DELETE: "/api/onboarding/documents",
  DOWNLOAD: "/api/onboarding/documents",
  REUPLOAD: "/api/onboarding/documents",
};

/**
 * Upload a new document
 * @param {FormData} formData - Form data containing File and DocumentType
 * @returns {Promise} - API response
 */
// documentsApi.js
export const uploadDocument = async (formData) => {
  try {
    console.log("📤 Uploading document...");
    
    // Log FormData contents for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    
    const response = await client.post(
      DOCUMENT_ENDPOINTS.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    console.log("✅ Document uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Upload error:", error.response?.data);
    // Log full error details
    console.error("Error details:", error.response?.data?.errors);
    throw error.response?.data || {
      success: false,
      message: "Failed to upload document.",
    };
  }
};

/**
 * Get all documents
 * @returns {Promise} - API response
 */
export const getDocuments = async () => {
  try {
    console.log("📋 Fetching all documents...");
    
    const response = await client.get(DOCUMENT_ENDPOINTS.GET_ALL);
    
    console.log("✅ Documents fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Fetch documents error:", error.response?.data);
    throw error.response?.data || {
      success: false,
      message: "Failed to fetch documents.",
    };
  }
};

/**
 * Get a specific document by ID
 * @param {string} id - Document UUID
 * @returns {Promise} - API response
 */
export const getDocument = async (id) => {
  try {
    console.log(`📄 Fetching document ${id}...`);
    
    const response = await client.get(`${DOCUMENT_ENDPOINTS.GET_ONE}/${id}`);
    
    console.log("✅ Document fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Get document error:", error.response?.data);
    throw error.response?.data || {
      success: false,
      message: "Failed to fetch document.",
    };
  }
};



/**
 * Update/replace an existing document
 * @param {string} id - Document UUID
 * @param {FormData} formData - Form data containing File and DocumentType
 * @returns {Promise} - API response
 */
export const updateDocument = async (id, formData) => {
  try {
    console.log(`🔄 Updating document ${id}...`);
    
    const response = await client.put(
      `${DOCUMENT_ENDPOINTS.UPDATE}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    console.log("✅ Document updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update error:", error.response?.data);
    throw error.response?.data || {
      success: false,
      message: "Failed to update document.",
    };
  }
};

/**
 * Delete a document by ID
 * @param {string} id - Document UUID
 * @returns {Promise} - API response
 */
export const deleteDocument = async (id) => {
  try {
    console.log(`🗑️ Deleting document ${id}...`);
    
    const response = await client.delete(`${DOCUMENT_ENDPOINTS.DELETE}/${id}`);
    
    console.log("✅ Document deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete error:", error.response?.data);
    throw error.response?.data || {
      success: false,
      message: "Failed to delete document.",
    };
  }
};

/**
 * Download a document
 * @param {string} id - Document UUID
 * @returns {Promise} - Blob response
 */
export const downloadDocument = async (id) => {
  try {
    console.log(`⬇️ Downloading document ${id}...`);
    
    const response = await client.get(
      `${DOCUMENT_ENDPOINTS.DOWNLOAD}/${id}/download`,
      {
        responseType: "blob",
      }
    );
    
    console.log("✅ Document downloaded");
    return response.data;
  } catch (error) {
    console.error("❌ Download error:", error.response?.data);
    throw error.response?.data || {
      success: false,
      message: "Failed to download document.",
    };
  }
};

/**
 * Reupload a document (for replacing an existing one)
 * @param {string} id - Document UUID
 * @param {File} file - New file
 * @returns {Promise} - API response
 */
export const reuploadDocument = async (id, file) => {
  try {
    console.log(`🔄 Reuploading document ${id}...`);
    
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await client.post(
      `${DOCUMENT_ENDPOINTS.REUPLOAD}/${id}/reupload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    console.log("✅ Document reuploaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Reupload error:", error.response?.data);
    throw error.response?.data || {
      success: false,
      message: "Failed to reupload document.",
    };
  }
};

/**
 * Convert backend document response to frontend format
 * @param {Object} doc - Backend document object
 * @returns {Object} - Formatted document
 */
export const formatDocument = (doc) => {
  if (!doc) return null;
  
  return {
    id: doc.id,
    documentType: doc.documentType,
    fileName: doc.fileName || doc.name,
    fileUrl: doc.fileUrl || doc.url,
    fileSize: doc.fileSize || doc.size || 0,
    uploadedAt: doc.uploadedAt || doc.uploadDate || new Date().toISOString(),
    status: doc.status || "verified",
    // For backward compatibility
    backendId: doc.id,
    uploaded: true,
    processing: false,
    uploading: false,
    file: null, // Will be set separately if needed
  };
};