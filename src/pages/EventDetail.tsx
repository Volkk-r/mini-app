import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import type { EventItem } from '../types/events';
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

const Container = styled.div`

  position: relative;
  background: #fff;
`;

const Header = styled.div<{ gradient: string }>`
  height: 256px;
  position: relative;
  z-index: 1;
  background-image: ${({ gradient }) => gradient};
`;

const Grid = styled.div`
  position: relative;
  z-index: 10;
  border-radius: 40px 40px 0 0;
`;

const Card = styled.div`
  max-width: 600px;
  margin: -24px auto 0 auto;
  border-radius: 20px;
  overflow: hidden;
`;

const Info = styled.div`
  background: #fff;
  padding: 16px 14px 16px 14px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 590;
  margin-bottom: 8px;
`;

const ChipsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const Chip = styled.span<{ muted?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  background: ${({ muted }) => (muted ? '#EFEFF4' : '#F1F1F4')};
  color: #666;
`;

const Description = styled.div`
  font-size: 15px;
  line-height: 22px;
  color: #707579;
  margin-bottom: 16px;
`;

const CtaButton = styled.button<{ gradient: string; disabled?: boolean }>`
  display: block;
  width: 100%;
  padding: 0px 12px;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  background-image: ${({ gradient }) => gradient};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #007aff;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
`;

const NotFound = styled.div`
  margin-top: 16px;
`;

function EventDetailPage() {
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

  const gradients: Record<string, string> = {
    'События': 'linear-gradient(180deg, #0099FF, #FFFFFF)',
    'Олимпиада': 'linear-gradient(180deg, #FF9500, #FFBD61)',
    'Конкурс': 'linear-gradient(180deg, #7378FF, #ACAFFF)',
    'Стажировка': 'linear-gradient(180deg, #787878, #161616)',
    'Вакансия': 'linear-gradient(135deg, #87C0FF, #007AFF)'
  };

  if (!eventItem) {
    return (
      <Container style={{ padding: 16 }}>
        <BackButton className="btn-event" onClick={() => navigate(-1)}>Назад</BackButton>
        <NotFound>Ивент не найден</NotFound>
      </Container>
    );
  }

  const gradient = gradients[eventItem.type] || 'linear-gradient(135deg, #787878, #161616)';

  return (
    <Container>
      <Header gradient={gradient} />
      <Grid>
        <Card>
          <Info>
            <Title>{eventItem.title}</Title>
            <ChipsRow>
              <Chip muted>c {eventItem.date}</Chip>
              <Chip>{eventItem.type}</Chip>
              {eventItem.tags?.map(tag => (
                <Chip key={tag} muted>{tag}</Chip>
              ))}
            </ChipsRow>
            <Description>
              Приглашаем вас на уникальное мероприятие, организованное компанией "Инфотех". В этот день мы представим новейшие технологии и решения в области информационных технологий. Участники смогут посетить мастер-классы, где эксперты поделятся своими знаниями и опытом. Также будет возможность пообщаться с представителями ведущих компаний отрасли. Не упустите шанс расширить свои горизонты и завести полезные знакомства. Ждем вас на нашем мероприятии!
            </Description>
            <CtaButton 
              gradient={gradient}
              disabled={isEventAdded(eventItem.id)}
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
            </CtaButton>
          </Info>
        </Card>
      </Grid>
    </Container>
  );
}

export default EventDetailPage;