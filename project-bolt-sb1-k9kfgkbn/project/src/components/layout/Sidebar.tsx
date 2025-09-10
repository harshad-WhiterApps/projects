import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  ShoppingCart,
  Users,
  BarChart3,
  MapPin,
  Settings,
  FileText
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { profile } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'inventory_manager', 'pharmacist', 'procurement_officer', 'auditor'] },
    { id: 'inventory', label: 'Inventory', icon: Package, roles: ['admin', 'inventory_manager', 'pharmacist'] },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, roles: ['admin', 'inventory_manager', 'pharmacist', 'procurement_officer'] },
    { id: 'orders', label: 'Purchase Orders', icon: ShoppingCart, roles: ['admin', 'inventory_manager', 'procurement_officer'] },
    { id: 'vendors', label: 'Vendors', icon: Users, roles: ['admin', 'inventory_manager', 'procurement_officer'] },
    { id: 'locations', label: 'Locations', icon: MapPin, roles: ['admin', 'inventory_manager'] },
    { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'inventory_manager', 'auditor'] },
    { id: 'compliance', label: 'Compliance', icon: FileText, roles: ['admin', 'auditor'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    profile?.role && item.roles.includes(profile.role)
  );

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}