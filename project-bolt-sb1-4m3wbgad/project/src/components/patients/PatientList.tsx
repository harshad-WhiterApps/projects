import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Calendar, Phone, Mail } from 'lucide-react';
import { Patient } from '../../types/patient';
import patientService from '../../services/patient';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';

interface PatientListProps {
  onSelectPatient: (patient: Patient) => void;
  onCreatePatient: () => void;
}

const PatientList: React.FC<PatientListProps> = ({ onSelectPatient, onCreatePatient }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchPatients();
    } else {
      setFilteredPatients(patients);
    }
  }, [searchQuery, patients]);

  const loadPatients = async () => {
    try {
      const data = await patientService.getPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      console.error('Failed to load patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchPatients = async () => {
    try {
      const results = await patientService.searchPatients(searchQuery);
      setFilteredPatients(results);
    } catch (error) {
      console.error('Failed to search patients:', error);
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
        {hasPermission('write', 'patient') && (
          <button
            onClick={onCreatePatient}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search patients by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectPatient(patient)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {calculateAge(patient.dateOfBirth)} years old • {patient.gender}
                </p>
              </div>
              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>DOB: {format(new Date(patient.dateOfBirth), 'MMM dd, yyyy')}</span>
              </div>
            </div>

            {patient.allergies.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {patient.allergies.length} Allerg{patient.allergies.length === 1 ? 'y' : 'ies'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {searchQuery ? 'No patients found matching your search' : 'No patients found'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientList;