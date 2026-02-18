import { useState, useEffect, type ComponentType } from "react";
import EventsByType from "../components/EventsByType";
import {
  IconActions,
  IconChannel,
  IconDevices,
  IconFolder,
  IconCalendar,
} from "../icon/icons";
import type { EventItem } from "../types/events";
import { fetchAllEvents } from "../api/events";
import * as S from "../styles/styles.events";
import { bannerSlides, mockEvents } from "../mock/mock";
import type { IconBaseProps } from "../types/colors";
import { EventList } from "../components/EventList";

function AllEvents() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const extendedSlides = [
    bannerSlides[bannerSlides.length - 1],
    ...bannerSlides,
    bannerSlides[0],
  ];

  const allTypes = [
    "Олимпиада",
    "Конкурс",
    "Стажировка",
    "Вакансия",
    "События",
  ];

  const [events, setEvents] = useState<EventItem[]>(mockEvents);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const apiEvents = await fetchAllEvents();
        if (!cancelled && Array.isArray(apiEvents) && apiEvents.length) {
          setEvents(apiEvents);
        }
      } catch (_err) {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const eventsByType: Record<string, EventItem[]> = {};
  allTypes.forEach((type) => {
    eventsByType[type] = events.filter((e) => e.type === type);
  });

  const iconByType: Record<string, ComponentType<IconBaseProps>> = {
    Олимпиада: IconActions,
    Конкурс: IconChannel,
    Стажировка: IconDevices,
    Вакансия: IconFolder,
    События: IconCalendar,
  };

  useEffect(() => {
    if (!isAutoPlaying || selectedType) return;

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
    setIsAutoPlaying(false);
  };

  const handleBackToAll = () => {
    setSelectedType(null);
    setIsAutoPlaying(true);
  };

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
    <S.AllEventsContainer>
      <S.Banner>
        <S.BannerCarousel
          transition={isTransitioning}
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 20}px))`,
          }}
        >
          {extendedSlides.map((slide, index) => (
            <S.BannerSlide key={`${slide.id}-${index}`}>
              <S.BannerContent>
                <h2>{slide.title}</h2>
                <S.SeeAllButton onClick={() => handleShowAll(slide.type)}>
                  Показать все
                </S.SeeAllButton>
              </S.BannerContent>
            </S.BannerSlide>
          ))}
        </S.BannerCarousel>

        <S.SliderDots>
          {bannerSlides.map((_, index) => {
            const isActive =
              index === currentSlide - 1 ||
              (currentSlide === 0 && index === bannerSlides.length - 1) ||
              (currentSlide === extendedSlides.length - 1 && index === 0);
            return (
              <S.Dot
                key={index}
                active={isActive}
                onClick={() => goToSlide(index)}
              />
            );
          })}
        </S.SliderDots>
      </S.Banner>

      <EventList
        eventsByType={eventsByType}
        allTypes={allTypes}
        iconByType={iconByType}
        onOpenGroup={handleShowAll}
      />
    </S.AllEventsContainer>
  );
}

export default AllEvents;
