import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen, CalendarCheck, CheckCircle2, ChevronRight, Clock, Filter,
  GraduationCap, Mail, MapPin, MessageSquare, Navigation, Phone, Search,
  ShieldCheck, Star, Users
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

export type StaffCategory = 'ППС' | 'АУП' | 'Деканат' | 'Сервис';
export type Presence = 'На месте' | 'На занятии' | 'Приём по записи' | 'Нет на месте' | 'По расписанию';

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  category: StaffCategory;
  department: string;
  subjectArea: string;
  room: string;
  floor: string;
  corpus: string;
  presence: Presence;
  hours: string;
  email: string;
  phone: string;
  telegram: string;
  photo: string;
  color: string;
  questions: string[];
  schedule: { day: string; time: string; status: 'Свободно' | 'Занято' }[];
}

export const staff: StaffMember[] = [
  {
    id: 1,
    name: 'Нурланов Бауыржан Ерланович',
    role: 'Профессор кафедры информационных технологий',
    category: 'ППС',
    department: 'Факультет цифровых технологий и автоматики',
    subjectArea: 'Алгоритмы, базы данных, web-разработка, дипломные проекты',
    room: 'A-301',
    floor: '3 этаж',
    corpus: 'Корпус A',
    presence: 'На месте',
    hours: 'Пн, Ср: 10:00-12:00',
    email: 'b.nurlanov@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 1204',
    telegram: '@nurlanov_aues',
    photo: 'https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80',
    color: '#7FB8A0',
    questions: ['Курсовые и дипломные работы', 'Консультации по программированию', 'Апелляция по экзамену', 'Научная работа студентов'],
    schedule: [
      { day: 'Понедельник', time: '10:00-12:00', status: 'Свободно' },
      { day: 'Среда', time: '14:00-16:00', status: 'Свободно' },
      { day: 'Пятница', time: '09:00-11:00', status: 'Занято' },
    ],
  },
  {
    id: 2,
    name: 'Сейткали Айгерим Маратовна',
    role: 'Доцент кафедры электроэнергетики',
    category: 'ППС',
    department: 'Факультет энергетики и электротехники',
    subjectArea: 'Электротехника, схемотехника, лабораторные работы',
    room: 'B-318',
    floor: '3 этаж',
    corpus: 'Корпус B',
    presence: 'На занятии',
    hours: 'Вт, Чт: 11:00-13:00',
    email: 'a.seitkali@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 2318',
    telegram: '@seitkali_aues',
    photo: 'https://images.unsplash.com/photo-1765248149444-3d01d93f93e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80',
    color: '#7EC8E3',
    questions: ['Лабораторные работы', 'Расчёт курсовых проектов', 'Производственная практика', 'Консультации по электротехнике'],
    schedule: [
      { day: 'Вторник', time: '11:00-13:00', status: 'Свободно' },
      { day: 'Четверг', time: '15:00-17:00', status: 'Свободно' },
      { day: 'Суббота', time: '10:00-12:00', status: 'Занято' },
    ],
  },
  {
    id: 3,
    name: 'Сулейменов Арман Нурланович',
    role: 'Декан факультета цифровых технологий',
    category: 'Деканат',
    department: 'Факультет цифровых технологий',
    subjectArea: 'Академические справки, перевод, восстановление, индивидуальные планы',
    room: 'B-205',
    floor: '2 этаж',
    corpus: 'Корпус B',
    presence: 'Приём по записи',
    hours: 'Пн, Ср: 14:00-16:00',
    email: 'fit@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 2205',
    telegram: '@fit_dean_aues',
    photo: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80',
    color: '#9B7EC8',
    questions: ['Перевод', 'Восстановление', 'Академическая справка', 'Апелляция', 'Дисциплинарные вопросы'],
    schedule: [
      { day: 'Понедельник', time: '14:00-16:00', status: 'Свободно' },
      { day: 'Среда', time: '14:00-16:00', status: 'Свободно' },
      { day: 'Пятница', time: '10:00-11:00', status: 'Занято' },
    ],
  },
  {
    id: 4,
    name: 'Абдрахманова Лаура Кайратовна',
    role: 'Директор департамента цифровизации',
    category: 'АУП',
    department: 'Департамент информационных технологий',
    subjectArea: 'Цифровые сервисы, доступы, интеграции, технические обращения',
    room: 'A-315',
    floor: '3 этаж',
    corpus: 'Корпус A',
    presence: 'На месте',
    hours: 'Вт, Чт: 11:00-12:30',
    email: 'digital@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 1315',
    telegram: '@digital_aues',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80',
    color: '#E8A87C',
    questions: ['Доступ к системам', 'Ошибки цифровых сервисов', 'Заявки на автоматизацию', 'Интеграции и Energen'],
    schedule: [
      { day: 'Вторник', time: '11:00-12:30', status: 'Свободно' },
      { day: 'Четверг', time: '11:00-12:30', status: 'Свободно' },
      { day: 'Пятница', time: '15:00-16:00', status: 'Занято' },
    ],
  },
  {
    id: 5,
    name: 'Ибраева Жанар Болатовна',
    role: 'Специалист финансового центра',
    category: 'Сервис',
    department: 'Финансовый центр',
    subjectArea: 'Оплата обучения, QR-коды, общежитие, реквизиты',
    room: 'C-112',
    floor: '1 этаж',
    corpus: 'Корпус C',
    presence: 'По расписанию',
    hours: 'Пн-Пт: 09:00-17:00',
    email: 'finance@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 1112',
    telegram: '@finance_aues',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=500&q=80',
    color: '#F7DC6F',
    questions: ['Оплата обучения', 'Оплата общежития', 'Реквизиты', 'Справки по задолженности'],
    schedule: [
      { day: 'Понедельник', time: '09:00-17:00', status: 'Свободно' },
      { day: 'Среда', time: '09:00-17:00', status: 'Свободно' },
      { day: 'Пятница', time: '09:00-15:00', status: 'Свободно' },
    ],
  },
];

