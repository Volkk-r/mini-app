
import { useState } from 'react';
import { useMyEvents } from '../context/MyEventsContext';
import { useNavigate } from 'react-router-dom';
import '../events/AllEvents.css';
import './EventsByType.css';
import './MyEvents.css';

function MyEvents() {
  const { myEvents } = useMyEvents();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };


  // Функция для определения градиента по типу события (используем те же градиенты, что и в EventDetail)
  const getEventTypeGradient = (type: string): string => {
    const gradients: Record<string, string> = {
      'События': 'linear-gradient(180deg, #0099FF, #FFFFFF)',
      'Олимпиада': 'linear-gradient(180deg, #FF9500, #FFBD61)',
      'Конкурс': 'linear-gradient(180deg, #7378FF, #ACAFFF)',
      'Стажировка': 'linear-gradient(180deg, #787878, #161616)',
      'Вакансия': 'linear-gradient(135deg, #87C0FF, #007AFF)'
    };
    return gradients[type] || 'linear-gradient(135deg, #787878, #161616)';
  };

  // Функция для парсинга даты из строки
  const parseEventDate = (dateStr: string): Date => {
    // Пытаемся распарсить различные форматы дат
    const today = new Date();
    
    // Если дата содержит "до", это период
    if (dateStr.includes('до')) {
      const endDateStr = dateStr.split('до')[1].trim();
      // Простая логика для демонстрации - в реальном приложении нужен более сложный парсинг
      const day = parseInt(endDateStr.split(' ')[0]);
      const month = endDateStr.includes('октября') ? 9 : 
                   endDateStr.includes('ноября') ? 10 : 
                   endDateStr.includes('декабря') ? 11 : today.getMonth();
      return new Date(today.getFullYear(), month, day);
    }
    
    // Если дата содержит число и месяц
    const day = parseInt(dateStr.split(' ')[0]);
    if (!isNaN(day)) {
      const month = dateStr.includes('октября') ? 9 : 
                   dateStr.includes('ноября') ? 10 : 
                   dateStr.includes('декабря') ? 11 : 
                   dateStr.includes('сентября') ? 8 : today.getMonth();
      return new Date(today.getFullYear(), month, day);
    }
    
    // Если не удалось распарсить, считаем событие актуальным
    return new Date(today.getTime() + 24 * 60 * 60 * 1000);
  };

  // Разделение событий на актуальные и прошедшие
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const currentEvents = myEvents.filter(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate >= today;
  });
  
  const pastEvents = myEvents.filter(event => {
    const eventDate = parseEventDate(event.date);
    return eventDate < today;
  });

  const displayEvents = activeTab === 'current' ? currentEvents : pastEvents;

  if (myEvents.length === 0) {
    return (
      <div className="my-events-container">
        <div className={`tabs-container ${activeTab === 'past' ? 'past-active' : ''}`}>
          <button 
            className={`tab ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Актуальные
          </button>
          <button 
            className={`tab ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Прошедшие
          </button>
        </div>
        <div className="empty-state">
          <p>У вас пока нет сохраненных событий</p>
          <p>Нажмите "Участвовать" на любом событии, чтобы добавить его сюда</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-events-container">
      
      <div className={`tabs-container ${activeTab === 'past' ? 'past-active' : ''}`}>
        <button 
          className={`tab ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Актуальные
        </button>
        <button 
          className={`tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Прошедшие
        </button>
      </div>

      {displayEvents.length > 0 ? (
        displayEvents.map((event) => (
          <div 
            key={event.id} 
            className="my-event-card"
            onClick={() => handleEventClick(event.id)}
          >
            <div 
              className="event-placeholder"
              style={{ backgroundImage: getEventTypeGradient(event.type) }}
            />
            <div className="event-info">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date">{event.date}</p>
              <p className="event-company">{event.company}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-tab-state">
          <p>Нет {activeTab === 'current' ? 'актуальных' : 'прошедших'} событий</p>
        </div>
      )}
    </div>
  );
}

export default MyEvents;


