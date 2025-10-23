import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export interface UserProfile {
  id: string;
  fullName: string;
  age: number;
  direction: string; // например: Frontend
  course: string;    // например: 2 курс
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

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  // Методы для работы с API
  fetchUserProfile: (userId: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const raw = localStorage.getItem('currentUser');
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  });

  // Загрузка профиля пользователя с бэка
  const fetchUserProfile = async (userId: string) => {
    try {
      // TODO: Заменить на реальный API endpoint
      // const response = await fetch(`/api/users/${userId}`);
      // const userData = await response.json();
      
      // Пока используем мок-данные
      const mockUserData: UserProfile = {
        id: userId,
        fullName: 'Сигидин Ярослав Тимурович',
        age: 17,
        direction: 'Frontend',
        course: '2 курс',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop',
        website: 'https://sigdingo.com',
        username: 'sigdingo',
        email: 'sigdingo@gmail.com',
        phone: '89619701510',
        about: 'Привет! Меня зовут Алексей, и я увлекаюсь программированием и путешествиями. В свободное время люблю читать книги и изучать новые языки. Мечтаю посетить Японию и попробовать настоящие суши!',
        techStack: ['React', 'API', 'Paskal', 'Python', 'RestApi', 'Tilda', 'Figma'],
        university: 'МГУ',
        faculty: 'Факультет вычислительной математики и кибернетики',
        graduationYear: 2026,
        location: 'Москва',
        socialLinks: {
          github: 'https://github.com/sigdingo',
          telegram: '@sigdingo'
        }
      };
      
      setUser(mockUserData);
      localStorage.setItem('currentUser', JSON.stringify(mockUserData));
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
  };

  // Обновление профиля пользователя
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      // TODO: Заменить на реальный API endpoint
      // const response = await fetch(`/api/users/${user.id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // });
      // const updatedUser = await response.json();
      
      // Пока обновляем локально
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
    }
  };

  const value = useMemo<UserContextType>(() => ({
    user,
    setUser: (u) => {
      setUser(u);
      if (u) {
        localStorage.setItem('currentUser', JSON.stringify(u));
      } else {
        localStorage.removeItem('currentUser');
      }
    },
    isAuthenticated: Boolean(user),
    fetchUserProfile,
    updateUserProfile,
  }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


