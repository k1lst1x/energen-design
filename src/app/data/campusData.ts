const eventImg1 = 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const eventImg2 = 'https://images.unsplash.com/photo-1631350397792-8e0c2de5b637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const eventImg3 = 'https://images.unsplash.com/photo-1712029972454-0ed8bb0c0fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const eventImg4 = 'https://images.unsplash.com/photo-1680264370818-659352fa16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';

const roboticsImg = 'https://images.unsplash.com/photo-1755053757912-a63da9d6e0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const musicImg = 'https://images.unsplash.com/photo-1770844049822-583611b8efb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const hackImg = 'https://images.unsplash.com/photo-1631350397792-8e0c2de5b637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const clubImg4 = 'https://images.unsplash.com/photo-1680264370818-659352fa16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const roboticsImg2 = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const musicImg2 = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const hackImg2 = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';
const volunteerImg2 = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80';

export type Club = {
  id: number;
  name: string;
  shortDesc: string;
  fullDesc: string;
  members: number;
  image: string;
  gallery: string[];
  color: string;
  bg: string;
  contacts: {
    email: string;
    phone: string;
    instagram: string;
  };
  socials: {
    instagram: string;
    tiktok: string;
  };
  location: string;
  schedule: string;
  nextEvent: string;
  tags: string[];
  direction: string;
  achievements: string[];
};

export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  startsAt: string;
  dateShort: { day: string; month: string };
  location: string;
  type: string;
  period: string;
  typeLabel: string;
  capacity: number;
  registered: number;
  image: string;
  color: string;
  description: string;
  clubIds: number[];
};

export const clubs: Club[] = [
  {
    id: 1,
    name: 'Клуб робототехники AUES Robotics',
    shortDesc: 'Проектируем и создаём роботов для соревнований',
    fullDesc: 'Клуб занимается разработкой роботов различного назначения — от манипуляторов до автономных дронов. Участвуем в международных соревнованиях RoboCup и Kazakhstan Robotics Olympiad.',
    members: 42,
    image: roboticsImg,
    gallery: [roboticsImg, roboticsImg2, hackImg],
    color: '#7FB8A0',
    bg: 'rgba(127,184,160,0.1)',
    contacts: {
      email: 'robotics@aues.kz',
      phone: '+7 (727) 292-07-60 доб. 2310',
      instagram: '@aues_robotics',
    },
    socials: {
      instagram: 'https://instagram.com/aues_robotics',
      tiktok: 'https://www.tiktok.com/@aues_robotics',
    },
    location: 'Лаборатория A-214',
    schedule: 'Ср 17:00',
    nextEvent: 'Сборка робота-сумо',
    tags: ['Инженерия', 'Программирование', 'Соревнования'],
    direction: 'engineering',
    achievements: ['RoboCup 2025 — 1 место в регионе', 'КазРобот 2024 — Гран-при'],
  },
  {
    id: 2,
    name: 'Студенческий музыкальный клуб AUES Music',
    shortDesc: 'Вокал, инструменты, концерты и фестивали',
    fullDesc: 'Открыты для всех любителей музыки — от классики до современных жанров. Проводим концерты, участвуем в университетских мероприятиях и городских фестивалях.',
    members: 78,
    image: musicImg,
    gallery: [musicImg, musicImg2, clubImg4],
    color: '#E87C9B',
    bg: 'rgba(232,124,155,0.1)',
    contacts: {
      email: 'music@aues.kz',
      phone: '+7 (727) 292-07-60 доб. 2400',
      instagram: '@aues_music',
    },
    socials: {
      instagram: 'https://instagram.com/aues_music',
      tiktok: 'https://www.tiktok.com/@aues_music',
    },
    location: 'Актовый зал',
    schedule: 'Вт, Чт 18:00',
    nextEvent: 'Открытая репетиция',
    tags: ['Музыка', 'Концерты', 'Творчество'],
    direction: 'creative',
    achievements: ['Лучший студенческий клуб 2025', 'Гала-концерт "Звёзды АЭУС" 2024'],
  },
  {
    id: 3,
    name: 'IT и Хакатон клуб HackAUES',
    shortDesc: 'Хакатоны, проекты, стартапы, нетворкинг',
    fullDesc: 'Объединяем разработчиков, дизайнеров и предпринимателей. Организуем хакатоны, воркшопы и менторинг-сессии с представителями IT-индустрии Казахстана.',
    members: 95,
    image: hackImg,
    gallery: [hackImg, hackImg2, roboticsImg2],
    color: '#9B7EC8',
    bg: 'rgba(155,126,200,0.1)',
    contacts: {
      email: 'hack@aues.kz',
      phone: '+7 (727) 292-07-60 доб. 2510',
      instagram: '@hackaues',
    },
    socials: {
      instagram: 'https://instagram.com/hackaues',
      tiktok: 'https://www.tiktok.com/@hackaues',
    },
    location: 'Компьютерный центр',
    schedule: 'Сб 11:00',
    nextEvent: 'Mini-hack day',
    tags: ['IT', 'Программирование', 'Стартапы', 'Нетворкинг'],
    direction: 'engineering',
    achievements: ['Лучший стартап-клуб KZ 2025', '3 команды в акселератор Q Accelerator'],
  },
  {
    id: 4,
    name: 'Волонтёрский клуб AUES Volunteers',
    shortDesc: 'Социальные проекты и помощь обществу',
    fullDesc: 'Реализуем экологические, социальные и образовательные инициативы. Более 500 волонтёрских часов ежегодно и партнёрство с городскими организациями Алматы.',
    members: 130,
    image: clubImg4,
    gallery: [clubImg4, volunteerImg2, hackImg],
    color: '#7EC8E3',
    bg: 'rgba(126,200,227,0.1)',
    contacts: {
      email: 'volunteer@aues.kz',
      phone: '+7 (727) 292-07-60 доб. 2600',
      instagram: '@aues_volunteers',
    },
    socials: {
      instagram: 'https://instagram.com/aues_volunteers',
      tiktok: 'https://www.tiktok.com/@aues_volunteers',
    },
    location: 'Студенческий центр',
    schedule: 'Пт 16:00',
    nextEvent: 'Eco campus day',
    tags: ['Волонтёрство', 'Экология', 'Социальные проекты'],
    direction: 'volunteer',
    achievements: ['Eco Award 2025', 'Лучший волонтёрский клуб ВУЗа Алматы'],
  },
];

