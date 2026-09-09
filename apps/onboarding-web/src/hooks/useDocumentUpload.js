// src/hooks/useDocumentUpload.js
import { useState } from 'react';
import {
  uploadDocument,
  updateDocument,
  deleteDocument,
} from '../api/onboarding/documentsApi';

export const useDocumentUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadDocumentFile = async (file, documentType, additionalData = {}, documentId = null) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData with correct field names
      const formData = new FormData();
      
      // Make sure field names match what the API expects
      formData.append('File', file);
      formData.append('DocumentType', documentType.toString());
      
      // Add any additional data if needed
      Object.keys(additionalData).forEach(key => {
        if (additionalData[key] !== undefined && additionalData[key] !== null) {
          formData.append(key, additionalData[key]);
        }
      });

      // Log FormData for debugging
      console.log('FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      let response;
      if (documentId) {
        response = await updateDocument(documentId, formData);
      } else {
        response = await uploadDocument(formData);
      }

      setUploadProgress(100);
      setIsUploading(false);

      return response;
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
      throw error;
    }
  };

  const deleteDocumentFile = async (documentId) => {
    try {
      const response = await deleteDocument(documentId);
      return response;
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  };

  return {
    uploadDocument: uploadDocumentFile,
    deleteDocument: deleteDocumentFile,
    isUploading,
    uploadProgress,
  };
};

// Add default export
export default useDocumentUpload;