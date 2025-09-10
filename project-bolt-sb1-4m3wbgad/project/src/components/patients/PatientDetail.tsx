import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  AlertTriangle,
  Pill,
  FileText,
  Plus
} from 'lucide-react';
import { Patient, MedicalRecord } from '../../types/patient';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import patientService from '../../services/patient';

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
  onEdit: (patient: Patient) => void;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onBack, onEdit }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const { hasPermission, user } = useAuth();

  const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddRecord = async (recordData: any) => {
    if (!user) return;
    
    await patientService.addMedicalRecord(patient.id, {
      ...recordData,
      doctorId: user.id,
      doctorName: `${user.firstName} ${user.lastName}`
    });
    
    setShowAddRecord(false);
    // In a real app, we'd refresh the patient data
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'medical-history', label: 'Medical History' },
    { id: 'medications', label: 'Medications' },
    { id: 'allergies', label: 'Allergies' },
    { id: 'documents', label: 'Documents' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Patients
        </button>
        
        {hasPermission('write', 'patient') && (
          <button
            onClick={() => onEdit(patient)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Patient
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {calculateAge(patient.dateOfBirth)} years old • {patient.gender}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Patient ID: {patient.id}
              </p>
            </div>
            
            {patient.allergies.length > 0 && (
              <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                <div className="flex items-center text-red-800">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="font-medium">Allergies</span>
                </div>
                <div className="mt-1 text-sm text-red-700">
                  {patient.allergies.map(allergy => allergy.allergen).join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3" />
                    <span>
                      {patient.address.street}, {patient.address.city}, {patient.address.state} {patient.address.zipCode}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-3" />
                    <span>DOB: {format(new Date(patient.dateOfBirth), 'MMMM dd, yyyy')}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Emergency Contact</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">{patient.emergencyContact.name}</span> ({patient.emergencyContact.relationship})</p>
                    <p>{patient.emergencyContact.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Insurance Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Provider:</span>
                    <p className="text-gray-900">{patient.insurance.provider}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Policy Number:</span>
                    <p className="text-gray-900">{patient.insurance.policyNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Group Number:</span>
                    <p className="text-gray-900">{patient.insurance.groupNumber}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">{patient.medicalHistory.length}</div>
                      <div className="text-xs text-blue-800">Records</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">{patient.medications.length}</div>
                      <div className="text-xs text-green-800">Medications</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-red-600">{patient.allergies.length}</div>
                      <div className="text-xs text-red-800">Allergies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medical-history' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
                {hasPermission('write', 'patient') && (
                  <button
                    onClick={() => setShowAddRecord(true)}
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Record
                  </button>
                )}
              </div>

              {patient.medicalHistory.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No medical records found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {patient.medicalHistory.map((record) => (
                    <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{record.title}</h4>
                          <p className="text-sm text-gray-600">
                            {record.type.charAt(0).toUpperCase() + record.type.slice(1)} • Dr. {record.doctorName}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {format(new Date(record.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{record.content}</p>
                      
                      {record.diagnosis.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs font-medium text-gray-700">Diagnosis: </span>
                          <span className="text-xs text-gray-600">{record.diagnosis.join(', ')}</span>
                        </div>
                      )}
                      
                      {record.vitals && (
                        <div className="mt-2 bg-gray-50 rounded p-2 text-xs">
                          <span className="font-medium">Vitals: </span>
                          BP: {record.vitals.bloodPressure}, HR: {record.vitals.heartRate} bpm, 
                          Temp: {record.vitals.temperature}°F, Weight: {record.vitals.weight} lbs
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
              
              {patient.medications.length === 0 ? (
                <div className="text-center py-8">
                  <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No medications on file</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {patient.medications.map((medication) => (
                    <div key={medication.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{medication.name}</h4>
                          <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Prescribed by {medication.prescribedBy} on {format(new Date(medication.prescribedDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          medication.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {medication.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'allergies' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
              
              {patient.allergies.length === 0 ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No known allergies</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {patient.allergies.map((allergy) => (
                    <div key={allergy.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-red-900">{allergy.allergen}</h4>
                          <p className="text-sm text-red-700">{allergy.reaction}</p>
                          {allergy.onsetDate && (
                            <p className="text-xs text-red-600 mt-1">
                              Onset: {format(new Date(allergy.onsetDate), 'MMM dd, yyyy')}
                            </p>
                          )}
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          allergy.severity === 'severe'
                            ? 'bg-red-200 text-red-900'
                            : allergy.severity === 'moderate'
                            ? 'bg-yellow-200 text-yellow-900'
                            : 'bg-orange-200 text-orange-900'
                        }`}>
                          {allergy.severity.charAt(0).toUpperCase() + allergy.severity.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;