export const events: CampusEvent[] = [
  {
    id: 1,
    title: 'Международная конференция по энергетике ENERGY-2026',
    date: '15 апреля 2026',
    startsAt: '2026-04-15T10:00:00+06:00',
    dateShort: { day: '15', month: 'АПР' },
    location: 'Главный актовый зал, Корпус A',
    type: 'conference',
    period: 'month',
    typeLabel: 'Конференция',
    capacity: 250,
    registered: 178,
    image: eventImg1,
    color: '#7FB8A0',
    description: 'Ежегодная международная конференция, объединяющая учёных и специалистов в области энергетики и электроэнергетики.',
    clubIds: [1, 3],
  },
  {
    id: 2,
    title: 'Хакатон по цифровым технологиям DIGITECH-2026',
    date: '22 апреля 2026',
    startsAt: '2026-04-22T09:00:00+06:00',
    dateShort: { day: '22', month: 'АПР' },
    location: 'Компьютерный центр, Корпус B',
    type: 'hackathon',
    period: 'week',
    typeLabel: 'Хакатон',
    capacity: 120,
    registered: 98,
    image: eventImg2,
    color: '#9B7EC8',
    description: '48-часовой хакатон для студентов по разработке инновационных решений в области цифровых технологий.',
    clubIds: [3, 1],
  },
  {
    id: 3,
    title: 'День открытых дверей АЭУС 2026',
    date: '3 мая 2026',
    startsAt: '2026-05-03T11:00:00+06:00',
    dateShort: { day: '3', month: 'МАЙ' },
    location: 'Главный корпус',
    type: 'open-day',
    period: 'month',
    typeLabel: 'Открытый день',
    capacity: 500,
    registered: 312,
    image: eventImg3,
    color: '#7EC8E3',
    description: 'Познакомьтесь с нашим университетом, кафедрами, преподавателями и возможностями для абитуриентов.',
    clubIds: [4, 2],
  },
  {
    id: 4,
    title: 'Студенческий фестиваль науки и творчества',
    date: '10 мая 2026',
    startsAt: '2026-05-10T16:00:00+06:00',
    dateShort: { day: '10', month: 'МАЙ' },
    location: 'Студенческий центр',
    type: 'festival',
    period: 'past',
    typeLabel: 'Фестиваль',
    capacity: 400,
    registered: 201,
    image: eventImg4,
    color: '#E87C9B',
    description: 'Ежегодный праздник науки, инноваций и студенческого творчества с выставками проектов и концертами.',
    clubIds: [2, 4],
  },
];

export const filterTypes = [
  { key: 'all', label: 'Все' },
  { key: 'conference', label: 'Конференции' },
  { key: 'hackathon', label: 'Хакатоны' },
  { key: 'open-day', label: 'Открытые дни' },
  { key: 'festival', label: 'Фестивали' },
];

export const dateFilters = [
  { key: 'all', label: 'Все даты' },
  { key: 'week', label: 'Эта неделя' },
  { key: 'month', label: 'Этот месяц' },
  { key: 'past', label: 'Архив' },
];

export const directions = [
  { key: 'all', label: 'Все' },
  { key: 'engineering', label: 'Наука и техника' },
  { key: 'creative', label: 'Творчество' },
  { key: 'volunteer', label: 'Волонтёрство' },
];

export const getClubsForEvent = (event: CampusEvent) =>
  event.clubIds
    .map(id => clubs.find(club => club.id === id))
    .filter((club): club is Club => Boolean(club));

export const getEventsForClub = (clubId: number) =>
  events.filter(event => event.clubIds.includes(clubId));

export const getNearestEventForClub = (clubId: number) => {
  const clubEvents = getEventsForClub(clubId);
  const activeEvents = clubEvents.filter(event => event.period !== 'past');
  const source = activeEvents.length > 0 ? activeEvents : clubEvents;

  return [...source].sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0];
};