export const categories: Array<'Все' | StaffCategory> = ['Все', 'ППС', 'Деканат', 'АУП', 'Сервис'];

export const categoryIcons: Record<StaffCategory, React.ElementType> = {
  'ППС': GraduationCap,
  'АУП': ShieldCheck,
  'Деканат': Star,
  'Сервис': Users,
};

export const presenceColors: Record<string, string> = {
  'На месте': '#7FB8A0',
  'На занятии': '#7EC8E3',
  'Приём по записи': '#9B7EC8',
  'Нет на месте': '#E87C9B',
  'По расписанию': '#F7DC6F',
};

export const EmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Все' | StaffCategory>('Все');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(staff[0].id);

  const filteredStaff = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return staff.filter(member => {
      const matchesCategory = activeCategory === 'Все' || member.category === activeCategory;
      const matchesQuery = !normalized || [
        member.name,
        member.role,
        member.department,
        member.subjectArea,
        member.room,
        member.questions.join(' '),
      ].join(' ').toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const selected = filteredStaff.find(member => member.id === selectedId) ?? filteredStaff[0] ?? staff[0];
  const CategoryIcon = categoryIcons[selected.category];
  const presenceColor = presenceColors[selected.presence] ?? selected.color;

  const chooseMember = (id: number) => setSelectedId(id);

  return (
    <Layout title="Сотрудники" showBack>
      <div className="employee-page page-content mx-auto px-4 sm:px-6" style={{ paddingTop: '1.15rem', paddingBottom: '3rem' }}>
        <div className="employee-workspace grid lg:grid-cols-[330px_minmax(0,1fr)] gap-6">
          <aside className="employee-search-sidebar">
            <motion.h1 className="employee-search-title" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              Сотрудники
            </motion.h1>

            <div className="room-search-toolbar">
              <div className="room-search-field">
                <Search size={18} style={{ color: 'var(--app-icon-muted)' }} />
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="ФИО, должность или вопрос"
                  aria-label="Поиск сотрудника"
                />
              </div>
              <button
                type="button"
                className="room-filter-trigger"
                data-active={activeCategory !== 'Все'}
                onClick={() => setFiltersOpen(current => !current)}
                aria-label="Фильтр сотрудников"
                aria-expanded={filtersOpen}
                title="Фильтр"
              >
                <Filter size={18} />
              </button>
              {filtersOpen && (
                <div className="room-filter-popover" aria-label="Фильтр по категории">
                  <span>Категория</span>
                  <div>
                    {categories.map(category => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setActiveCategory(category);
                          setFiltersOpen(false);
                        }}
                        data-active={activeCategory === category}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="employee-results-meta"><span>Результаты</span><strong>{filteredStaff.length}</strong></div>
            <div className="employee-results directory-results">
              {filteredStaff.length ? filteredStaff.map(member => {
                const Icon = categoryIcons[member.category];
                const memberPresenceColor = presenceColors[member.presence] ?? member.color;
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => chooseMember(member.id)}
                    className="employee-result-card"
                    data-selected={selected.id === member.id}
                    style={{ '--employee-accent': member.color } as React.CSSProperties}
                  >
                    <img src={member.photo} alt="" />
                    <div>
                      <div className="employee-result-status" style={{ color: memberPresenceColor }}><Icon size={13} /> {member.category} · {member.presence}</div>
                      <div className="employee-result-name">{member.name}</div>
                      <div className="employee-result-role">{member.role}</div>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                );
              }) : (
                <div className="room-empty-state">Сотрудник не найден. Попробуйте ФИО, подразделение или вопрос.</div>
              )}
            </div>
          </aside>

          <motion.section className="employee-profile" key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
            <div className="employee-profile-cover" style={{ background: `linear-gradient(135deg, ${selected.color}38, rgba(var(--brand-mint-rgb),0.08))` }} />
            <div className="employee-profile-content">
              <header className="employee-profile-header">
                <img src={selected.photo} alt={selected.name} />
                <div>
                  <div className="employee-profile-status">
                    <span style={{ color: selected.color }}><CategoryIcon size={16} /> {selected.category}</span>
                    <span style={{ color: presenceColor }}>{selected.presence}</span>
                  </div>
                  <h2>{selected.name}</h2>
                </div>
              </header>

              <div className="employee-profile-role" style={{ color: selected.color }}>{selected.role}</div>
              <div className="employee-profile-department">{selected.department}</div>

              <div className="employee-profile-facts">
                {[
                  { icon: MapPin, label: 'Кабинет', value: `${selected.room}, ${selected.floor}, ${selected.corpus}` },
                  { icon: Clock, label: 'Приём', value: selected.hours },
                  { icon: BookOpen, label: 'Область', value: selected.subjectArea },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <section key={item.label}>
                      <Icon size={18} style={{ color: selected.color }} />
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </section>
                  );
                })}
              </div>

              <div className="employee-profile-panels">
                <section>
                  <div className="employee-panel-heading"><CheckCircle2 size={17} style={{ color: selected.color }} /> По каким вопросам обращаться</div>
                  <div className="employee-profile-questions">
                    {selected.questions.map(question => <div key={question}><CheckCircle2 size={16} style={{ color: selected.color }} /> {question}</div>)}
                  </div>
                </section>
                <section>
                  <div className="employee-panel-heading"><CalendarCheck size={17} style={{ color: selected.color }} /> Ближайшие часы</div>
                  <div className="employee-profile-schedule">
                    {selected.schedule.map(slot => (
                      <div key={`${slot.day}-${slot.time}`}><span>{slot.day}</span><strong style={{ color: slot.status === 'Свободно' ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)' }}>{slot.time}</strong></div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="employee-profile-contacts">
                {[
                  { icon: Mail, label: selected.email, href: `mailto:${selected.email}` },
                  { icon: Phone, label: selected.phone, href: `tel:${selected.phone.replace(/\D/g, '')}` },
                  { icon: MessageSquare, label: selected.telegram, href: '#' },
                ].map(contact => {
                  const Icon = contact.icon;
                  return <a key={contact.label} href={contact.href}><Icon size={17} style={{ color: selected.color }} /><span>{contact.label}</span></a>;
                })}
              </div>

              <div className="employee-profile-actions">
                <button type="button" className="employee-profile-route" onClick={() => navigate('/room')}><Navigation size={18} /> {t('howToGetThere')}</button>
                <button type="button" className="employee-profile-action" onClick={() => navigate(selected.category === 'ППС' || selected.category === 'Сервис' ? '/chat' : '/appointment')}>
                  <CalendarCheck size={18} /> {selected.category === 'ППС' || selected.category === 'Сервис' ? 'Уточнить вопрос' : t('bookAppointment')}
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};
