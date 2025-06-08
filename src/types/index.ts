
export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  age: number;
  weight: number;
  photo?: string;
  gender: 'male' | 'female';
  microchipId?: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

export interface HealthEntry {
  id: string;
  petId: string;
  type: 'weight' | 'temperature' | 'medication' | 'vet_visit' | 'vaccination' | 'exercise' | 'food' | 'behavior';
  value: string | number;
  unit?: string;
  notes?: string;
  date: string;
  createdAt: string;
}

export interface Veterinarian {
  id: string;
  name: string;
  clinicName: string;
  phone: string;
  email?: string;
  address: string;
  speciality?: string;
  notes?: string;
  isEmergency: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferences: {
    notifications: boolean;
    units: 'metric' | 'imperial';
    theme: 'light' | 'dark' | 'system';
  };
  createdAt: string;
}
