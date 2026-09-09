// src/components/onboarding/documents/uploadHelpers.js
import {
  uploadDocument,
  updateDocument,
  deleteDocument,
  downloadDocument,
  reuploadDocument,
  getDocuments,
  formatDocument,
} from "../../../api/onboarding/documentsApi";

export const uploadService = {
  /**
   * Upload document to backend
   * @param {FormData} formData - Form data with File and DocumentType
   * @param {string} documentId - Optional existing document ID for update
   * @returns {Promise} - Upload result
   */
  uploadDocument: async (formData, documentId = null) => {
    try {
      // For backend integration
      const response = documentId 
        ? await updateDocument(documentId, formData)
        : await uploadDocument(formData);

      // Extract data from response
      const data = response.data || response;
      
      return {
        success: true,
        documentId: data.id || data.documentId || `doc-${Date.now()}`,
        documentType: data.documentType || parseInt(formData.get('DocumentType')),
        fileUrl: data.fileUrl || data.url,
        fileName: data.fileName || data.name || formData.get('File')?.name || 'document.pdf',
        fileSize: data.fileSize || data.size || 0,
        uploadDate: data.uploadedAt || data.uploadDate || new Date().toISOString(),
        message: data.message || 'Document uploaded successfully',
        data: data,
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  /**
   * Get all documents
   * @returns {Promise<Array>} - List of documents
   */
  getDocuments: async () => {
    try {
      const response = await getDocuments();
      const data = response.data || response;
      
      // If response is an array, format each document
      if (Array.isArray(data)) {
        return data.map(doc => formatDocument(doc));
      }
      
      // If response has items property
      if (data.items && Array.isArray(data.items)) {
        return data.items.map(doc => formatDocument(doc));
      }
      
      return [];
    } catch (error) {
      console.error('Fetch documents error:', error);
      throw error;
    }
  },

  /**
   * Download document
   * @param {string} documentId - Document UUID
   * @param {string} fileName - Optional file name for download
   * @returns {Promise<Blob>} - Document blob
   */
  downloadDocument: async (documentId, fileName = null) => {
    try {
      const blob = await downloadDocument(documentId);
      
      // Trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || `document-${documentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return blob;
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },

  /**
   * Delete document
   * @param {string} documentId - Document UUID
   * @returns {Promise} - Delete result
   */
  deleteDocument: async (documentId) => {
    try {
      const response = await deleteDocument(documentId);
      return { 
        success: true, 
        documentId,
        data: response.data || response 
      };
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  },

  /**
   * Reupload document
   * @param {string} documentId - Document UUID
   * @param {File} file - New file
   * @returns {Promise} - Reupload result
   */
  reuploadDocument: async (documentId, file) => {
    try {
      const response = await reuploadDocument(documentId, file);
      const data = response.data || response;
      
      return {
        success: true,
        documentId: data.id || documentId,
        fileUrl: data.fileUrl || data.url,
        fileName: data.fileName || data.name || file.name,
        fileSize: data.fileSize || data.size || file.size,
        uploadDate: data.uploadedAt || data.uploadDate || new Date().toISOString(),
        message: data.message || 'Document reuploaded successfully',
        data: data,
      };
    } catch (error) {
      console.error('Reupload error:', error);
      throw error;
    }
  },

  /**
   * Create a form data object for document upload
   * @param {File} file - File to upload
   * @param {number} documentType - Document type enum value
   * @param {Object} additionalData - Additional form fields
   * @returns {FormData} - Form data
   */
  createFormData: (file, documentType, additionalData = {}) => {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('DocumentType', documentType.toString());
    
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });
    
    return formData;
  },
};

export { formatDocument };