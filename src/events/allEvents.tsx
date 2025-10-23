import { useState, useEffect } from 'react';
import './AllEvents.css';
import EventCard from '../components/EventCard';
import EventsByType from '../components/EventsByType'; // Новый компонент для отображения событий по типу
import calendar_24 from '../img/calendar_24.svg';
import channel_28 from '../img/channel_28.svg';
import actions_24 from '../img/actions_24.svg';
import devices_28 from '../img/devices_28.svg';
import folder_24 from '../img/folder_24.svg';
import arrow_right_24 from '../img/arrow_right_20.svg';

import type { EventItem } from '../types/events';
import { fetchAllEvents } from '../api/events';

// Данные для карусели баннера
const bannerSlides = [
  {
    id: 1,
    title: 'Олимпиады',
    imageUrl: actions_24,
    type: 'Олимпиада'
  },
  {
    id: 2,
    title: 'Конкурсы',
    imageUrl: channel_28,
    type: 'Конкурс'
  },
  {
    id: 3,
    title: 'Стажировки',
    imageUrl: devices_28,
    type: 'Стажировка'
  },
  {
    id: 4,
    title: 'Вакансии',
    imageUrl: folder_24,
    type: 'Вакансия'    
  },
  {
    id: 5,
    title: "События",
    imageUrl: calendar_24,
    type: "События"
  }
];

// Моковые данные (фолбэк)
const mockEvents: EventItem[] = [
  {
    id: '1',
    title: 'Олимпиада по математике',
    type: 'Олимпиада',
    company: 'ООО "ЛучшийИнфоГигант"',
    date: '30 октября 17:00',
    isNew: true,
    tags: ['Frontend', '2024'],
  },
  {
    id: '2',
    title: 'Олимпиада по физике',
    type: 'Олимпиада',
    company: 'ООО "Наука"',
    date: 'до 20 ноября',
    isNew: true,
    tags: ['Backend'],
  },
  {
    id: '3',
    title: 'Конкурс программирования',
    type: 'Конкурс',
    company: 'ООО "Наука"',
    date: '30 октября 17:00',
    isNew: true,
    tags: ['Backend'],
  },
  {
    id: '4',
    title: 'Стажировка в IT компании',
    type: 'Стажировка',
    company: 'ООО "Наука"',
    date: '27 октября 17:00',
    tags: ['Backend'],
  },
  {
    id: '5',
    title: 'Вакансия разработчика',
    type: 'Вакансия',
    company: 'ООО "Наука"',
    date: 'до 1 ноября',
    tags: ['Backend'],
  },
  {
    id: '6',
    title: 'Вакансия разработчика',
    type: 'События',
    company: 'ООО "Наука"',
    date: '1 октября 17:00',
    tags: ['Backend'],
  },
  {
    id: '7',
    title: 'Конкурс программирования',
    type: 'Конкурс',
    company: 'ООО "Наука"',
    date: '15 декабря 14:00',
    isNew: true,
    tags: ['Backend'],
  }
];

