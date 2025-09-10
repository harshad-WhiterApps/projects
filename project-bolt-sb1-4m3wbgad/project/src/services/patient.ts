import { Patient, MedicalRecord } from '../types/patient';
import auditService from './audit';

class PatientService {
  private static instance: PatientService;
  private patients: Patient[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1985-03-15'),
      gender: 'male',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'USA'
      },
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1-555-0124'
      },
      insurance: {
        provider: 'Blue Cross Blue Shield',
        policyNumber: 'BC123456789',
        groupNumber: 'GRP001'
      },
      medicalHistory: [],
      allergies: [
        {
          id: '1',
          allergen: 'Penicillin',
          severity: 'severe',
          reaction: 'Anaphylaxis',
          onsetDate: new Date('2010-05-20')
        }
      ],
      medications: [
        {
          id: '1',
          name: 'Lisinopril 10mg',
          dosage: '10mg',
          frequency: 'Once daily',
          prescribedBy: 'Dr. Smith',
          prescribedDate: new Date('2023-01-15'),
          isActive: true
        }
      ],
      consents: [
        {
          id: '1',
          patientId: '1',
          type: 'treatment',
          granted: true,
          grantedAt: new Date('2023-01-01'),
          description: 'General treatment consent'
        }
      ],
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01')
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: new Date('1992-08-22'),
      gender: 'female',
      email: 'sarah.johnson@example.com',
      phone: '+1-555-0125',
      address: {
        street: '456 Oak Ave',
        city: 'Somewhere',
        state: 'NY',
        zipCode: '67890',
        country: 'USA'
      },
      emergencyContact: {
        name: 'Robert Johnson',
        relationship: 'Father',
        phone: '+1-555-0126'
      },
      insurance: {
        provider: 'Aetna',
        policyNumber: 'AET987654321',
        groupNumber: 'GRP002'
      },
      medicalHistory: [],
      allergies: [],
      medications: [],
      consents: [
        {
          id: '2',
          patientId: '2',
          type: 'treatment',
          granted: true,
          grantedAt: new Date('2023-02-01'),
          description: 'General treatment consent'
        }
      ],
      createdAt: new Date('2023-02-01'),
      updatedAt: new Date('2023-02-01')
    }
  ];

  static getInstance(): PatientService {
    if (!PatientService.instance) {
      PatientService.instance = new PatientService();
    }
    return PatientService.instance;
  }

  async getPatients(): Promise<Patient[]> {
    auditService.logAction('list', 'patient', 'all');
    return this.patients;
  }

  async getPatient(id: string): Promise<Patient | null> {
    const patient = this.patients.find(p => p.id === id);
    if (patient) {
      auditService.logAction('view', 'patient', id);
    }
    return patient || null;
  }

  async createPatient(patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt' | 'medicalHistory' | 'consents'>): Promise<Patient> {
    const patient: Patient = {
      ...patientData,
      id: crypto.randomUUID(),
      medicalHistory: [],
      consents: [
        {
          id: crypto.randomUUID(),
          patientId: '',
          type: 'treatment',
          granted: true,
          grantedAt: new Date(),
          description: 'General treatment consent'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    patient.consents[0].patientId = patient.id;
    this.patients.push(patient);
    
    auditService.logAction('create', 'patient', patient.id, {
      name: `${patient.firstName} ${patient.lastName}`
    });

    return patient;
  }

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | null> {
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) return null;

    this.patients[index] = {
      ...this.patients[index],
      ...updates,
      updatedAt: new Date()
    };

    auditService.logAction('update', 'patient', id, updates);
    return this.patients[index];
  }

  async addMedicalRecord(patientId: string, record: Omit<MedicalRecord, 'id' | 'patientId' | 'createdAt' | 'updatedAt'>): Promise<MedicalRecord | null> {
    const patient = this.patients.find(p => p.id === patientId);
    if (!patient) return null;

    const medicalRecord: MedicalRecord = {
      ...record,
      id: crypto.randomUUID(),
      patientId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    patient.medicalHistory.unshift(medicalRecord);
    patient.updatedAt = new Date();

    auditService.logAction('create', 'medical-record', medicalRecord.id, {
      patientId,
      type: record.type,
      title: record.title
    });

    return medicalRecord;
  }

  async searchPatients(query: string): Promise<Patient[]> {
    const searchTerm = query.toLowerCase();
    const results = this.patients.filter(patient => 
      patient.firstName.toLowerCase().includes(searchTerm) ||
      patient.lastName.toLowerCase().includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm) ||
      patient.phone.includes(searchTerm)
    );

    auditService.logAction('search', 'patient', 'all', { query });
    return results;
  }
}

export default PatientService.getInstance();