import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, User, MapPin } from 'lucide-react';
import { Appointment } from '../../types/appointment';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';

const AppointmentCalendar: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadAppointments();
  }, [currentWeek]);

  const loadAppointments = async () => {
    // Mock appointments data
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
    
    setAppointments(mockAppointments);
  };

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(apt => isSameDay(new Date(apt.startTime), day));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || colors.scheduled;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        {hasPermission('write', 'appointment') && (
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Appointment
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">
              Week of {format(weekStart, 'MMMM dd, yyyy')}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentWeek(new Date())}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map((day, index) => {
            const dayAppointments = getAppointmentsForDay(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div key={index} className="bg-white min-h-48">
                <div className={`p-3 border-b border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className="text-sm font-medium text-gray-900">
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                    {format(day, 'd')}
                  </div>
                </div>
                
                <div className="p-2 space-y-1">
                  {dayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`p-2 rounded-md border text-xs cursor-pointer hover:shadow-sm transition-shadow ${getStatusColor(appointment.status)}`}
                    >
                      <div className="font-medium truncate">{appointment.patientName}</div>
                      <div className="flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{format(appointment.startTime, 'h:mm a')}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="truncate">{appointment.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {todaysAppointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <User className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patientName}</p>
                    <p className="text-sm text-gray-600">{appointment.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {format(appointment.startTime, 'h:mm a')}
                  </p>
                  <p className="text-xs text-gray-500">{appointment.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            {[
              { label: 'HIPAA Compliance', status: 'Active', icon: CheckCircle, color: 'text-green-600' },
              { label: 'Backup System', status: 'Running', icon: CheckCircle, color: 'text-green-600' },
              { label: 'Audit Logging', status: 'Enabled', icon: CheckCircle, color: 'text-green-600' },
              { label: 'Data Encryption', status: 'AES-256', icon: CheckCircle, color: 'text-green-600' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;