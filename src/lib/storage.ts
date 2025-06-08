
import { Pet, HealthEntry, Veterinarian, User } from '@/types';

const STORAGE_KEYS = {
  PETS: 'lovingpaws_pets',
  HEALTH_ENTRIES: 'lovingpaws_health_entries',
  VETERINARIANS: 'lovingpaws_veterinarians',
  USER: 'lovingpaws_user',
};

// Generic storage helpers
export const storage = {
  get: <T>(key: string): T[] => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  
  set: <T>(key: string, data: T[]): void => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  
  clear: (key: string): void => {
    localStorage.removeItem(key);
  }
};

// Pet operations
export const petStorage = {
  getAll: (): Pet[] => storage.get<Pet>(STORAGE_KEYS.PETS),
  save: (pets: Pet[]): void => storage.set(STORAGE_KEYS.PETS, pets),
  add: (pet: Pet): void => {
    const pets = petStorage.getAll();
    pets.push(pet);
    petStorage.save(pets);
  },
  update: (id: string, updates: Partial<Pet>): void => {
    const pets = petStorage.getAll();
    const index = pets.findIndex(p => p.id === id);
    if (index !== -1) {
      pets[index] = { ...pets[index], ...updates, updatedAt: new Date().toISOString() };
      petStorage.save(pets);
    }
  },
  delete: (id: string): void => {
    const pets = petStorage.getAll().filter(p => p.id !== id);
    petStorage.save(pets);
  }
};

// Health entry operations
export const healthStorage = {
  getAll: (): HealthEntry[] => storage.get<HealthEntry>(STORAGE_KEYS.HEALTH_ENTRIES),
  save: (entries: HealthEntry[]): void => storage.set(STORAGE_KEYS.HEALTH_ENTRIES, entries),
  add: (entry: HealthEntry): void => {
    const entries = healthStorage.getAll();
    entries.push(entry);
    healthStorage.save(entries);
  },
  getByPetId: (petId: string): HealthEntry[] => {
    return healthStorage.getAll().filter(entry => entry.petId === petId);
  },
  delete: (id: string): void => {
    const entries = healthStorage.getAll().filter(e => e.id !== id);
    healthStorage.save(entries);
  }
};

// Veterinarian operations
export const vetStorage = {
  getAll: (): Veterinarian[] => storage.get<Veterinarian>(STORAGE_KEYS.VETERINARIANS),
  save: (vets: Veterinarian[]): void => storage.set(STORAGE_KEYS.VETERINARIANS, vets),
  add: (vet: Veterinarian): void => {
    const vets = vetStorage.getAll();
    vets.push(vet);
    vetStorage.save(vets);
  },
  update: (id: string, updates: Partial<Veterinarian>): void => {
    const vets = vetStorage.getAll();
    const index = vets.findIndex(v => v.id === id);
    if (index !== -1) {
      vets[index] = { ...vets[index], ...updates };
      vetStorage.save(vets);
    }
  },
  delete: (id: string): void => {
    const vets = vetStorage.getAll().filter(v => v.id !== id);
    vetStorage.save(vets);
  }
};

// User operations
export const userStorage = {
  get: (): User | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  save: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  clear: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};
