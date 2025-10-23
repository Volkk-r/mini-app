import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { EventItem } from '../types/events';
import '../events/AllEvents.css';

interface EventCardProps extends EventItem {}

const gradientsByType: Record<string, string> = {
  'События': 'linear-gradient(180deg, #0099FF, #c1d9ff)',
  'Олимпиада': 'linear-gradient(180deg, #FF9500, #FFBD61)',
  'Конкурс': 'linear-gradient(180deg, #7378FF, #ACAFFF)',
  'Стажировка': 'linear-gradient(180deg, #787878, #161616)',
  'Вакансия': 'linear-gradient(135deg, #87C0FF, #007AFF)'
};

const EventCard: React.FC<EventCardProps> = ({ id, title, type, company, date, isNew, tags, imageUrl }) => {
  const navigate = useNavigate();
  const backgroundStyle = imageUrl 
    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }
    : { background: gradientsByType[type] || 'linear-gradient(180deg, #0099FF, #FFFFFF)' };
  return (
    <div className="event-card" onClick={() => navigate(`/events/${id}`)} style={{ cursor: 'pointer' }}>
      {isNew && <span className="badge-new">NEW</span>}
      <div className="event-img" style={backgroundStyle} />
      <div className="event-info">
        <div className="event-title">{title}</div>
        <div className="event-type">{type}</div>
        <div style={{ fontSize: '0.85rem', color: '#888', margin: '4px 0' }}>{company}</div>
        <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{date}</div>
        {tags && <div style={{ marginTop: 4 }}>{tags.map(tag => <span key={tag} style={{ background: '#f0f0f0', borderRadius: 4, padding: '2px 6px', fontSize: 11, marginRight: 4 }}>{tag}</span>)}</div>}
      </div>
    </div>
  );
};

export default EventCard; 