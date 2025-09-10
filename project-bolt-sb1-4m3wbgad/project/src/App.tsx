import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/auth/LoginForm';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import PatientList from './components/patients/PatientList';
import PatientDetail from './components/patients/PatientDetail';
import AppointmentCalendar from './components/appointments/AppointmentCalendar';
import MessageCenter from './components/messages/MessageCenter';
import AuditLogs from './components/audit/AuditLogs';
import ConsentManagement from './components/consent/ConsentManagement';
import { Patient } from './types/patient';

function App() {
  const { isAuthenticated, user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showCreatePatient, setShowCreatePatient] = useState(false);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    if (selectedPatient) {
      return (
        <PatientDetail
          patient={selectedPatient}
          onBack={() => setSelectedPatient(null)}
          onEdit={(patient) => {
            setSelectedPatient(patient);
            setShowCreatePatient(true);
          }}
        />
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return (
          <PatientList
            onSelectPatient={setSelectedPatient}
            onCreatePatient={() => setShowCreatePatient(true)}
          />
        );
      case 'appointments':
      case 'my-appointments':
        return <AppointmentCalendar />;
      case 'messages':
        return <MessageCenter />;
      case 'records':
        // For patient users, show their own records
        return user?.role === 'patient' ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Medical Records</h3>
            <p className="text-gray-600">This section would show the patient's own medical records</p>
          </div>
        ) : null;
      case 'consent':
        return <ConsentManagement />;
      case 'audit':
        return <AuditLogs />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600">Account settings, preferences, and security options would be here</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;