import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { EventItem } from "../types/events";
import { fetchEventById } from "../api/events";
import { useMyEvents } from "../context/MyEventsContext";
import { fallbackEvents } from "../mock/mock";
import * as S from "../styles/styles.eventDetail";

const gradients: Record<string, string> = {
  События: "linear-gradient(180deg, #0099FF, #FFFFFF)",
  Олимпиада: "linear-gradient(180deg, #FF9500, #FFBD61)",
  Конкурс: "linear-gradient(180deg, #7378FF, #ACAFFF)",
  Стажировка: "linear-gradient(180deg, #787878, #161616)",
  Вакансия: "linear-gradient(135deg, #87C0FF, #007AFF)",
};

function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addEvent, isEventAdded } = useMyEvents();

  const [eventItem, setEventItem] = useState<EventItem | undefined>(() =>
    fallbackEvents.find((e) => e.id === id),
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id) return;
      try {
        const data = await fetchEventById(id);
        if (!cancelled && data) setEventItem(data);
      } catch (_err) {}
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!eventItem) {
    return (
      <S.NotFoundContainer>
        <S.BackButton onClick={() => navigate(-1)}>Назад</S.BackButton>
        <S.NotFoundMessage>Ивент не найден</S.NotFoundMessage>
      </S.NotFoundContainer>
    );
  }

  const headerGradient =
    gradients[eventItem.type] || "linear-gradient(135deg, #787878, #161616)";
  const isAdded = isEventAdded(eventItem.id);

  return (
    <S.Container>
      <S.Header background={headerGradient} />
      <S.Grid>
        <S.Card>
          <S.Info>
            <S.Title>{eventItem.title}</S.Title>
            <S.ChipsRow>
              <S.Chip muted>c {eventItem.date}</S.Chip>
              <S.Chip>{eventItem.type}</S.Chip>
              {eventItem.tags?.map((tag) => (
                <S.Chip key={tag} muted>
                  {tag}
                </S.Chip>
              ))}
            </S.ChipsRow>
            <S.Description>
              Приглашаем вас на уникальное мероприятие, организованное компанией
              "Инфотех". В этот день мы представим новейшие технологии и решения
              в области информационных технологий. Участники смогут посетить
              мастер-классы, где эксперты поделятся своими знаниями и опытом.
              Также будет возможность пообщаться с представителями ведущих
              компаний отрасли. Не упустите шанс расширить свои горизонты и
              завести полезные знакомства. Ждем вас на нашем мероприятии!
            </S.Description>
            <S.CtaButton
              background={headerGradient}
              disabled={isAdded}
              onClick={() => {
                if (!isAdded) {
                  addEvent(eventItem);
                  alert('Событие добавлено в "Мои события"!');
                } else {
                  alert("Вы уже участвуете в этом событии!");
                }
              }}
            >
              {isAdded ? "Уже участвуете" : "Участвовать"}
            </S.CtaButton>
          </S.Info>
        </S.Card>
      </S.Grid>
    </S.Container>
  );
}

export default EventDetail;
