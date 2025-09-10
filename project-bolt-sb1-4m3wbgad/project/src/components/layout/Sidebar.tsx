import React from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Settings, 
  Activity,
  UserCheck,
  Search
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { user, hasPermission } = useAuth();

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { id: 'patients', label: 'Patients', icon: Users, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { id: 'appointments', label: 'Appointments', icon: Calendar, roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { id: 'messages', label: 'Messages', icon: MessageSquare, roles: ['admin', 'doctor', 'nurse', 'receptionist', 'patient'] },
    { id: 'records', label: 'My Records', icon: FileText, roles: ['patient'] },
    { id: 'my-appointments', label: 'My Appointments', icon: Calendar, roles: ['patient'] },
    { id: 'consent', label: 'Consent Management', icon: UserCheck, roles: ['patient', 'admin'] },
    { id: 'audit', label: 'Audit Logs', icon: Search, roles: ['admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'doctor', 'nurse', 'receptionist', 'patient'] }
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-900 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;