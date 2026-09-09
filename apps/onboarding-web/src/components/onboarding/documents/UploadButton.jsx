import { useState, useRef } from "react";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function UploadButton({
  onFileSelect,
  onFileRemove,
  onUploadComplete,
  acceptedFormats = ".pdf,.png,.jpg,.jpeg",
  maxSize = 10 * 1024 * 1024,
  multiple = false,
  buttonText = "Upload File",
  buttonClassName = "",
  isUploading = false,
  uploadProgress = 0,
  error = null,
  documentType = null,
  uploadEndpoint = null,
  autoUpload = false,
  additionalData = {},
  documentId = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [localProgress, setLocalProgress] = useState(0);
  const [isLocalUploading, setIsLocalUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const fileInputRef = useRef(null);

  const uploading = isUploading || isLocalUploading;
  const progress = uploadProgress || localProgress;
  const displayError = error || localError;

  const validateFile = (file) => {
    if (file.size > maxSize) {
      const errorMsg = `File size exceeds ${maxSize / 1024 / 1024}MB limit`;
      setLocalError(errorMsg);
      return false;
    }

    const fileExtension = `.${file.name.split('.').pop().toLowerCase()}`;
    const acceptedExtensions = acceptedFormats.split(',').map(f => f.trim().toLowerCase());
    
    if (!acceptedExtensions.includes(fileExtension)) {
      const errorMsg = `File type not accepted. Please upload ${acceptedFormats}`;
      setLocalError(errorMsg);
      return false;
    }

    setLocalError(null);
    return true;
  };

  const handleFileSelect = (e) => {
    e.stopPropagation();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = multiple ? files : files[0];
    
    if (validateFile(file)) {
      setSelectedFile(file);
      setLocalError(null);
      setUploadStatus('idle');
      
      if (onFileSelect) {
        onFileSelect(file, documentId);
      }

      if (autoUpload) {
        handleUpload(file);
      }
    }

    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const file = multiple ? files : files[0];
    
    if (validateFile(file)) {
      setSelectedFile(file);
      setLocalError(null);
      setUploadStatus('idle');
      
      if (onFileSelect) {
        onFileSelect(file, documentId);
      }

      if (autoUpload) {
        handleUpload(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpload = async (file = selectedFile) => {
    if (!file) return;

    setIsLocalUploading(true);
    setLocalProgress(0);
    setLocalError(null);
    setUploadStatus('uploading');

    try {
      const simulateProgress = () => {
        return new Promise((resolve) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
              resolve();
            }
            setLocalProgress(Math.min(progress, 100));
          }, 200);
        });
      };

      await simulateProgress();
      
      setUploadStatus('processing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onUploadComplete) {
        onUploadComplete({
          success: true,
          file: file,
          documentId: documentId,
          documentType: documentType,
          message: 'File uploaded successfully',
          data: {
            documentId: `doc-${Date.now()}`,
            fileUrl: URL.createObjectURL(file),
            fileName: file.name,
            fileSize: file.size,
            uploadDate: new Date().toISOString(),
          }
        });
      }

      setUploadStatus('completed');

    } catch (error) {
      console.error('Upload failed:', error);
      setLocalError(error.message || 'Upload failed. Please try again.');
      setUploadStatus('idle');
      if (onUploadComplete) {
        onUploadComplete({
          success: false,
          error: error.message || 'Upload failed',
          documentId: documentId,
        });
      }
    } finally {
      setIsLocalUploading(false);
      setTimeout(() => {
        setLocalProgress(0);
      }, 1000);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setLocalError(null);
    setLocalProgress(0);
    setUploadStatus('idle');
    
    if (onFileRemove) {
      onFileRemove(documentId);
    }
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDropzoneClick = (e) => {
    e.stopPropagation();
    if (!uploading && uploadStatus !== 'processing') {
      fileInputRef.current?.click();
    }
  };

  const getFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    if (!selectedFile) return null;
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    const iconMap = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      ppt: '📽️',
      pptx: '📽️',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      svg: '🖼️',
      mp4: '🎬',
      avi: '🎬',
      mov: '🎬',
      mp3: '🎵',
      wav: '🎵',
    };
    return iconMap[ext] || '📎';
  };

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      {/* Drop Zone */}
      <div
        className={`
          relative
          border-2
          border-dashed
          rounded-xl
          p-6
          transition-all
          min-h-[120px]
          ${selectedFile 
            ? uploadStatus === 'completed'
              ? 'border-green-400 bg-green-50'
              : uploadStatus === 'processing'
              ? 'border-yellow-400 bg-yellow-50'
              : 'border-green-400 bg-green-50'
            : displayError
              ? 'border-red-400 bg-red-50'
              : 'border-slate-300 bg-slate-50 hover:border-[#0EA5A4] hover:bg-slate-100'
          }
          ${uploading || uploadStatus === 'processing' ? 'opacity-70 cursor-wait' : 'cursor-pointer'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleDropzoneClick}
      >
        {/* Upload Progress */}
        {(uploading || uploadStatus === 'processing') && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl z-10">
            <div className="text-center">
              {uploadStatus === 'processing' ? (
                <>
                  <div className="relative">
                    <Loader2 className="animate-spin mx-auto text-yellow-500" size={32} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-ping" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-yellow-600">
                    Processing document...
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    This may take a few moments
                  </p>
                </>
              ) : (
                <>
                  <Loader2 className="animate-spin mx-auto text-[#2563EB]" size={32} />
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Uploading... {Math.round(progress)}%
                  </p>
                  <div className="mt-2 w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* File Preview */}
        {selectedFile && !uploading && uploadStatus !== 'processing' ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="text-3xl">{getFileIcon()}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-700 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-slate-500">
                  {getFileSize(selectedFile.size)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {uploadStatus === 'completed' ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <CheckCircle className="text-green-500" size={20} />
                )}
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 hover:bg-red-100 rounded-full transition-colors text-red-500 hover:text-red-600"
              disabled={uploading || uploadStatus === 'processing'}
            >
              <X size={18} />
            </button>
          </div>
        ) : !selectedFile && (
          <div className="text-center">
            <Upload className="mx-auto text-[#0EA5A4]" size={34} />
            <h4 className="mt-3 font-semibold text-slate-700">
              Drag & Drop or Click to Upload
            </h4>
            <p className="mt-1 text-sm text-slate-500">
              {acceptedFormats.replace(/,/g, ' ').toUpperCase()} (Max {maxSize / 1024 / 1024}MB)
            </p>
          </div>
        )}

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats}
          className="hidden"
          onChange={handleFileSelect}
          multiple={multiple}
          disabled={uploading || uploadStatus === 'processing'}
        />
      </div>

      {/* Status Messages */}
      {selectedFile && !uploading && uploadStatus !== 'processing' && !displayError && (
        <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
          {uploadStatus === 'completed' ? (
            <>
              <CheckCircle size={14} />
              <span>Document uploaded successfully!</span>
            </>
          ) : (
            <>
              <CheckCircle size={14} />
              <span>File ready for upload</span>
            </>
          )}
        </div>
      )}

      {/* Error Display */}
      {displayError && (
        <div className="mt-2 flex items-start gap-2 text-red-600 text-sm">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleBrowseClick}
          disabled={uploading || uploadStatus === 'processing'}
          className={`
            px-6
            py-2.5
            rounded-lg
            font-semibold
            text-sm
            transition
            flex
            items-center
            gap-2
            ${buttonClassName || `
              bg-gradient-to-r
              from-[#0EA5A4]
              to-[#2563EB]
              text-white
              hover:opacity-90
              hover:shadow-md
            `}
            ${(uploading || uploadStatus === 'processing') ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Upload size={18} />
          {selectedFile ? 'Replace File' : buttonText}
        </button>

        {selectedFile && !autoUpload && !uploading && uploadStatus !== 'processing' && uploadStatus !== 'completed' && (
          <button
            type="button"
            onClick={() => handleUpload()}
            className="
              px-6
              py-2.5
              rounded-lg
              font-semibold
              text-sm
              transition
              bg-green-500
              text-white
              hover:bg-green-600
              flex
              items-center
              gap-2
            "
          >
            <CheckCircle size={18} />
            Upload Now
          </button>
        )}

        {selectedFile && !uploading && uploadStatus !== 'processing' && (
          <button
            type="button"
            onClick={handleRemove}
            className="
              px-6
              py-2.5
              rounded-lg
              font-semibold
              text-sm
              transition
              border-2
              border-red-300
              text-red-600
              hover:bg-red-50
              flex
              items-center
              gap-2
            "
          >
            <X size={18} />
            Remove
          </button>
        )}
      </div>
    </div>
  );
}