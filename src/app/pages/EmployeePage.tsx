import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, Phone, MapPin, Clock, Navigation,
  CalendarCheck, MessageSquare, ChevronRight, Star, BookOpen, Cpu, FlaskConical
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Layout } from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

interface Employee {
  id: number;
  name: string;
  title: string;
  department: string;
  img: string;
  room: string;
  hours: string;
  rank: string;
  rankColor: string;
  bannerFrom: string;
  bannerTo: string;
  email: string;
  phone: string;
  telegram: string;
  schedule: { day: string; time: string; status: string }[];
  issues: string[];
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'Нурланов Бауыржан Ерланович',
    title: 'Профессор кафедры информационных технологий',
    department: 'Факультет цифровых технологий и автоматики',
    img: 'https://images.unsplash.com/photo-1758685734511-4f49ce9a382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    room: 'Каб. 205, Корпус A',
    hours: 'Пн-Пт: 9:00–17:00',
    rank: 'Профессор',
    rankColor: '#F7DC6F',
    bannerFrom: '#4A2B57',
    bannerTo: '#1E3A2E',
    email: 'b.nurlanov@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 1204',
    telegram: '@nurlanov_aues',
    schedule: [
      { day: 'Понедельник', time: '10:00 – 12:00', status: 'available' },
      { day: 'Среда', time: '14:00 – 16:00', status: 'available' },
      { day: 'Пятница', time: '09:00 – 11:00', status: 'busy' },
    ],
    issues: [
      'Вопросы по курсовым и дипломным работам',
      'Консультации по дисциплине «Алгоритмы и структуры данных»',
      'Апелляция по результатам экзамена',
      'Рекомендательные письма',
      'Научно-исследовательская работа студентов',
    ],
  },
  {
    id: 2,
    name: 'Сейткали Айгерим Маратовна',
    title: 'Доцент кафедры электроэнергетики',
    department: 'Факультет энергетики и электротехники',
    img: 'https://images.unsplash.com/photo-1765248149444-3d01d93f93e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    room: 'Каб. 318, Корпус Б',
    hours: 'Пн-Чт: 10:00–18:00',
    rank: 'Доцент',
    rankColor: '#7EC8E3',
    bannerFrom: '#1A3A5C',
    bannerTo: '#0E2A1A',
    email: 'a.seitkali@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 2318',
    telegram: '@seitkali_aues',
    schedule: [
      { day: 'Вторник', time: '11:00 – 13:00', status: 'available' },
      { day: 'Четверг', time: '15:00 – 17:00', status: 'available' },
      { day: 'Суббота', time: '10:00 – 12:00', status: 'busy' },
    ],
    issues: [
      'Консультации по электротехнике и схемотехнике',
      'Вопросы по лабораторным работам',
      'Расчёт курсовых проектов',
      'Организация производственной практики',
    ],
  },
  {
    id: 3,
    name: 'Джаксыбеков Тимур Олжасович',
    title: 'Старший преподаватель кафедры математики',
    department: 'Факультет общеобразовательных дисциплин',
    img: 'https://images.unsplash.com/photo-1635525382666-4d07a1d48d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    room: 'Каб. 102, Корпус В',
    hours: 'Пн-Пт: 8:00–16:00',
    rank: 'Ст. преподаватель',
    rankColor: '#7FB8A0',
    bannerFrom: '#2B3A1F',
    bannerTo: '#3A2B1F',
    email: 't.dzhaksybekov@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 3102',
    telegram: '@djaksybekov_aues',
    schedule: [
      { day: 'Понедельник', time: '08:00 – 10:00', status: 'available' },
      { day: 'Среда', time: '12:00 – 14:00', status: 'busy' },
      { day: 'Пятница', time: '14:00 – 16:00', status: 'available' },
    ],
    issues: [
      'Консультации по высшей математике',
      'Подготовка к итоговому экзамену',
      'Апелляция результатов рубежного контроля',
      'Вопросы по теории вероятностей и статистике',
    ],
  },
  {
    id: 4,
    name: 'Мухамедиева Дина Талгатовна',
    title: 'Профессор кафедры автоматики и робототехники',
    department: 'Факультет цифровых технологий и автоматики',
    img: 'https://images.unsplash.com/photo-1758685848602-09e52ef9c7d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    room: 'Каб. 411, Корпус A',
    hours: 'Вт-Сб: 9:00–17:00',
    rank: 'Профессор',
    rankColor: '#F7DC6F',
    bannerFrom: '#3A1A2E',
    bannerTo: '#1A2A3A',
    email: 'd.mukhamedieva@aues.kz',
    phone: '+7 (727) 292-07-60 доб. 4411',
    telegram: '@mukhamedieva_aues',
    schedule: [
      { day: 'Вторник', time: '09:00 – 11:00', status: 'available' },
      { day: 'Четверг', time: '13:00 – 15:00', status: 'available' },
      { day: 'Суббота', time: '10:00 – 12:00', status: 'busy' },
    ],
    issues: [
      'Дипломные и магистерские работы по робототехнике',
      'Вопросы по автоматизированным системам управления',
      'Научные публикации и конференции',
      'Производственная практика на предприятиях',
      'Вступление в научную лабораторию',
    ],
  },
];

