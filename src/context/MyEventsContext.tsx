import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { EventItem } from '../types/events';

interface MyEventsContextType {
  myEvents: EventItem[];
  addEvent: (event: EventItem) => void;
  removeEvent: (eventId: string) => void;
  isEventAdded: (eventId: string) => boolean;
}

const MyEventsContext = createContext<MyEventsContextType | undefined>(undefined);

export const useMyEvents = () => {
  const context = useContext(MyEventsContext);
  if (!context) {
    throw new Error('useMyEvents must be used within a MyEventsProvider');
  }
  return context;
};

interface MyEventsProviderProps {
  children: ReactNode;
}

export const MyEventsProvider: React.FC<MyEventsProviderProps> = ({ children }) => {
  const [myEvents, setMyEvents] = useState<EventItem[]>(() => {
    // Загружаем сохраненные события из localStorage при инициализации
    const saved = localStorage.getItem('myEvents');
    return saved ? JSON.parse(saved) : [];
  });

  const addEvent = (event: EventItem) => {
    setMyEvents(prev => {
      // Проверяем, не добавлено ли уже это событие
      if (prev.some(e => e.id === event.id)) {
        return prev;
      }
      const newEvents = [...prev, event];
      // Сохраняем в localStorage
      localStorage.setItem('myEvents', JSON.stringify(newEvents));
      return newEvents;
    });
  };

  const removeEvent = (eventId: string) => {
    setMyEvents(prev => {
      const newEvents = prev.filter(e => e.id !== eventId);
      // Обновляем localStorage
      localStorage.setItem('myEvents', JSON.stringify(newEvents));
      return newEvents;
    });
  };

  const isEventAdded = (eventId: string) => {
    return myEvents.some(e => e.id === eventId);
  };

  const value: MyEventsContextType = {
    myEvents,
    addEvent,
    removeEvent,
    isEventAdded,
  };

  return (
    <MyEventsContext.Provider value={value}>
      {children}
    </MyEventsContext.Provider>
  );
};
