import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UserProfile, UserContextType } from "../types/user";
import { MOCK_USER } from "../mock/mock";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const raw = localStorage.getItem("currentUser");
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  });

  // Загрузка профиля пользователя с бэка
  const fetchUserProfile = async (userId: string) => {
    try {
      // TODO: Заменить на реальный API endpoint
      // const response = await fetch(`/api/users/${userId}`);
      // const userData = await response.json();

      const mockUserData: UserProfile = MOCK_USER;

      setUser(mockUserData);
      localStorage.setItem("currentUser", JSON.stringify(mockUserData));
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
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
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
    }
  };

  const value = useMemo<UserContextType>(
    () => ({
      user,
      setUser: (u) => {
        setUser(u);
        if (u) {
          localStorage.setItem("currentUser", JSON.stringify(u));
        } else {
          localStorage.removeItem("currentUser");
        }
      },
      isAuthenticated: Boolean(user),
      fetchUserProfile,
      updateUserProfile,
    }),
    [user],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
