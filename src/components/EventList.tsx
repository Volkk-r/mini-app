import React, { type ComponentType } from "react";
import { EventSection } from "./EventSection";
import type { EventItem } from "../types/events";
import type { IconBaseProps } from "../types/colors";

interface EventListProps {
  eventsByType: Record<string, EventItem[]>;
  allTypes: string[];
  iconByType: Record<string, ComponentType<IconBaseProps>>;
  onOpenGroup: (type: string) => void;
}

export const EventList: React.FC<EventListProps> = ({
  eventsByType,
  allTypes,
  iconByType,
  onOpenGroup,
}) => {
  return (
    <>
      {allTypes.map((type, index) => {
        const IconComponent = iconByType[type];
        return (
          <EventSection
            key={type}
            title={type}
            icon={IconComponent && <IconComponent />}
            events={eventsByType[type] || []}
            onOpenGroup={() => onOpenGroup(type)}
            first={index === 0}
            emptyPlaceholder="Пока нет ивентов"
          />
        );
      })}
    </>
  );
};
