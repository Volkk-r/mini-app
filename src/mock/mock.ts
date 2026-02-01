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