import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Clock, Camera } from 'lucide-react';
import { KYCDocument } from '../types';
import { mockKYCDocuments } from '../utils/mockData';

interface KYCUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KYCUpload: React.FC<KYCUploadProps> = ({ isOpen, onClose }) => {
  const [documents, setDocuments] = useState<KYCDocument[]>(mockKYCDocuments);
  const [uploading, setUploading] = useState<string | null>(null);

  const documentTypes = [
    { type: 'aadhaar', label: 'Aadhaar Card', icon: '🆔' },
    { type: 'pan', label: 'PAN Card', icon: '📄' },
    { type: 'passport', label: 'Passport', icon: '📘' },
    { type: 'driving_license', label: 'Driving License', icon: '🚗' },
  ];

  const handleFileUpload = async (type: string, file: File) => {
    setUploading(type);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newDocument: KYCDocument = {
      id: Date.now().toString(),
      type: type as any,
      documentNumber: `****-****-${Math.floor(Math.random() * 9999)}`,
      status: 'pending',
      uploadDate: new Date(),
    };

    setDocuments(prev => [...prev.filter(doc => doc.type !== type), newDocument]);
    setUploading(null);
  };

  const getStatusIcon = (status: KYCDocument['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: KYCDocument['status']) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">KYC Document Upload</h2>
                <p className="text-blue-100">Verify your identity securely</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-800 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {documentTypes.map((docType) => {
              const existingDoc = documents.find(doc => doc.type === docType.type);
              const isUploading = uploading === docType.type;

              return (
                <div key={docType.type} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{docType.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{docType.label}</h3>
                        {existingDoc && (
                          <p className="text-sm text-gray-600">
                            Document: {existingDoc.documentNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    {existingDoc && (
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(existingDoc.status)}`}>
                        {getStatusIcon(existingDoc.status)}
                        <span className="text-sm font-medium capitalize">{existingDoc.status}</span>
                      </div>
                    )}
                  </div>

                  {existingDoc && existingDoc.status === 'verified' ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Document Verified</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Verified on {existingDoc.verificationDate?.toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        {isUploading ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="text-sm text-gray-600">Uploading document...</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-sm text-gray-600">
                              Drag and drop your {docType.label.toLowerCase()} or click to browse
                            </p>
                            <div className="flex justify-center space-x-2 mt-4">
                              <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <input
                                  type="file"
                                  accept="image/*,.pdf"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload(docType.type, file);
                                  }}
                                />
                                Choose File
                              </label>
                              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                                <Camera className="w-4 h-4" />
                                <span>Take Photo</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {existingDoc && existingDoc.status === 'pending' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 text-yellow-700">
                            <Clock className="w-5 h-5" />
                            <span className="font-medium">Under Review</span>
                          </div>
                          <p className="text-sm text-yellow-600 mt-1">
                            Your document is being verified. This usually takes 24-48 hours.
                          </p>
                        </div>
                      )}

                      {existingDoc && existingDoc.status === 'rejected' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 text-red-700">
                            <XCircle className="w-5 h-5" />
                            <span className="font-medium">Document Rejected</span>
                          </div>
                          <p className="text-sm text-red-600 mt-1">
                            Please upload a clear, valid document. Contact support if you need help.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Important Guidelines:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ensure documents are clear and readable</li>
              <li>• Upload original documents only</li>
              <li>• File size should be less than 5MB</li>
              <li>• Supported formats: JPG, PNG, PDF</li>
              <li>• All information should be clearly visible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};