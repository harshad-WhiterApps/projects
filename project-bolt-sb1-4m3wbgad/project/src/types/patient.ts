export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  medicalHistory: MedicalRecord[];
  allergies: Allergy[];
  medications: Medication[];
  consents: ConsentRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  type: 'visit' | 'lab' | 'radiology' | 'prescription' | 'note';
  title: string;
  content: string;
  attachments: string[];
  diagnosis: string[];
  vitals?: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Allergy {
  id: string;
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction: string;
  onsetDate?: Date;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  prescribedDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface ConsentRecord {
  id: string;
  patientId: string;
  type: 'data-sharing' | 'treatment' | 'research' | 'marketing';
  granted: boolean;
  grantedAt: Date;
  revokedAt?: Date;
  description: string;
}