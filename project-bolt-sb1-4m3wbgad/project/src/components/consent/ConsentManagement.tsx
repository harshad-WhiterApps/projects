import React, { useState } from 'react';
import { UserCheck, Info, Check, X, AlertTriangle } from 'lucide-react';
import { ConsentRecord } from '../../types/patient';
import { format } from 'date-fns';

const ConsentManagement: React.FC = () => {
  const [consents, setConsents] = useState<ConsentRecord[]>([
    {
      id: '1',
      patientId: '1',
      type: 'treatment',
      granted: true,
      grantedAt: new Date('2023-01-01'),
      description: 'General medical treatment and procedures'
    },
    {
      id: '2',
      patientId: '1',
      type: 'data-sharing',
      granted: true,
      grantedAt: new Date('2023-01-01'),
      description: 'Sharing medical records with authorized healthcare providers'
    },
    {
      id: '3',
      patientId: '1',
      type: 'research',
      granted: false,
      grantedAt: new Date('2023-01-01'),
      revokedAt: new Date('2023-06-01'),
      description: 'Participation in medical research studies (anonymized data)'
    },
    {
      id: '4',
      patientId: '1',
      type: 'marketing',
      granted: false,
      grantedAt: new Date('2023-01-01'),
      description: 'Receiving marketing communications about health services'
    }
  ]);

  const toggleConsent = (consentId: string) => {
    setConsents(consents.map(consent => {
      if (consent.id === consentId) {
        const isGranting = !consent.granted;
        return {
          ...consent,
          granted: isGranting,
          ...(isGranting 
            ? { grantedAt: new Date(), revokedAt: undefined }
            : { revokedAt: new Date() }
          )
        };
      }
      return consent;
    }));
  };

  const getConsentIcon = (granted: boolean) => {
    return granted ? (
      <Check className="w-5 h-5 text-green-600" />
    ) : (
      <X className="w-5 h-5 text-red-600" />
    );
  };

  const consentTypes = {
    treatment: {
      title: 'Medical Treatment',
      description: 'Consent for medical care, procedures, and treatments',
      critical: true
    },
    'data-sharing': {
      title: 'Data Sharing',
      description: 'Sharing your medical information with other authorized healthcare providers',
      critical: true
    },
    research: {
      title: 'Medical Research',
      description: 'Use of anonymized data for medical research and studies',
      critical: false
    },
    marketing: {
      title: 'Marketing Communications',
      description: 'Receiving promotional materials and health-related communications',
      critical: false
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <UserCheck className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Consent Management</h2>
          <p className="text-gray-600">Manage your data sharing and treatment consents</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">GDPR & HIPAA Compliance</h3>
            <p className="text-sm text-blue-700 mt-1">
              You have the right to control how your personal health information is used and shared. 
              Changes to your consent are logged for audit purposes and take effect immediately.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {consents.map((consent) => {
          const consentType = consentTypes[consent.type as keyof typeof consentTypes];
          
          return (
            <div key={consent.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getConsentIcon(consent.granted)}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {consentType?.title || consent.type}
                    </h3>
                    {consentType?.critical && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Critical
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3">
                    {consentType?.description || consent.description}
                  </p>
                  
                  <div className="text-sm text-gray-500">
                    <p>
                      <span className="font-medium">Status:</span> {consent.granted ? 'Granted' : 'Revoked'}
                    </p>
                    <p>
                      <span className="font-medium">Last Updated:</span> {' '}
                      {format(new Date(consent.revokedAt || consent.grantedAt), 'MMM dd, yyyy h:mm a')}
                    </p>
                  </div>
                </div>

                <div className="ml-6">
                  <button
                    onClick={() => toggleConsent(consent.id)}
                    disabled={consentType?.critical && consent.granted}
                    className={`inline-flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                      consent.granted
                        ? consentType?.critical
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {consent.granted ? 'Revoke' : 'Grant'} Consent
                  </button>
                  
                  {consentType?.critical && consent.granted && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Critical for care
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consent History</h3>
        <div className="space-y-3">
          {consents.filter(c => c.revokedAt).map((consent) => (
            <div key={`${consent.id}-history`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  {consentTypes[consent.type as keyof typeof consentTypes]?.title}
                </p>
                <p className="text-sm text-gray-600">
                  Revoked on {consent.revokedAt && format(new Date(consent.revokedAt), 'MMM dd, yyyy h:mm a')}
                </p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Revoked
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsentManagement;