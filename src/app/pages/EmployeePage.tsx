import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen, CalendarCheck, CheckCircle2, ChevronRight, Clock, Filter,
  GraduationCap, Mail, MapPin, MessageSquare, Navigation, Phone, Search,
  ShieldCheck, Star, UserCheck, Users
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

type StaffCategory = 'ППС' | 'АУП' | 'Деканат' | 'Сервис';
type Presence = 'На месте' | 'На занятии' | 'Приём по записи' | 'Нет на месте' | 'По расписанию';

interface StaffMember {
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

const staff: StaffMember[] = [
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

const categories: Array<'Все' | StaffCategory> = ['Все', 'ППС', 'Деканат', 'АУП', 'Сервис'];

const categoryIcons: Record<StaffCategory, React.ElementType> = {
  'ППС': GraduationCap,
  'АУП': ShieldCheck,
  'Деканат': Star,
  'Сервис': Users,
};

const presenceColors: Record<string, string> = {
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

  const selected = staff.find(member => member.id === selectedId) ?? filteredStaff[0] ?? staff[0];
  const CategoryIcon = categoryIcons[selected.category];
  const presenceColor = presenceColors[selected.presence] ?? selected.color;

  const chooseMember = (id: number) => setSelectedId(id);

  return (
    <Layout title="Сотрудники" showBack>
      <div className="page-content max-w-6xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: 'var(--app-text-strong)', fontWeight: 850, fontSize: '1.9rem', marginBottom: 8 }}>
            Сотрудники и преподаватели
          </h1>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.95rem', maxWidth: 820, lineHeight: 1.6 }}>
            Поиск по ФИО, должности, подразделению или вопросу. Карточка показывает кабинет, присутствие, часы приёма и по каким вопросам обращаться.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[390px_1fr] gap-5">
          <aside>
            <div
              className="flex items-center gap-2"
              style={{
                background: 'var(--app-card)',
                border: '1px solid var(--app-border)',
                borderRadius: 14,
                padding: '0.85rem 1rem',
                marginBottom: '0.85rem',
              }}
            >
              <Search size={18} style={{ color: 'var(--app-icon-muted)' }} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="ФИО, должность или вопрос"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 0,
                  outline: 'none',
                  color: 'var(--app-text)',
                  fontSize: '0.95rem',
                }}
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '1rem' }}>
              <Filter size={16} style={{ color: 'var(--app-icon-muted)' }} />
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  style={{
                    background: activeCategory === category ? 'var(--brand-mint)' : 'var(--app-control)',
                    border: '1px solid var(--app-control-border)',
                    color: activeCategory === category ? '#0F0F0F' : 'var(--app-text-muted)',
                    borderRadius: 999,
                    padding: '0.45rem 0.75rem',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="directory-results flex flex-col gap-3">
              {filteredStaff.length ? filteredStaff.map(member => {
                const Icon = categoryIcons[member.category];
                const memberPresenceColor = presenceColors[member.presence] ?? member.color;
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => chooseMember(member.id)}
                    className="text-left transition-all duration-200"
                    style={{
                      background: selected.id === member.id ? 'var(--app-surface-hover)' : 'var(--app-card)',
                      border: `1px solid ${selected.id === member.id ? member.color + '66' : 'var(--app-border)'}`,
                      borderRadius: 18,
                      padding: '1rem',
                      boxShadow: selected.id === member.id ? `0 16px 36px ${member.color}16` : 'none',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={member.photo}
                        alt={member.name}
                        style={{ width: 58, height: 58, borderRadius: 16, objectFit: 'cover', objectPosition: 'top center', flexShrink: 0 }}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 6 }}>
                          <span className="flex items-center gap-1" style={{ color: member.color, fontWeight: 850, fontSize: '0.875rem' }}>
                            <Icon size={14} />
                            {member.category}
                          </span>
                          <span style={{ color: memberPresenceColor, fontWeight: 800, fontSize: '0.875rem' }}>
                            {member.presence}
                          </span>
                        </div>
                        <div style={{ color: 'var(--app-text-strong)', fontWeight: 850, lineHeight: 1.25 }}>{member.name}</div>
                        <div style={{ color: 'var(--app-text-muted)', fontSize: '0.9rem', marginTop: 5 }}>{member.role}</div>
                      </div>
                      <ChevronRight size={18} style={{ color: 'var(--app-icon-muted)', flexShrink: 0 }} />
                    </div>
                  </button>
                );
              }) : (
                <div style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)', borderRadius: 18, padding: '1rem', color: 'var(--app-text-muted)', lineHeight: 1.5 }}>
                  Сотрудник не найден. Попробуйте запрос “общежитие”, “академическая справка”, “оплата” или ФИО.
                </div>
              )}
            </div>
          </aside>

          <motion.section
            className="directory-detail"
            key={selected.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'var(--app-card)',
              border: '1px solid var(--app-border)',
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: '0 18px 46px var(--app-shadow)',
            }}
          >
            <div
              style={{
                height: 132,
                background: `linear-gradient(135deg, ${selected.color}38, rgba(var(--brand-mint-rgb),0.08))`,
                borderBottom: '1px solid var(--app-border)',
                position: 'relative',
              }}
            />

            <div className="detail-content" style={{ padding: '0 1.5rem 1.5rem' }}>
              <div className="flex items-end justify-between gap-4 flex-wrap" style={{ marginTop: -52, marginBottom: '1.25rem' }}>
                <div className="flex items-end gap-4">
                  <img
                    src={selected.photo}
                    alt={selected.name}
                    style={{
                      width: 104,
                      height: 104,
                      borderRadius: 24,
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      border: '4px solid var(--app-card)',
                      boxShadow: '0 16px 36px var(--app-shadow)',
                    }}
                  />
                  <div style={{ paddingBottom: 8 }}>
                    <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 8 }}>
                      <span className="flex items-center gap-1" style={{ color: selected.color, fontWeight: 850 }}>
                        <CategoryIcon size={16} />
                        {selected.category}
                      </span>
                      <span style={{ color: presenceColor, fontWeight: 850 }}>{selected.presence}</span>
                    </div>
                    <h2 style={{ color: 'var(--app-text-strong)', fontWeight: 900, fontSize: '1.55rem', lineHeight: 1.15 }}>
                      {selected.name}
                    </h2>
                  </div>
                </div>
              </div>

              <div style={{ color: 'var(--brand-mint-strong)', fontWeight: 850, marginBottom: 6 }}>{selected.role}</div>
              <div style={{ color: 'var(--app-text-muted)', marginBottom: '1.25rem' }}>{selected.department}</div>

              <div className="grid md:grid-cols-3 gap-3" style={{ marginBottom: '1.25rem' }}>
                {[
                  { icon: MapPin, label: 'Кабинет', value: `${selected.room}, ${selected.floor}, ${selected.corpus}` },
                  { icon: Clock, label: 'Приём', value: selected.hours },
                  { icon: BookOpen, label: 'Область', value: selected.subjectArea },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 16, padding: '1rem' }}>
                      <Icon size={18} style={{ color: selected.color, marginBottom: 10 }} />
                      <div style={{ color: 'var(--app-text-soft)', fontSize: '0.875rem', marginBottom: 5 }}>{item.label}</div>
                      <div style={{ color: 'var(--app-text-strong)', fontWeight: 800, lineHeight: 1.35 }}>{item.value}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-[1fr_0.9fr] gap-4">
                <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 18, padding: '1rem' }}>
                  <div className="flex items-center gap-2" style={{ color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 12 }}>
                    <CheckCircle2 size={17} style={{ color: selected.color }} />
                    По каким вопросам обращаться
                  </div>
                  <div className="flex flex-col gap-2">
                    {selected.questions.map(question => (
                      <div key={question} className="flex items-start gap-2" style={{ color: 'var(--app-text)', lineHeight: 1.45 }}>
                        <CheckCircle2 size={16} style={{ color: selected.color, marginTop: 2, flexShrink: 0 }} />
                        {question}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--app-bg-soft)', border: '1px solid var(--app-border)', borderRadius: 18, padding: '1rem' }}>
                  <div className="flex items-center gap-2" style={{ color: 'var(--app-text-strong)', fontWeight: 850, marginBottom: 12 }}>
                    <CalendarCheck size={17} style={{ color: selected.color }} />
                    Ближайшие часы
                  </div>
                  <div className="flex flex-col gap-2">
                    {selected.schedule.map(slot => (
                      <div key={`${slot.day}-${slot.time}`} className="flex items-center justify-between gap-3" style={{ color: 'var(--app-text)' }}>
                        <span>{slot.day}</span>
                        <span style={{ color: slot.status === 'Свободно' ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)', fontWeight: 800 }}>
                          {slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3" style={{ marginTop: '1.25rem' }}>
                {[
                  { icon: Mail, label: selected.email, href: `mailto:${selected.email}` },
                  { icon: Phone, label: selected.phone, href: `tel:${selected.phone.replace(/\D/g, '')}` },
                  { icon: MessageSquare, label: selected.telegram, href: '#' },
                ].map(contact => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={contact.label}
                      href={contact.href}
                      className="flex items-center gap-2"
                      style={{
                        background: 'var(--app-control)',
                        border: '1px solid var(--app-control-border)',
                        borderRadius: 14,
                        padding: '0.85rem',
                        color: 'var(--app-text)',
                        textDecoration: 'none',
                        minWidth: 0,
                      }}
                    >
                      <Icon size={17} style={{ color: selected.color, flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.label}</span>
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3" style={{ marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => navigate('/room')}
                  style={{
                    flex: 1,
                    background: 'var(--app-control)',
                    border: '1px solid var(--app-control-border)',
                    borderRadius: 16,
                    padding: '1rem',
                    color: 'var(--brand-mint-strong)',
                    fontWeight: 850,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Navigation size={18} />
                  {t('howToGetThere')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(selected.category === 'ППС' || selected.category === 'Сервис' ? '/chat' : '/appointment')}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, var(--brand-mint), var(--brand-mint-strong))',
                    border: 'none',
                    borderRadius: 16,
                    padding: '1rem',
                    color: '#0F0F0F',
                    fontWeight: 850,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <CalendarCheck size={18} />
                  {selected.category === 'ППС' || selected.category === 'Сервис' ? 'Уточнить вопрос' : t('bookAppointment')}
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};
