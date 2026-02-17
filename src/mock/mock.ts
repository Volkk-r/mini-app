import type { EventItem } from "../types/events";
import type { UserProfile } from "../types/user";

// логин
export const MOCK_LOGIN = "test@test.test";
export const MOCK_PASSWORD = "test12";
export const MOCK_USERID = "1";

// юсер
export const MOCK_USER: UserProfile = {
  id: MOCK_USERID,
  fullName: "Сигидин Ярослав Тимурович",
  age: 17,
  direction: "Frontend",
  course: "2 курс",
  avatarUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop",
  website: "https://sigdingo.com",
  username: "sigdingo",
  email: "sigdingo@gmail.com",
  phone: "89619701510",
  about:
    "Привет! Меня зовут Алексей, и я увлекаюсь программированием и путешествиями. В свободное время люблю читать книги и изучать новые языки. Мечтаю посетить Японию и попробовать настоящие суши!",
  techStack: ["React", "API", "Paskal", "Python", "RestApi", "Tilda", "Figma"],
  university: "МГУ",
  faculty: "Факультет вычислительной математики и кибернетики",
  graduationYear: 2026,
  location: "Москва",
  socialLinks: {
    github: "https://github.com/sigdingo",
    telegram: "@sigdingo",
  },
};

export const bannerSlides = [
  {
    id: 1,
    title: "Олимпиады",
    type: "Олимпиада",
  },
  {
    id: 2,
    title: "Конкурсы",
    type: "Конкурс",
  },
  {
    id: 3,
    title: "Стажировки",
    type: "Стажировка",
  },
  {
    id: 4,
    title: "Вакансии",
    type: "Вакансия",
  },
  {
    id: 5,
    title: "События",
    type: "События",
  },
];

export const mockEvents: EventItem[] = [
  {
    id: "1",
    title: "Олимпиада по математике",
    type: "Олимпиада",
    company: 'ООО "ЛучшийИнфоГигант"',
    date: "30 октября 17:00",
    isNew: true,
    tags: ["Frontend", "2024"],
  },
  {
    id: "2",
    title: "Олимпиада по физике",
    type: "Олимпиада",
    company: 'ООО "Наука"',
    date: "до 20 ноября",
    isNew: true,
    tags: ["Backend"],
  },
  {
    id: "3",
    title: "Конкурс программирования",
    type: "Конкурс",
    company: 'ООО "Наука"',
    date: "30 октября 17:00",
    isNew: true,
    tags: ["Backend"],
  },
  {
    id: "4",
    title: "Стажировка в IT компании",
    type: "Стажировка",
    company: 'ООО "Наука"',
    date: "27 октября 17:00",
    tags: ["Backend"],
  },
  {
    id: "5",
    title: "Вакансия разработчика",
    type: "Вакансия",
    company: 'ООО "Наука"',
    date: "до 1 ноября",
    tags: ["Backend"],
  },
  {
    id: "6",
    title: "Вакансия разработчика",
    type: "События",
    company: 'ООО "Наука"',
    date: "1 октября 17:00",
    tags: ["Backend"],
  },
  {
    id: "7",
    title: "Конкурс программирования",
    type: "Конкурс",
    company: 'ООО "Наука"',
    date: "15 декабря 14:00",
    isNew: true,
    tags: ["Backend"],
  },
];

export const fallbackEvents: EventItem[] = [
  {
    id: "1",
    title: "Олимпиада по математике",
    type: "Олимпиада",
    company: 'ООО "ЛучшийИнфоГигант"',
    date: "30 октября 17:00",
    isNew: true,
    tags: ["Frontend", "2024"],
  },
  {
    id: "2",
    title: "Олимпиада по физике",
    type: "Олимпиада",
    company: 'ООО "Наука"',
    date: "до 20 ноября",
    isNew: true,
    tags: ["Backend"],
  },
  {
    id: "3",
    title: "Конкурс программирования",
    type: "Конкурс",
    company: 'ООО "Наука"',
    date: "30 октября 17:00",
    isNew: true,
    tags: ["Backend"],
  },
  {
    id: "4",
    title: "Стажировка в IT компании",
    type: "Стажировка",
    company: 'ООО "Наука"',
    date: "27 октября 17:00",
    tags: ["Backend"],
  },
  {
    id: "5",
    title: "Вакансия разработчика",
    type: "Вакансия",
    company: 'ООО "Наука"',
    date: "до 1 ноября",
    tags: ["Backend"],
  },
  {
    id: "6",
    title: "Вакансия разработчика",
    type: "События",
    company: 'ООО "Наука"',
    date: "1 октября 17:00",
    tags: ["Backend"],
  },
  {
    id: "7",
    title: "Конкурс программирования",
    type: "Конкурс",
    company: 'ООО "Наука"',
    date: "15 декабря 14:00",
    isNew: true,
    tags: ["Backend"],
  },
];
