import styled from "@emotion/styled";

interface EventImageProps {
  imageUrl?: string;
  eventType: string;
}

const gradientsByType: Record<string, string> = {
  События: "linear-gradient(180deg, #0099FF, #c1d9ff)",
  Олимпиада: "linear-gradient(180deg, #FF9500, #FFBD61)",
  Конкурс: "linear-gradient(180deg, #7378FF, #ACAFFF)",
  Стажировка: "linear-gradient(180deg, #787878, #161616)",
  Вакансия: "linear-gradient(135deg, #87C0FF, #007AFF)",
};

export const EventCardContainer = styled.div`
  min-width: 340px;
  max-width: 358px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 1px 24px rgba(162, 89, 255, 0.12);
  display: flex;
  flex-direction: column;
  margin: auto;
  transition: box-shadow 0.2s;
  position: relative;
  isolation: isolate;
  cursor: pointer;

  &:hover {
    box-shadow: 0 1px 32px rgba(162, 89, 255, 0.18);
  }
`;

export const BadgeNew = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #fff;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  z-index: 5;
`;

export const EventImage = styled.div<EventImageProps>`
  height: 160px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  position: relative;
  z-index: 2;
  background: ${({ imageUrl, eventType }) =>
    imageUrl
      ? `url(${imageUrl}) center/cover no-repeat`
      : gradientsByType[eventType] ||
        "linear-gradient(180deg, #0099FF, #FFFFFF)"};
`;

export const EventInfo = styled.div`
  padding: 10px 12px 12px 12px;
  background: #fff;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  height: 100px;
  position: relative;
  z-index: 1;
`;

export const EventTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2px;
`;

export const EventType = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

export const CompanyText = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin: 4px 0;
`;

export const DateText = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`;

export const TagsContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Tag = styled.span`
  background: #f0f0f0;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
`;