function AllEvents() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [selectedType, setSelectedType] = useState<string | null>(null); // Новое состояние для выбранного типа

    // Создаем расширенный массив слайдов для бесконечной карусели
    const extendedSlides = [bannerSlides[bannerSlides.length - 1], ...bannerSlides, bannerSlides[0]];

    const allTypes = ['Олимпиада', 'Конкурс', 'Стажировка', 'Вакансия', 'События'];

    const [events, setEvents] = useState<EventItem[]>(mockEvents);

    useEffect(() => {
      let cancelled = false;
      (async () => {
        try {
          const apiEvents = await fetchAllEvents();
          if (!cancelled && Array.isArray(apiEvents) && apiEvents.length) {
            setEvents(apiEvents);
          }
        } catch (_err) {
          // тихий фолбэк на mockEvents
        }
      })();
      return () => { cancelled = true; };
    }, []);

    const eventsByType: Record<string, EventItem[]> = {};
    allTypes.forEach(type => {
      eventsByType[type] = events.filter(e => e.type === type);
    });

    const nonEmptySections = allTypes.filter(type => eventsByType[type].length > 0);
    const emptySections = allTypes.filter(type => eventsByType[type].length === 0);

    const iconByType: Record<string, string> = {
      'Олимпиада': actions_24,
      'Конкурс': channel_28,
      'Стажировка': devices_28,
      'Вакансия': folder_24,
      'События': calendar_24,
    };

    useEffect(() => {
        if (!isAutoPlaying || selectedType) return; // Не автоплеим если открыт конкретный тип

        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                const nextSlide = prev + 1;

                if (nextSlide === extendedSlides.length - 1) {
                    setTimeout(() => {
                        setIsTransitioning(false);
                        setCurrentSlide(1);
                        setTimeout(() => setIsTransitioning(true), 50);
                    }, 500);
                    return nextSlide;
                }

                return nextSlide;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, extendedSlides.length, selectedType]);

    const goToSlide = (index: number) => {
        const extendedIndex = index + 1;
        setCurrentSlide(extendedIndex);
        setIsAutoPlaying(false);
        setIsTransitioning(true);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const handleShowAll = (type: string) => {
        setSelectedType(type);
        setIsAutoPlaying(false); // Останавливаем карусель при переходе
    };

    const handleBackToAll = () => {
        setSelectedType(null);
        setIsAutoPlaying(true); // Возобновляем карусель
    };

    // Если выбран конкретный тип, показываем компонент EventsByType
    if (selectedType) {
        return (
            <EventsByType 
                type={selectedType}
                events={eventsByType[selectedType] || []}
                onBack={handleBackToAll}
            />
        );
    }

    return (
        <div className="all-events-container">
            <div className="banner">
                <div
                    className="banner-carousel"
                    style={{
                        transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 20}px))`,
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                    }}
                >
                    {extendedSlides.map((slide, index) => (
                        <div
                            key={`${slide.id}-${index}`}
                            className="banner-slide"
                        >
                            <div className="banner-content">
                                <h2>{slide.title}</h2>
                                <button 
                                    className="see-all-btn"
                                    onClick={() => handleShowAll(slide.type)}
                                >
                                    Показать все
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Точки индикаторы */}
                <div className="slider-dots">
                    {bannerSlides.map((_, index) => {
                        const isActive = index === (currentSlide - 1) ||
                                       (currentSlide === 0 && index === bannerSlides.length - 1) ||
                                       (currentSlide === extendedSlides.length - 1 && index === 0);
                        return (
                            <span
                                key={index}
                                className={`dot ${isActive ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Сначала секции с ивентами */}
            {nonEmptySections.map((type, idx) => (
              <div className={`section${idx === 0 ? ' first-section' : ''}`} key={type}>
                <div className="section-header">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {iconByType[type] && (
                      <img src={iconByType[type]} alt="" style={{ width: 24, height: 24 }} />
                    )}
                    {type}
                  </h3>
                  <button 
                    className="btn-event"
                    onClick={() => handleShowAll(type)}
                  >
                    Все
                    <img src={arrow_right_24} alt=""/>
                  </button>
                </div>
                <div className="events-list">
                  {eventsByType[type].map(event => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              </div>
            ))}

            {/* Потом секции без ивентов (пустые) */}
            {emptySections.map(type => (
              <div className={"section empty-section"} key={type}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {iconByType[type] && (
                    <img src={iconByType[type]} alt="" style={{ width: 24, height: 24 }} />
                  )}
                  {type}
                </h3>
                <div className="events-list empty-list">
                  <div className="empty-events-placeholder">Пока нет ивентов</div>
                </div>
              </div>
            ))}

            {/* Нижнее меню удалено — теперь общее через AppLayout */}
        </div>
    )
}

export default AllEvents;