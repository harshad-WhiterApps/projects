import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  FileText, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Patient } from '../../types/patient';
import { Appointment } from '../../types/appointment';
import patientService from '../../services/patient';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [todaysAppointments, setTodaysAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const patientsData = await patientService.getPatients();
      setPatients(patientsData);

      // Mock today's appointments
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          patientId: '1',
          patientName: 'John Doe',
          doctorId: '2',
          doctorName: 'Dr. Michael Smith',
          startTime: new Date(new Date().setHours(9, 0, 0, 0)),
          endTime: new Date(new Date().setHours(9, 30, 0, 0)),
          type: 'consultation',
          status: 'scheduled',
          reason: 'Annual checkup',
          room: 'Room 101',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          patientId: '2',
          patientName: 'Sarah Johnson',
          doctorId: '2',
          doctorName: 'Dr. Michael Smith',
          startTime: new Date(new Date().setHours(10, 30, 0, 0)),
          endTime: new Date(new Date().setHours(11, 0, 0, 0)),
          type: 'follow-up',
          status: 'confirmed',
          reason: 'Blood pressure follow-up',
          room: 'Room 102',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      setTodaysAppointments(mockAppointments);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatsCards = () => {
    if (user?.role === 'patient') {
      return [
        { title: 'My Records', value: '12', icon: FileText, color: 'blue' },
        { title: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'green' },
        { title: 'Active Medications', value: '3', icon: Activity, color: 'purple' },
        { title: 'Unread Messages', value: '1', icon: AlertTriangle, color: 'orange' }
      ];
    }

    return [
      { title: 'Total Patients', value: patients.length.toString(), icon: Users, color: 'blue' },
      { title: 'Today\'s Appointments', value: todaysAppointments.length.toString(), icon: Calendar, color: 'green' },
      { title: 'Active Cases', value: '24', icon: Activity, color: 'purple' },
      { title: 'Pending Reviews', value: '8', icon: FileText, color: 'orange' }
    ];
  };

  const statsCards = getStatsCards();

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
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName}
          </h2>
          <p className="text-gray-600">Here's what's happening today</p>
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(), 'EEEE, MMMM dd, yyyy')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          const colorClasses = {
            blue: 'bg-blue-500 text-white',
            green: 'bg-green-500 text-white',
            purple: 'bg-purple-500 text-white',
            orange: 'bg-orange-500 text-white'
          };

          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          {todaysAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No appointments today</p>
          ) : (
            <div className="space-y-3">
              {todaysAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patientName}</p>
                    <p className="text-sm text-gray-600">{appointment.reason}</p>
                    <p className="text-xs text-gray-500">{appointment.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {format(appointment.startTime, 'h:mm a')}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {[
              { action: 'New patient registered', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600' },
              { action: 'Lab results uploaded', time: '4 hours ago', icon: FileText, color: 'text-blue-600' },
              { action: 'Appointment scheduled', time: '6 hours ago', icon: Calendar, color: 'text-purple-600' },
              { action: 'Medical record updated', time: '1 day ago', icon: Activity, color: 'text-orange-600' }
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;