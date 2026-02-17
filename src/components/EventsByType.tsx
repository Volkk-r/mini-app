import React, { useEffect } from "react";
import EventCard from "../components/EventCard";
import type { EventItem } from "../types/events";
import "./EventsByType.css";
import olympiada from "../img/olimp.png";
import konkurs from "../img/kon.png";
import stazh from "../img/ctazh.png";
import vacancy from "../img/pabota.png";
import event from "../img/cob.png";

interface EventsByTypeProps {
  type: string;
  events: EventItem[];
  onBack: () => void;
}

function EventsByType({ type, events, onBack }: EventsByTypeProps) {
  // Обработчик нативной кнопки "назад"
  useEffect(() => {
    const handleBackButton = (event: Event) => {
      event.preventDefault();
      onBack(); // Возвращаемся на экран "все ивенты"
    };

    // Добавляем обработчик для нативной кнопки "назад"
    window.addEventListener("popstate", handleBackButton);

    // Добавляем запись в историю, чтобы кнопка "назад" работала правильно
    window.history.pushState(null, "", window.location.pathname);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [onBack]);

  // Функция для получения градиента по типу
  const getGradientStyle = (eventType: string): React.CSSProperties => {
    const gradients: Record<string, string> = {
      События: "linear-gradient(180deg, #0099FF, #FFFFFF)",
      Олимпиада: "linear-gradient(180deg, #FF9500, #FFBD61)",
      Конкурс: "linear-gradient(180deg, #7378FF, #ACAFFF)",
      Стажировка: "linear-gradient(180deg, #787878, #161616)",
      Вакансия: "linear-gradient(135deg, #87C0FF, #007AFF)",
    };

    return {
      backgroundImage:
        gradients[eventType] || "linear-gradient(135deg, #787878, #161616)",
    };
  };

  const headerStyle = getGradientStyle(type);

  // Карта изображений/фигур по типам. Замените src на свои файлы в src/img
  const imageByType: Record<string, { src: string }> = {
    События: { src: event },
    Олимпиада: { src: olympiada },
    Конкурс: { src: konkurs },
    Стажировка: { src: stazh },
    Вакансия: { src: vacancy },
  };

  const headerImage = imageByType[type]?.src || event;

  // Класс формы по типу
  const shapeClassByType: Record<string, string> = {
    События: "shape-events",
    Олимпиада: "shape-olympiad",
    Конкурс: "shape-contest",
    Стажировка: "shape-intern",
    Вакансия: "shape-vacancy",
  };
  const shapeClass = shapeClassByType[type] || "shape-default";

  return (
    <div className="events-by-type-container">
      <div className="events-header" style={headerStyle}>
        <div className="events-header-title">
          <div className={`header-figure ${shapeClass}`}>
            <div className="header-figure-blob" />
            <img className="header-figure-photo" src={headerImage} alt={type} />
          </div>
          <div>
            <h1>Раздел</h1>
            <h1 id="events-header-title-type">{type}</h1>
          </div>
        </div>
      </div>

      {/* Список событий */}
      <div className="events-grid">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <div className="no-events">
            <p>Нет событий в категории "{type}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsByType;
