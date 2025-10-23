import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { EventItem } from '../types/events';
import '../events/AllEvents.css';
import './EventsByType.css';
import './EventDetail.css';
import { fetchEventById } from '../api/events';
import { useMyEvents } from '../context/MyEventsContext';

// Временно берём данные из моков страницы allEvents через localStorage/передачу id
// Когда появится API, заменим на запрос к серверу

const fallbackEvents: EventItem[] = [
  { id: '1', title: 'Олимпиада по математике', type: 'Олимпиада', company: 'ООО "ЛучшийИнфоГигант"', date: '30 октября 17:00', isNew: true, tags: ['Frontend', '2024'] },
  { id: '2', title: 'Олимпиада по физике', type: 'Олимпиада', company: 'ООО "Наука"', date: 'до 20 ноября', isNew: true, tags: ['Backend'] },
  { id: '3', title: 'Конкурс программирования', type: 'Конкурс', company: 'ООО "Наука"', date: '30 октября 17:00', isNew: true, tags: ['Backend'] },
  { id: '4', title: 'Стажировка в IT компании', type: 'Стажировка', company: 'ООО "Наука"', date: '27 октября 17:00', tags: ['Backend'] },
  { id: '5', title: 'Вакансия разработчика', type: 'Вакансия', company: 'ООО "Наука"', date: 'до 1 ноября', tags: ['Backend'] },
  { id: '6', title: 'Вакансия разработчика', type: 'События', company: 'ООО "Наука"', date: '1 октября 17:00', tags: ['Backend'] },
  { id: '7', title: 'Конкурс программирования', type: 'Конкурс', company: 'ООО "Наука"', date: '15 декабря 14:00', isNew: true, tags: ['Backend'] },
];

function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addEvent, isEventAdded } = useMyEvents();

  const [eventItem, setEventItem] = useState<EventItem | undefined>(() => fallbackEvents.find(e => e.id === id));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id) return;
      try {
        const data = await fetchEventById(id);
        if (!cancelled && data) setEventItem(data);
      } catch (_err) {
        // фолбэк остаётся
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (!eventItem) {
    return (
      <div className="all-events-container" style={{ padding: 16 }}>
        <button className="btn-event" onClick={() => navigate(-1)}>Назад</button>
        <div style={{ marginTop: 16 }}>Ивент не найден</div>
      </div>
    );
  }

  // Стили и ресурсы хедера как в EventsByType
  const gradients: Record<string, string> = {
    'События': 'linear-gradient(180deg, #0099FF, #FFFFFF)',
    'Олимпиада': 'linear-gradient(180deg, #FF9500, #FFBD61)',
    'Конкурс': 'linear-gradient(180deg, #7378FF, #ACAFFF)',
    'Стажировка': 'linear-gradient(180deg, #787878, #161616)',
    'Вакансия': 'linear-gradient(135deg, #87C0FF, #007AFF)'
  };
  const headerStyle = { backgroundImage: gradients[eventItem.type] || 'linear-gradient(135deg, #787878, #161616)' };

  // Отдельные изображения и формы для хедера в деталях не используются

  return (
    <div className="event-detail-container">
      <div 
        className="event-detail-header"
        style={headerStyle}
      >
      </div>

      <div className="event-detail-grid">
        <div className="event-detail-card event-card">
          <div className="event-detail-info">
            <div className="event-detail-title">{eventItem.title}</div>
            <div className="chips-row">
              <span className="chip chip--muted">c {eventItem.date}</span>
              <span className="chip">{eventItem.type}</span>
              {eventItem.tags?.map(tag => (
                <span key={tag} className="chip chip--muted">{tag}</span>
              ))}
            </div>
            <div className="event-detail-description">
              Приглашаем вас на уникальное мероприятие, организованное компанией "Инфотех". В этот день мы представим новейшие технологии и решения в области информационных технологий. Участники смогут посетить мастер-классы, где эксперты поделятся своими знаниями и опытом. Также будет возможность пообщаться с представителями ведущих компаний отрасли. Не упустите шанс расширить свои горизонты и завести полезные знакомства. Ждем вас на нашем мероприятии!
            </div>
            <button 
              className="cta-button"
              style={{ 
                backgroundImage: gradients[eventItem.type] || 'linear-gradient(135deg, #787878, #161616)',
                opacity: isEventAdded(eventItem.id) ? 0.7 : 1
              }}
              onClick={() => {
                if (!isEventAdded(eventItem.id)) {
                  addEvent(eventItem);
                  alert('Событие добавлено в "Мои события"!');
                } else {
                  alert('Вы уже участвуете в этом событии!');
                }
              }}
            >
              {isEventAdded(eventItem.id) ? 'Уже участвуете' : 'Участвовать'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;


