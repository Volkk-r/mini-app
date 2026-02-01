export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  direction: string; // например: Frontend
  course: string; // например: 2 курс
  avatarUrl?: string;
  website?: string;
  username: string;
  email: string;
  phone?: string;
  about?: string;
  techStack?: string[];
  // Дополнительные поля, которые могут прийти с бэка
  birthDate?: string;
  university?: string;
  faculty?: string;
  graduationYear?: number;
  skills?: string[];
  experience?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    telegram?: string;
  };
}
export interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  // Методы для работы с API
  fetchUserProfile: (userId: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}
