import React from "react";
import EventCard from "./EventCard";
import * as S from "../styles/styles.events";
import { IconArrowRight } from "../icon/icons";
import type { EventItem } from "../types/events";

interface EventSectionProps {
  title: string;
  icon?: React.ReactNode;
  events: EventItem[];
  onOpenGroup: () => void;
  first?: boolean;
  emptyPlaceholder?: string;
}

export function EventSection({
  title,
  icon,
  events,
  onOpenGroup,
  first = false,
  emptyPlaceholder = "Пока нет ивентов",
}: EventSectionProps) {
  const isEmpty = events.length === 0;

  return (
    <S.Section first={first} empty={isEmpty}>
      <S.SectionHeader>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {icon}
          {title}
        </h3>
        <S.BtnEvent onClick={onOpenGroup}>
          Все
          <IconArrowRight />
        </S.BtnEvent>
      </S.SectionHeader>

      <S.EventsList empty={isEmpty}>
        {!isEmpty ? (
          events.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <S.EmptyPlaceholder>{emptyPlaceholder}</S.EmptyPlaceholder>
        )}
      </S.EventsList>
    </S.Section>
  );
}
