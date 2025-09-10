export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  startTime: Date;
  endTime: Date;
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery' | 'lab';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  room?: string;
  createdAt: Date;
  updatedAt: Date;
}