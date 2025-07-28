import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle, Scale, Shield } from 'lucide-react';

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  error?: string;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onFileSelect,
  isProcessing,
  error
}) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`
          border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 bg-white shadow-lg
          ${isProcessing 
            ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50' 
            : 'border-slate-300 hover:border-amber-500 hover:bg-gradient-to-br hover:from-amber-50 hover:to-yellow-50'
          }
          ${error ? 'border-red-400 bg-gradient-to-br from-red-50 to-pink-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center space-y-6">
          {isProcessing ? (
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600"></div>
              <Scale className="absolute inset-0 m-auto h-6 w-6 text-amber-600" />
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 rounded-full">
              <AlertCircle className="h-16 w-16 text-red-600" />
            </div>
          ) : (
            <div className="p-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full">
              <Upload className="h-16 w-16 text-amber-700" />
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">
              {isProcessing ? 'Analyzing Legal Document...' : 'Upload Legal Document'}
            </h3>
            <p className="text-lg text-slate-600 max-w-md mx-auto">
              {isProcessing 
                ? 'InfoLegal is processing your document with advanced AI analysis...'
                : 'Drag and drop your legal document here or click to browse files'
              }
            </p>
            
            {error && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}
            
            {!isProcessing && (
              <label className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 cursor-pointer font-semibold shadow-lg hover:shadow-xl">
                <FileText className="w-5 h-5 mr-3" />
                Select Legal Document
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileInput}
                />
              </label>
            )}
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Secure Processing</span>
            </div>
            <div className="text-slate-400">•</div>
            <div>Supported: TXT, PDF, DOC, DOCX</div>
          </div>
        </div>
      </div>
    </div>
  );
};