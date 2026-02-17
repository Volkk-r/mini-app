import React from "react";
import { useNavigate } from "react-router-dom";
import type { EventItem } from "../types/events";
import * as S from "../styles/styles.eventsCard";

interface EventCardProps extends EventItem {}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  type,
  company,
  date,
  isNew,
  tags,
  imageUrl,
}) => {
  const navigate = useNavigate();

  return (
    <S.EventCardContainer onClick={() => navigate(`/events/${id}`)}>
      {isNew && <S.BadgeNew>NEW</S.BadgeNew>}
      <S.EventImage imageUrl={imageUrl} eventType={type} />
      <S.EventInfo>
        <S.EventTitle>{title}</S.EventTitle>
        <S.EventType>{type}</S.EventType>
        <S.CompanyText>{company}</S.CompanyText>
        <S.DateText>{date}</S.DateText>
        {tags && tags.length > 0 && (
          <S.TagsContainer>
            {tags.map((tag) => (
              <S.Tag key={tag}>{tag}</S.Tag>
            ))}
          </S.TagsContainer>
        )}
      </S.EventInfo>
    </S.EventCardContainer>
  );
};

export default EventCard;