const rankIcons: Record<string, React.ElementType> = {
  'Профессор': Star,
  'Доцент': BookOpen,
  'Ст. преподаватель': Cpu,
};

export const EmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(1);

  const emp = employees.find(e => e.id === selectedId)!;
  const RankIcon = rankIcons[emp.rank] || FlaskConical;

  const infoBadges = [
    { icon: MapPin, label: emp.room, color: '#7FB8A0', bg: 'rgba(127,184,160,0.1)', border: 'rgba(127,184,160,0.25)' },
    { icon: Clock, label: emp.hours, color: '#9B7EC8', bg: 'rgba(155,126,200,0.1)', border: 'rgba(155,126,200,0.25)' },
    { icon: RankIcon, label: emp.rank, color: emp.rankColor, bg: `${emp.rankColor}18`, border: `${emp.rankColor}40` },
  ];

  return (
    <Layout title="Сотрудники" showBack>
      <div className="max-w-2xl mx-auto px-4 sm:px-6" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

        {/* Employee selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.08em' }}>
            СОТРУДНИКИ КАФЕДРЫ
          </p>
          <div
            className="flex gap-3"
            style={{ overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}
          >
            {employees.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedId(e.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: '0.75rem',
                  background: selectedId === e.id ? 'var(--app-nav-active)' : 'var(--app-card)',
                  border: `1px solid ${selectedId === e.id ? 'var(--app-border-strong)' : 'var(--app-border)'}`,
                  borderRadius: 16,
                  cursor: 'pointer',
                  width: 100,
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `2px solid ${selectedId === e.id ? 'var(--brand-mint-strong)' : 'var(--app-border)'}`,
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={e.img}
                    alt={e.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: selectedId === e.id ? 'var(--brand-mint-strong)' : 'var(--app-text-muted)',
                    fontWeight: 600,
                    textAlign: 'center',
                    lineHeight: 1.3,
                    wordBreak: 'break-word',
                  }}
                >
                  {e.name.split(' ')[0]}{'\n'}{e.name.split(' ')[1]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Profile card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'var(--app-card)',
              border: '1px solid var(--app-border)',
              borderRadius: 24,
              overflow: 'hidden',
              marginBottom: '1.25rem',
            }}
          >
            {/* Banner */}
            <div
              style={{
                height: 100,
                background: `linear-gradient(135deg, ${emp.bannerFrom} 0%, ${emp.bannerTo} 100%)`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'radial-gradient(circle at 90% 0%, rgba(127,184,160,0.2) 0%, transparent 50%)',
                }}
              />
            </div>

            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              {/* Avatar */}
              <div style={{ marginTop: -50, marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    border: '3px solid var(--app-card)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px var(--app-shadow)',
                  }}
                >
                  <img
                    src={emp.img}
                    alt="Employee"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>
              </div>

              {/* Name & title */}
              <h2 style={{ color: 'var(--app-text-strong)', fontWeight: 800, fontSize: '1.4rem', marginBottom: 4, lineHeight: 1.2 }}>
                {emp.name}
              </h2>
              <p style={{ color: 'var(--brand-mint-strong)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {emp.title}
              </p>
              <p style={{ color: 'var(--app-text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                {emp.department}
              </p>

              {/* Info badges */}
              <div className="flex flex-wrap gap-2" style={{ marginBottom: '1.5rem' }}>
                {infoBadges.map(b => {
                  const Icon = b.icon;
                  return (
                    <span
                      key={b.label}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        background: b.bg,
                        border: `1px solid ${b.border}`,
                        borderRadius: 20,
                        padding: '0.35rem 0.875rem',
                        fontSize: '0.875rem',
                        color: b.color,
                      }}
                    >
                      <Icon size={12} /> {b.label}
                    </span>
                  );
                })}
              </div>

              {/* Office hours */}
              <div
                style={{
                  background: 'var(--app-bg-soft)',
                  border: '1px solid var(--app-border)',
                  borderRadius: 14,
                  padding: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  ПРИЁМНЫЕ ЧАСЫ
                </p>
                <div className="flex flex-col gap-2">
                  {emp.schedule.map(s => (
                    <div key={s.day} className="flex items-center justify-between">
                      <span style={{ fontSize: '0.875rem', color: 'var(--app-text)' }}>{s.day}</span>
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: '0.875rem', color: 'var(--app-text-muted)' }}>{s.time}</span>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: s.status === 'available' ? 'var(--brand-mint-strong)' : 'var(--app-icon-muted)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-2">
                {[
                  { icon: Mail, label: emp.email, href: `mailto:${emp.email}`, color: '#7FB8A0' },
                  { icon: Phone, label: emp.phone, href: `tel:${emp.phone.replace(/\D/g, '')}`, color: '#9B7EC8' },
                  { icon: MessageSquare, label: emp.telegram, href: '#', color: '#7EC8E3' },
                ].map(c => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.label}
                      href={c.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '0.75rem',
                        background: 'var(--app-control)',
                        border: '1px solid var(--app-control-border)',
                        borderRadius: 12,
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(127,184,160,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(127,184,160,0.15)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'var(--app-control)';
                        e.currentTarget.style.borderColor = 'var(--app-control-border)';
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: `${c.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} style={{ color: c.color }} />
                      </div>
                      <span style={{ fontSize: '0.875rem', color: 'var(--app-text)' }}>{c.label}</span>
                      <ChevronRight size={14} style={{ color: 'var(--app-icon-muted)', marginLeft: 'auto' }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Issues */}
        <motion.div
          key={`issues-${selectedId}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          style={{
            background: 'var(--app-card)',
            border: '1px solid var(--app-border)',
            borderRadius: 20,
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <p style={{ fontSize: '0.875rem', color: 'var(--app-text-soft)', fontWeight: 600, marginBottom: '1rem' }}>
            ПО КАКИМ ВОПРОСАМ ОБРАЩАТЬСЯ
          </p>
          <div className="flex flex-col gap-2">
            {emp.issues.map((issue, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
                style={{
                  padding: '0.6rem 0.75rem',
                  background: 'rgba(127,184,160,0.04)',
                  borderRadius: 10,
                  border: '1px solid rgba(127,184,160,0.08)',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--brand-mint-strong)',
                    marginTop: 7,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--app-text)', lineHeight: 1.5 }}>{issue}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => navigate('/directions')}
            style={{
              flex: 1,
              background: 'rgba(127,184,160,0.1)',
              border: '1px solid rgba(127,184,160,0.3)',
              borderRadius: 14,
              padding: '1rem',
              color: 'var(--brand-mint-strong)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(127,184,160,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(127,184,160,0.1)'; }}
          >
            <Navigation size={18} /> {t('howToGetThere')}
          </button>
          <button
            onClick={() => navigate('/appointment')}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, var(--brand-purple), #6B3E7A)',
              border: '1px solid rgba(155,126,200,0.3)',
              borderRadius: 14,
              padding: '1rem',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 20px rgba(74,43,87,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(74,43,87,0.5)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(74,43,87,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <CalendarCheck size={18} /> {t('bookAppointment')}
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};
